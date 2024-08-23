import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('id')) {
    return true;
  }else{
    return false;
  }
};
