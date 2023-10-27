import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm!: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private router: Router,
    private authService: AuthService, private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      isAdmin: [null],
      userName: [null, [Validators.required]],
      emailId: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      address: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]],

    }, { validator: this.checkPasswords });
  }
  checkPasswords(group: FormGroup) {
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['confirmPassword'].value;
    return pass === confirmPass ? null : { notSame: true }
  }

  get f() {
    return this.signUpForm.controls;
  }
  signUp() {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid && !this.signUpForm.hasError('password')) {
      let checkIsAdmin = this.signUpForm.controls['isAdmin'].value;
      if(checkIsAdmin !== null && checkIsAdmin !== undefined){
        checkIsAdmin = true
      }
      else{
        checkIsAdmin = false
      }
      let signUp = {
        isAdmin: checkIsAdmin,
        userName: this.signUpForm.controls['userName'].value,
        email: this.signUpForm.controls['emailId'].value,
        address: this.signUpForm.controls['address'].value,
        password: this.signUpForm.controls['password'].value
      }
      this.authService.signUp(signUp).subscribe((data: any) => {
        let msg = data?.message;
        if(msg !== undefined && msg !== null){
          let snackBarRef =  this._snackBar.open(`${msg}`, "close", {
            duration: 5000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['danger-snackbar']
          });
          snackBarRef.afterDismissed().subscribe(() => {
            this.router.navigate(['./auth/login'])
          });
        }
      })
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

