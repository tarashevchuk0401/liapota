import { CanActivateFn } from '@angular/router';

export const guard = () => {
  return Boolean(sessionStorage.getItem("isAdmin")) 
}
