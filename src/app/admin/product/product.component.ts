import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { STORAGE_NAME } from 'src/app/config/config';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  userDetail: any;
  product: any;
  restaurants: any;

  constructor(
    public dialog: MatDialog,
    private adminService: AdminService,
    private _snackBar: MatSnackBar,
    private localService: LocalStorageService) {

    let userDetail: any = this.localService.getItem(STORAGE_NAME.USERDETAIL);
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail);
    }
    this.getProduct();
    this.getResturantDetail();
  }


  ngOnInit(): void {
  }

  getProduct() {
    this.adminService.getProductByUserId(this.userDetail?._id).subscribe((data: any) => {
      if (data !== undefined && data !== null) {
        this.product = data?.productDetail;
      }
    })
  }

  trackByFn(index: number, item: any): any {
    return item?._id || index;
  }

  addProduct(rest: string) {
    let dialogRef = this.dialog.open(AddProductComponent, {
      data: rest,
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getProduct();
      }
    })
  }

  deleteProducts(rest: string) {
    this.adminService.deleteProduct(rest).subscribe((data: any) => {
      if (data?.result?.acknowledged) {
        let msg = data?.message;
        this._snackBar.open(`${msg}`, "close", {
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['danger-snackbar']
        });
        this.getProduct();
      }
    })
  }

  getResturantDetail() {
    this.adminService.getRestaurant(this.userDetail?._id).subscribe((Response) => {
      if (Response !== undefined && Response !== null) {
        this.restaurants = Response.userRestaurant
      }
    })
  }
  findRestaurants(id: string) {
    return this.restaurants?.find((x: any) => x?._id == id)?.restaurantName;
  }
}

