import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { map} from 'rxjs';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  return (auth.UserSubject.pipe(map((user) => {
    const loggedIn = user.id != 0 ? true : false;
    if (loggedIn) { return true }
    else {
      return router.createUrlTree(['/login']);
    }
  })));
}
