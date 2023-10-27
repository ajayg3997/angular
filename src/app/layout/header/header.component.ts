import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_NAME } from 'src/app/config/config';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck {
  userDetail: any;
  cartDetail: any;
  socialDetails:any;
  constructor(
    private localService: LocalStorageService, private router: Router) {
    let userDetail: any = this.localService.getItem(STORAGE_NAME.USERDETAIL);
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail);
    }
    let cartDetails = this.localService.getItem(STORAGE_NAME.CARTDETAIL);
    if (cartDetails !== undefined && cartDetails !== null) {
      this.cartDetail = JSON.parse(cartDetails);
    }
    if(!userDetail){
      let socialDetails = this.localService.getItem(STORAGE_NAME.SOCIALLOGIN);
      if (socialDetails !== undefined && socialDetails !== null) {
        this.socialDetails = JSON.parse(socialDetails);
      }
    }
  }
  ngDoCheck() {
    let cartDetails = this.localService.getItem(STORAGE_NAME.CARTDETAIL);
    if (cartDetails !== undefined && cartDetails !== null) {
      this.cartDetail = JSON.parse(cartDetails);
    }
  }
  ngOnInit(): void {
  }
  logOut() {
    this.localService.remove(STORAGE_NAME.USERDETAIL);
    this.localService.remove(STORAGE_NAME.SOCIALLOGIN);
  }

  cartView() {
    if(this.cartDetail !== undefined && this.cartDetail !== null){
      this.router.navigate(['/cartView'])
    }
  }
}
