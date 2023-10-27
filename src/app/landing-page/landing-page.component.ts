import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../admin/services/admin.service';
import { STORAGE_NAME } from '../config/config';
import { ApiService } from '../services/api.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  product: any;
  resturant: any;
  selectedItem: any = [];
  selectedProduct:any;

  constructor(
    public dialog: MatDialog,
    private adminService: ApiService,
    private _snackBar: MatSnackBar,
    private localService: LocalStorageService) {
    let cartDetails = this.localService.getItem(STORAGE_NAME.CARTDETAIL);
    if (cartDetails !== undefined && cartDetails !== null) {
      this.selectedItem = JSON.parse(cartDetails);
    }
  }

  ngOnInit(): void {
    this.getProduct();
    this.getRestaurants();
  }

  getProduct() {
    this.adminService.getProduct().subscribe((data: any) => {
      if (data !== undefined && data !== null) {
        this.product = data?.product;
        this.selectedProduct = data?.product;
      }
    })
  }
  getRestaurants() {
    this.adminService.getRestaurant().subscribe((data: any) => {
      if (data !== undefined && data !== null) {
        debugger
        this.resturant = data?.restaurant;
      }
    })
  }

  getResturant(resId: string) {
    return this.resturant?.find((x: any) => x._id == resId).restaurantName;
  }

  addOnCard(item: any) {
    let checkSelectedItem = this.selectedItem?.find((x: any) => x._id == item._id);
    if (checkSelectedItem !== undefined && checkSelectedItem !== null) {
      this._snackBar.open(`Item is already in the cart.`, "close", {
        duration: 2000,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: ['danger-snackbar']
      });
    } else {
      this.selectedItem.push(item);
      let string = JSON.stringify(this.selectedItem);
      this.localService.setItem(STORAGE_NAME.CARTDETAIL, string);
    }
  }

  selectRes(item:any){
    this.selectedProduct = this.product?.filter((x:any)=>x.restaurantId == item._id);
  }
}
