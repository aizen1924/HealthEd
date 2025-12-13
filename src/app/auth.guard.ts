import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Check if the user is currently logged in
  const user = localStorage.getItem('currentUser');

  if (user) {
    return true; // Allowed to enter
  } else {
    router.navigate(['/login']); // Kick back to login
    return false; // Block access
  }
};