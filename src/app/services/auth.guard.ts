import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { STORAGE_NAME } from '../config/config';
import { LocalStorageService } from './local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);
  let storage = inject(LocalStorageService);
  let selectedItem: any
  let cartDetails = storage.getItem(STORAGE_NAME.ISADMIN);
  if (cartDetails !== undefined && cartDetails !== null) {
    selectedItem = JSON.parse(cartDetails);
    if (selectedItem == false) {
      _router.navigate(['/'])
      return false
    }
  }
  return true;
};
