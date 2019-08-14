import {Component, OnInit} from '@angular/core';
import {Offer} from '../../shared/models/offer/offer.model';
import {OfferService} from '../../shared/services/offer/offer.service';
import {SpinService} from '../../components/ng-spin/spin.service';
import {NotificationHandlerService} from '../../shared/services/notify/notification-handler.service';
import {OfferType} from '../../shared/models/offer/offer-type.model';
import {SelectOption} from '../../components/select/select.component';
import {OfferTypeService} from '../../shared/services/offer/offer-type.service';

@Component({
  selector: 'app-front',
  templateUrl: './extranet.component.html',
})
export class ExtranetComponent implements OnInit {
  title: string;
  offers: Array<Offer>;
  headers: Array<{ text: string, value: string }>;
  page: number;
  pagesCount: number;
  offerTypes: Array<OfferType>;
  optionsOfferType: SelectOption;
  offerTypeFilter: string;
  pages: Array<number>;

  constructor(private offerService: OfferService,
              private spinService: SpinService,
              private offerTypeService: OfferTypeService,
              private notificationHandler: NotificationHandlerService) {
    this.title = 'Offers available';
    this.offers = [];
    this.page = null;
    this.pagesCount = null;
    this.headers = [{text: 'Offer Type', value: 'offerTypeName'}, {text: 'Description', value: 'description'}];
    this.offerTypes = [];
    this.optionsOfferType = {valueField: 'id', textField: 'name', placeHolder: 'Select an offer type'};
    this.offerTypeFilter = '';
    this.pages =[];
  }

  ngOnInit() {
    this.listOfferType();
    this.listOffers();
  }

  listOffers(pageParam = 1){
    this.spinService.startLoading();

    this.offerService.getAll(pageParam, 10).subscribe(
      resp => {
        this.spinService.stopLoading();
        this.offers = resp.data as Offer[];
        this.page = resp.page;
        this.pagesCount = resp.pagesCount;
        this.pages = [];
        this.pagesCount = resp.pagesCount;
        for(let i =1; i <= this.pagesCount; i++){
          this.pages.push(i);
        }
      }, err1 => {
        this.notificationHandler.handleException(err1);
        this.spinService.stopLoading();
      }
    );
  }

  listOfferType(){
    this.offerTypeService.getAll().subscribe(resp => {
      this.offerTypes = resp.data as OfferType[];
    });
  }

  clearFilter(){
    this.offerTypeFilter = '';
    this.filter();
  }

  filter() {
    this.spinService.startLoading();
    let params = [];
    if(this.offerTypeFilter !== ''){
      params['OfferTypeId'] = this.offerTypeFilter;
    }
    this.offerService.getAll(1, 10, params).subscribe(
      resp => {
        this.spinService.stopLoading();
        this.offers = resp.data as Offer[];
        this.page = resp.page;
        this.pagesCount = resp.pagesCount;
      }, err1 => {
        this.notificationHandler.handleException(err1);
        this.spinService.stopLoading();
      }
    );
  }
}
