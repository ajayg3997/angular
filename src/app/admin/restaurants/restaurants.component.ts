import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { STORAGE_NAME } from 'src/app/config/config';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AddRestaurantsComponent } from '../add-restaurants/add-restaurants.component';
import { Restaurant } from '../interface/restaurant';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent {
  userDetail: any;
  restaurant: Restaurant[] = []
  constructor(
    public dialog: MatDialog,
    private adminService: AdminService,
    private _snackBar: MatSnackBar,
    private localService: LocalStorageService) {

    let userDetail: any = this.localService.getItem(STORAGE_NAME.USERDETAIL);
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail);
    }
    this.getResturants();
  }


  ngOnInit(): void {
  }

  getResturants() {
    this.adminService.getRestaurant(this.userDetail?._id).subscribe((data: any) => {
      if (data !== undefined && data !== null) {
        this.restaurant = data?.userRestaurant;
      }
    })
  }

  trackByFn(index: number, item: any): any {
    return item?._id || index;
  }

  addRestaurant(rest:string) {
    let dialogRef = this.dialog.open(AddRestaurantsComponent, {
      data:rest,
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.getResturants();
      }
    })
  }

  deleteRestaurant(rest:string){
    this.adminService.deleteRestaurant(rest).subscribe((data:any)=>{
      debugger
      if(data?.result){
        let msg = data?.message;
        this._snackBar.open(`${msg}`, "close", {
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['danger-snackbar']
        });
        this.getResturants();
      }
    })
  }
}
