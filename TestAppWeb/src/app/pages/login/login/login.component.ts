import {Component, OnInit} from '@angular/core';
import {SpinService} from '../../../components/ng-spin/spin.service';
import {Router} from '@angular/router';
import {AccountService} from '../../../shared/services/account/account.service';
import {AccountModel} from '../../../shared/models/account/account.model';
import {NotificationHandlerService} from '../../../shared/services/notify/notification-handler.service';
import {OfferService} from '../../../shared/services/offer/offer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: AccountModel;

  constructor(public accountService: AccountService,
              public spinService: SpinService,
              public notificationHandler: NotificationHandlerService,
              public  router: Router) {
    this.login = new AccountModel();
  }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.router.navigateByUrl('/offers');
    }
  }

  onSubmit() {
    this.spinService.startLoading();
    this.accountService.login(this.login).subscribe(resp => {
      this.spinService.stopLoading();
      localStorage.setItem('token', resp.token);
      localStorage.setItem('userName', resp.user.user);
      localStorage.setItem('userId', resp.user.id);
      localStorage.setItem('roles', resp.user.roles);
      this.router.navigate(['/employer/offers-list']);
    }, error1 => {
      this.spinService.stopLoading();
      this.notificationHandler.handleException(error1);
    });
  }
}
