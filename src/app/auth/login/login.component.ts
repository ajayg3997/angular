import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { STORAGE_NAME } from 'src/app/config/config';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  user: any;
  loggedIn: any
  constructor(private formBuilder: FormBuilder, private router: Router,
    private authService: AuthService, private _snackBar: MatSnackBar,
    private localService: LocalStorageService,
    private authSocialService: SocialAuthService) {
      let auth = this.authSocialService.authState;
      if(auth){
        auth.subscribe((user) => {
          this.user = user;
          this.loggedIn = (user != null);
          console.log(user)
          this.localService.setItem(STORAGE_NAME.SOCIALLOGIN, JSON.stringify(user));
        });
      }
   
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, [Validators.required]],
    });


  }

  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid && !this.loginForm.hasError('password')) {
      let signIn = {
        email: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value
      }
      this.authService.signIn(signIn).subscribe((data: any) => {
        if (data !== undefined && data !== null) {
          this.localService.setItem(STORAGE_NAME.TOKEN, data.token);
          this.localService.setItem(STORAGE_NAME.USERDETAIL, JSON.stringify(data.userDetail));
          this.localService.setItem(STORAGE_NAME.ISADMIN, JSON.stringify(data?.userDetail?.isAdmin))
          //this.menuList = JSON.parse(this.localService.getItem(STORAGE_NAME.USERDETAIL));
          let msg = data?.message;
          let snackBarRef = this._snackBar.open(`${msg}`, "close", {
            duration: 5000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['danger-snackbar']
          });
          snackBarRef.afterDismissed().subscribe(() => {
            this.router.navigate(['./'])
          });
        }
      })
    }
  }

  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }

  
  signOut(): void {
    this.authSocialService.signOut()
  }
  ngDoCheck(){
    if(this.user){
      this.router.navigate(['./'])
    }
  }
}
