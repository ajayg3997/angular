import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { STORAGE_NAME } from 'src/app/config/config';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Restaurant } from '../interface/restaurant';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  product!: FormGroup;
  userDetail: any;
  restaurant: Restaurant[] = [];

  @ViewChild('fileInput', { static: false }) fileInput?: ElementRef<any>;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService,
    private http: HttpClient,
    private localService: LocalStorageService) {
    let userDetail: any = this.localService.getItem(STORAGE_NAME.USERDETAIL);
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail);
    }
    this.getResturants();
  }

  ngOnInit(): void {
    this.product = this.formBuilder.group({
      restaurantName: [null, [Validators.required]],
      productName: [null, [Validators.required]],
      productPrice: [null, [Validators.required]],
      productImage: [null, [Validators.required]],
      productDec: [null, [Validators.required]]
    });

    if (this.data !== null && this.data !== undefined && this.data !== "") {
      this.adminService.getProductByProductId(this.data).subscribe((data) => {
        if (data !== null && data !== undefined) {
          debugger
          this.product.setValue(
            {
              restaurantName: parseInt(data.productDetail[0].restaurantId),
              productName: data.productDetail[0].productName,
              productPrice: data.productDetail[0].productPrice,
              productImage: data.productDetail[0].productImg,
              productDec: data.productDetail[0].productDec,
            }
          )
        }
      })
    }
  }

  getResturants() {
    this.adminService.getRestaurant(this.userDetail?._id).subscribe((data: any) => {
      if (data !== undefined && data !== null) {
        debugger
        this.restaurant = data?.userRestaurant;
      }
    })
  }


  createProduct() {
    const imageBlob = this.fileInput?.nativeElement.files[0];
    if (imageBlob !== undefined && this.fileInput !== null) {
      this.product.get('productImage')?.setValue(imageBlob);
    }
    else {
      this.product.get('productImage')?.reset();
      this._snackBar.open('Please select product image', "close", {
        duration: 5000,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: ['danger-snackbar']
      });
    }
    this.product.markAllAsTouched();
    if (this.product.valid) {
      let product = {
        imageBlob: this.product.controls['productImage'].value,
        userId: this.userDetail?._id,
        restaurantId: this.product.controls['restaurantName'].value,
        productName: this.product.controls['productName'].value,
        productPrice: this.product.controls['productPrice'].value,
        productDec: this.product.controls['productDec'].value
      }
      if (this.data !== null && this.data !== undefined && this.data !== "") {
        this.adminService.editProductById(this.data, product).subscribe((data: any) => {
          let msg = data?.message;
          this._snackBar.open(`${msg}`, "close", {
            duration: 5000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['danger-snackbar']
          });
        })
      }
      else {
        this.adminService.addProduct(product).subscribe((data: any) => {
          let msg = data?.message;
          this._snackBar.open(`${msg}`, "close", {
            duration: 5000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['danger-snackbar']
          });
        })
      }
    }
  }
}

function viewChild() {
  throw new Error('Function not implemented.');
}

