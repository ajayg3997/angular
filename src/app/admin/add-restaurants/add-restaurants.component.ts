import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { STORAGE_NAME } from 'src/app/config/config';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Restaurant } from '../interface/restaurant';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-add-restaurants',
  templateUrl: './add-restaurants.component.html',
  styleUrls: ['./add-restaurants.component.scss']
})
export class AddRestaurantsComponent {
  restaurant!: FormGroup;
  userDetail: any;
  resDetail: any;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService,
    private http: HttpClient,
    private localService: LocalStorageService) {
    let userDetail: any = this.localService.getItem(STORAGE_NAME.USERDETAIL);
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail);
    }
  }
  ngOnInit(): void {
    this.restaurant = this.formBuilder.group({
      restaurantName: [null, [Validators.required]],
      restaurantAddress: [null, [Validators.required]]
    });

    if (this.data !== null && this.data !== undefined && this.data !== "") {
      debugger
      this.adminService.getRestaurantById(this.data).subscribe((data) => {
        if (data !== null && data !== undefined) {
          debugger
          this.restaurant.setValue(
            {
              restaurantName: data.restaurant[0].restaurantName, 
              restaurantAddress: data.restaurant[0].restaurantAddress
            }
          )
        }
      })
    }
  }

  setValue() {

  }

  createRestaurant() {
    this.restaurant.markAllAsTouched();
    if (this.restaurant.valid) {
      let restaurant = {
        userId: this.userDetail._id,
        restaurantName: this.restaurant.controls['restaurantName'].value,
        restaurantAddress: this.restaurant.controls['restaurantAddress'].value
      }
      if (this.data !== null && this.data !== undefined && this.data !== "") {
        this.adminService.editRestaurantById(this.data, restaurant).subscribe((data: any) => {
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
        this.adminService.addRestaurant(restaurant).subscribe((data: any) => {
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
