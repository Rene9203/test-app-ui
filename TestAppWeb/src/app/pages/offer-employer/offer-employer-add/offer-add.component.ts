import {Component, OnInit} from '@angular/core';
import {NotificationHandlerService} from '../../../shared/services/notify/notification-handler.service';
import {OfferAdd} from '../../../shared/models/offer/offer-add.model';
import {OfferType} from '../../../shared/models/offer/offer-type.model';
import {SelectOption} from '../../../components/select/select.component';
import {OfferTypeService} from '../../../shared/services/offer/offer-type.service';
import {SpinService} from '../../../components/ng-spin/spin.service';
import {OfferService} from '../../../shared/services/offer/offer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-offer-add',
  templateUrl: './offer-add.component.html'
})
export class OfferAddComponent implements OnInit{
  formData: OfferAdd;
  offerTypes: Array<OfferType>;
  optionsOfferType: SelectOption;

  constructor(private notificationHandler: NotificationHandlerService,
              private spinService: SpinService,
              private offerService: OfferService,
              private router: Router,
              private offerTypeService: OfferTypeService) {
    this.formData = new OfferAdd();
    this.offerTypes = [];
    this.optionsOfferType = {valueField: 'id', textField: 'name', placeHolder: 'Select an offer type'};
  }



  ngOnInit() {
    this.listOfferType();
  }

  listOfferType(){
    this.offerTypeService.getAll().subscribe(resp => {
      this.offerTypes = resp.data as OfferType[];
    });
  }

  onSubmit() {
    this.spinService.startLoading();
    this.formData.employerId = localStorage.getItem('userId');
    this.offerService.post(this.formData).subscribe(resp => {
      this.spinService.stopLoading();
      this.notificationHandler.handleException('Offer created successfully');
      this.router.navigate(['/employer/offers-list']);
    }, err => {
      this.notificationHandler.handleException(err);
    });
  }
}
