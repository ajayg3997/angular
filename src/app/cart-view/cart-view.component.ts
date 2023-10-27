import { Component, DoCheck } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { STORAGE_NAME } from '../config/config';
import { ApiService } from '../services/api.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements DoCheck {
  selectedItem: any = [];
  resturant: any;
  userDetail: any;
  socialDetails: any;
  constructor(
    public dialog: MatDialog,
    private adminService: ApiService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private localService: LocalStorageService) {
    let cartDetails = this.localService.getItem(STORAGE_NAME.CARTDETAIL);
    if (cartDetails !== undefined && cartDetails !== null) {
      this.selectedItem = JSON.parse(cartDetails);
    }

  }
  ngOnInit(): void {
    this.getRestaurants();
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

  removeItem(item: any) {
    let removeItem = this.selectedItem?.filter((x: any) => x._id !== item._id);
    let string = JSON.stringify(removeItem);
    this.localService.setItem(STORAGE_NAME.CARTDETAIL, string);
  }

  totalPrice() {
    let price = this.selectedItem?.map((x: any) => x?.productPrice)
    return price?.reduce((a: any, b: any) => {
      return Number(a) + Number(b)
    }, 0)
  }

  ngDoCheck() {
    let cartDetails = this.localService.getItem(STORAGE_NAME.CARTDETAIL);
    if (cartDetails !== undefined && cartDetails !== null) {
      this.selectedItem = JSON.parse(cartDetails);
    }
  }

  // onOptionsSelected(item:any){
  //   console.log("the selected value is " + item);
  // }

  checkOut() {
    let userDetail: any = this.localService.getItem(STORAGE_NAME.USERDETAIL);
    let socialDetails = this.localService.getItem(STORAGE_NAME.SOCIALLOGIN);
    if (socialDetails !== undefined && socialDetails !== null) {
      this.socialDetails = JSON.parse(socialDetails);
    }
    if (userDetail || socialDetails) {
      this.router.navigate(['./placeOrder'])
    }
    else {
      this.router.navigate(['./auth/login'])
    }
  }
}
