import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_NAME } from 'src/app/config/config';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  userDetail: any
  constructor(
    private localService: LocalStorageService, private router: Router,) {
    let userDetail: any = this.localService.getItem(STORAGE_NAME.USERDETAIL);
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail);
    }
  }
  
  logOut() {
    this.localService.remove(STORAGE_NAME.USERDETAIL);
    this.router.navigate(['./'])
  }
}
