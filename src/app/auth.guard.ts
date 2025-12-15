import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, take, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const afAuth = inject(AngularFireAuth); // Inject Firebase Auth

  return afAuth.authState.pipe(
    take(1), // Check status once
    map(user => !!user), // Return true if user exists, false if null
    tap(loggedIn => {
      if (!loggedIn) {
        console.log('Access Denied - User not logged in to Firebase');
        router.navigate(['/login']);
      }
    })
  );
};