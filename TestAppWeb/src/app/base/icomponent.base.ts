import {Router} from '@angular/router';

export class IcomponentBase {
  constructor(public router: Router) {

  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
