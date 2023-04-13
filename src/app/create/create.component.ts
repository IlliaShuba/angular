import { Component } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  users = [
    {
      id: 1,
      name: 'Victor',
      lastname: 'Velichko',
      dateOfBirth: new Date("2/1/1990"),
      salary: 50000,
      workingHours: 123456789
    },
    {
      id: 10,
      name: 'Kate',
      lastname: 'Doe',
      dateOfBirth: new Date("6/6/1980"),
      salary: 88000,
      workingHours: 12345
    }
  ]

  formUsers = [
    {
      id: 1, // генерується автоматично
      name: 'Victor', // текстове поле (обов'язкове поле)
      lastname: 'Velichko', // текстове поле (обов'язкове поле)
      type: 'Type B', // селект або радіобатони
      email: 'mail@mail.com', // текстове поле з валідатором
      password: 'Helloworld1!', // текстове поле з валідатором (обов'язкове
      confirmPassword: 'Helloworld1!', // текстове поле з валідатором
      subjects: ['1', '2', '3', '4', '5'], // FormArray
      description: 'gbnfgb', // textarea
      sex: 'MALE', // checkbox
      phone: '380453453454' // текстове поле з валідатором
    },
    {
      id: 2, // генерується автоматично
      name: 'Victor', // текстове поле (обов'язкове поле)
      lastname: 'Velichko', // текстове поле (обов'язкове поле)
      type: 'Type C', // селект або радіобатони
      email: 'mail@mail.com', // текстове поле з валідатором
      password: 'Helloworld1!', // текстове поле з валідатором (обов'язкове
      confirmPassword: 'Helloworld1!', // текстове поле з валідатором
      subjects: ['1', '2', '3'], // FormArray
      description: '', // textarea
      sex: 'MALE', // checkbox
      phone: '380453453454' // текстове поле з валідатором
    }
  ]
  fb = new FormBuilder();

  usersForm = this.fb.group({
      id: new FormControl({value: '', disabled: true}),
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      type: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()]).+$')]],
      confirmPassword: ['', [Validators.required]],
      subjects: this.fb.array([]),
      description: [''],
      sex: [''],
      phone: ['', [Validators.pattern('^380\\d{9}$')]],
    },
    {
      validators: [this.passwordMatches('password', 'confirmPassword')]
    });



  phoneValidator () {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneRegExp = /^[0-9]{10}$/;
      let isValid = phoneRegExp.test(control.value);
      if (isValid) {
        return {valid: true}
      } else {
        return null;
      }
    };
  }

  passwordMatches(password: string, confirmPassword: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      if (formGroup.controls[confirmPassword].value === formGroup.controls[password].value || formGroup.controls['id'].value) {
        formGroup.controls[confirmPassword].setErrors(null);
        return null;
      } else {
        formGroup.controls[confirmPassword].setErrors({'incorrect': true});
        return {invalid: true};
      }
    }
  }

  get subjects() {
    return this.usersForm.get('subjects') as FormArray;
  }

  addSubject() {
    this.subjects.push(this.fb.control(''))
  }

  saveToLocalStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  ngOnInit() {
    this.saveToLocalStorage();

  }

  generateRandomString(): string {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  onSubmit() {
    if (this.usersForm.valid) {
      if (!this.usersForm.controls['id'].value) {
        let arr: any = [];
        for ( let subj of this.subjects.controls) {
          arr.push(subj.value);
        }
        this.formUsers.push(
          {
            id: parseInt(this.generateRandomString()),
            name: this.usersForm.controls['name'].value,
            lastname: this.usersForm.controls['lastname'].value,
            type: this.usersForm.controls['type'].value,
            email: this.usersForm.controls['email'].value,
            password: this.usersForm.controls['password'].value,
            confirmPassword: this.usersForm.controls['confirmPassword'].value,
            subjects: arr, // FormArray
            description: this.usersForm.controls['description'].value,
            sex: this.usersForm.controls['sex'].value ? 'MALE' : 'FEMALE', // checkbox
            phone: this.usersForm.controls['phone'].value.toString() // текстове поле з валідатором
          }
        )
      }
      else {
        let elem: any;
        for (let item of this.formUsers) {
          if (item.id === this.usersForm.controls['id'].value) {
            elem = item;
          }
        }
        let arr: any = [];
        for ( let subj of this.subjects.controls) {
          arr.push(subj.value);
        }
        if (elem) {
          elem['name'] = this.usersForm.controls['name'].value
          elem['lastname'] = this.usersForm.controls['lastname'].value
          elem['type'] = this.usersForm.controls['type'].value
          elem['email'] = this.usersForm.controls['email'].value
          elem['password'] = this.usersForm.controls['password'].value
          elem['confirmPassword'] = this.usersForm.controls['confirmPassword'].value
          elem['subjects'] = arr // FormArray
          elem['description'] = this.usersForm.controls['description'].value
          elem['sex'] = this.usersForm.controls['sex'].value ? 'MALE' : 'FEMALE' // checkbox
          elem['phone'] = this.usersForm.controls['phone'].value.toString() // текстове поле з валідатором
        }
      }
      while (this.subjects.length) {
        this.subjects.removeAt(0);
      }
      this.usersForm.reset();
    }
  }

  putElementIntoForm(id: any) {
    this.usersForm.reset();
    while(this.subjects.length) {
      this.subjects.removeAt(0);
    }
    let elem: any;
    for (let item of this.formUsers) {
      if (item.id === id) {
        elem = item;
      }
    }
    this.usersForm.controls['id'].patchValue(elem.id);
    this.usersForm.controls['id'].disable({onlySelf: true});
    this.usersForm.controls['name'].patchValue(elem.name);
    this.usersForm.controls['lastname'].patchValue(elem.lastname);
    this.usersForm.controls['type'].patchValue(elem.type);
    this.usersForm.controls['email'].patchValue(elem.email);
    this.usersForm.controls['password'].patchValue(elem.password);
    for (let i = 0; i < elem.subjects.length ; i++) {
      let item = elem.subjects[i];
      this.addSubject();
      this.subjects.controls[i].patchValue(item);
    }
    this.usersForm.controls['description'].patchValue(elem.description);
    this.usersForm.controls['sex'].patchValue(elem.sex == 'MALE');
    this.usersForm.controls['phone'].patchValue(elem.phone);
    this.usersForm.setErrors(null);
  }
}
