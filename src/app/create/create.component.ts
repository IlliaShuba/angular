import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StorageService} from "../storage.service";
import {NotificationsService} from "../notifications.service";
import {first} from "rxjs";

const EMAIL_REGEX = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
const PASSWORD_REGEX = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$")
const PHONE_REGEX = new RegExp("^\\+?3?8?(0[5-9][0-9]\\d{7})$")
export const SAVED_USERS_KEY = "savedUsers"

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  test: any;
  savedUsers: FormUser[] = []
  types = [
    "Type A",
    "Type B",
    "Type C"
  ]
  userForm = this.fb.group({
      id: [{value: null, disabled: true}],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      type: ['default', []],
      email: ['', [Validators.required, /*Validators.pattern(EMAIL_REGEX)*/ Validators.email]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
      subjects: this.fb.array([
        this.fb.control('')
      ]),
      description: [''],
      sex: ['true'],
      phone: ['', [Validators.pattern(PHONE_REGEX)]]
    },
    {
      validators: this.checkPassword("password", "confirmPassword")
    });

    constructor(private fb: FormBuilder, private storageService: StorageService, private notificator: NotificationsService) {
  }

  ngOnInit(): void {
    this.test = this.storageService.getAllUsers().subscribe(
      data => {
        this.savedUsers = data
      },
      error => {
        this.notificator.showError(error)
      }
    )
  }

  ngOnDestroy() {
    this.test.unsubscribe()
  }

  onSubmit() {
    if (!this.userForm.controls["id"].untouched || this.userForm.controls["id"].dirty) {
      return
    }
    let possibleId = this.userForm.controls["id"].value;

    let newUser: FormUser = {
      id: possibleId == null || possibleId == '' ? Date.now() : possibleId,
      name: this.userForm.controls['name'].value,
      lastname: this.userForm.controls['lastname'].value,
      type: this.userForm.controls['type'].value,
      email: this.userForm.controls['email'].value,
      password: this.userForm.controls['password'].value,
      subjects: this.userForm.controls['subjects'].value,
      description: this.userForm.controls['description'].value,
      sex: this.userForm.controls['sex'].value,
      phone: this.userForm.controls['phone'].value,
    }

    if (possibleId == null || possibleId == '') {
      this.storageService.createUser(newUser).pipe(first()).subscribe(
        isUserCreated => {
          isUserCreated ? this.notificator.showSuccess("User successfully created") : this.notificator.showError("User with such Id already exists")
        },
        error => {
          this.notificator.showError(error)
        }
      )
    } else {
      this.storageService.updateUser(newUser).pipe(first()).subscribe(
        isUpdateSuccessful => {
          isUpdateSuccessful ? this.notificator.showSuccess("User successfully updated") : this.notificator.showError("No user with such id")
        },
        error => {
          this.notificator.showError(error)
        }
      )
    }
    this.resetForm();
  }

  deleteUser(id: number) {
    this.storageService.deleteUser(id).pipe(first()).subscribe(
      isDeleted => {
        isDeleted ? this.notificator.showSuccess("User deleted") : this.notificator.showError("No user with such id")
      }
    )
  }

  get subjects() {
    return this.userForm.get('subjects') as FormArray;
  }

  addSubject(text: string = '') {
    this.subjects.push(this.fb.control(text));
  }

  checkPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
      if (passwordControl.value !== confirmPasswordControl.value) {

        return {valid: false}
      }
      return null;
    }
  }

  setUserToEdit(id: number) {
    let toEdit: FormUser | undefined
    this.storageService.getUserById(id).pipe(first()).subscribe(
      data => {
        toEdit = data
        this.notificator.showInfo("Got user with Id")
      }
    )
    if (toEdit == undefined) {
      return
    }
    this.resetForm()
    this.userForm.clearValidators()
    this.userForm.controls['confirmPassword'].disable()

    this.userForm.controls["id"].setValue(toEdit.id);
    this.userForm.controls["name"].setValue(toEdit.name)
    this.userForm.controls["lastname"].setValue(toEdit.lastname)
    this.userForm.controls["type"].setValue(toEdit.type)
    this.userForm.controls["email"].setValue(toEdit.email)
    this.userForm.controls["password"].setValue(toEdit.password)
    this.userForm.controls["description"].setValue(toEdit.description)
    this.userForm.controls["sex"].setValue(toEdit.sex)
    this.userForm.controls["phone"].setValue(toEdit.phone)

    this.subjects.clear()
    for (const subject of toEdit.subjects) {
      this.addSubject(subject)
    }
  }

  resetForm() {
    this.userForm.addValidators(() => this.checkPassword("password", "confirmPassword"))
    this.userForm.controls['confirmPassword'].enable()

    this.subjects.clear()
    this.addSubject();
    this.userForm.reset({
      type: "default",
      sex: "true"
    });
  }

  showSnack() {
    this.notificator.showSuccess("sss");
  }
}

export interface FormUser {
  id: number,
  name: string,
  lastname: string,
  type: string,
  email: string,
  password: string,
  subjects: Array<string>,
  description: string,
  sex: string,
  phone: string
}
