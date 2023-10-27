import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_NAME } from '../config/config';
import { ApiService } from '../services/api.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-order-place',
  templateUrl: './order-place.component.html',
  styleUrls: ['./order-place.component.scss']
})
export class OrderPlaceComponent {
  userDetail: any;
  cartDetail: any;
  resturant: any;
  socialDetails: any;
  constructor(
    private localService: LocalStorageService, private router: Router, private adminService: ApiService,) {
    let userDetail: any = this.localService.getItem(STORAGE_NAME.USERDETAIL);
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail);
    }
    let cartDetails = this.localService.getItem(STORAGE_NAME.CARTDETAIL);
    if (cartDetails !== undefined && cartDetails !== null) {
      this.cartDetail = JSON.parse(cartDetails);
    }
    if (!userDetail) {
      let socialDetails = this.localService.getItem(STORAGE_NAME.SOCIALLOGIN);
      if (socialDetails !== undefined && socialDetails !== null) {
        this.socialDetails = JSON.parse(socialDetails);
      }
    }
    this.getRestaurants()
  }

  totalPrice() {
    let price = this.cartDetail?.map((x: any) => x.productPrice)
    return price?.reduce((a: any, b: any) => {
      return Number(a) + Number(b)
    })
  }

  getRestaurants() {
    this.adminService.getRestaurant().subscribe((data: any) => {
      if (data !== undefined && data !== null) {
        this.resturant = data?.restaurant;
      }
    })
  }

  getResturant(resId: string) {
    return this.resturant?.find((x: any) => x._id == resId).restaurantName;
  }

  goToHome() {
    this.router.navigate(['/'])
    this.localService.remove(STORAGE_NAME.CARTDETAIL);
  }
}
