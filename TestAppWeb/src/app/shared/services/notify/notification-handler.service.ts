import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {RegisteredService} from '../account/registered.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationHandlerService {
  constructor(protected toastrService: ToastrService,
              private registeredService: RegisteredService,
              protected router: Router) {

  }

  handleException(err) {
    switch (err.status) {
      case 0:
        this.toastrService.error('Sorry you don\'t have connection with server');
        break;
      case 401:
        this.registeredService.signOut();
        this.router.navigate(['/login']);
        break;
      case 403:
        this.router.navigate(['/forbidden']);
        break;
      case 400:
      case 500:
        this.toastrService.error(err.error.errors.join(','));
        break;
    }
  }

  handleMessage(message: string){
    this.toastrService.success(message);
  }

  handleErrorMessage(message: string){
    this.toastrService.error(message);
  }
}
