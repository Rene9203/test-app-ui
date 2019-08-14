import {Component, OnInit} from '@angular/core';
import {Offer} from '../../../shared/models/offer/offer.model';
import {EmployerService} from '../../../shared/services/employer/employer.service';
import {SpinService} from '../../../components/ng-spin/spin.service';
import {NotificationHandlerService} from '../../../shared/services/notify/notification-handler.service';
import {OfferService} from '../../../shared/services/offer/offer.service';
import {ChangeState} from '../../../shared/models/offer/change-state.model';
import {OfferType} from '../../../shared/models/offer/offer-type.model';
import {SelectOption} from '../../../components/select/select.component';

@Component({
  selector: 'app-offer-employer-list',
  templateUrl: './offer-employer-list.component.html'
})
export class OfferEmployerListComponent implements OnInit {
  offers: Array<Offer>;
  headers: Array<{ text: string, value: string }>;
  page: number;
  pagesCount: number;
  pages: Array<number>;

  constructor(private employerService: EmployerService,
              private notificationHandler: NotificationHandlerService,
              private spinService: SpinService) {
    this.offers = [];
    this.headers = [{text: 'Offer Type', value: 'offerTypeName'}, {text: 'Description', value: 'description'},
      {text: 'Active', value: 'active'}];
    this.pages = [];
  }

  ngOnInit() {
    this.listOffers();
  }

  listOffers(pageParam = 1){
    const emplyerId = localStorage.getItem('userId');
    this.spinService.startLoading();
    this.employerService.getMyOffers(emplyerId, pageParam).subscribe(resp => {
      this.spinService.stopLoading();
      this.offers = resp.data as Offer[];
      this.page = resp.page;
      this.pages = [];
      this.pagesCount = resp.pagesCount;
      for(let i =1; i <= this.pagesCount; i++){
        this.pages.push(i);
      }
    }, err => {
      this.notificationHandler.handleException(err);
      this.spinService.stopLoading();
    });
  }

  changeState(state, offerId){
    this.spinService.startLoading();
    const employerId = localStorage.getItem('userId');
    this.employerService.changeStateOffer(new ChangeState(!state), offerId, employerId).subscribe(resp => {
      this.spinService.stopLoading();
      if(!resp.success){
       this.notificationHandler.handleErrorMessage(resp.errors.join(','));
      }else{
        this.notificationHandler.handleMessage(resp.successMessage);
      }
    });
  }
}
