import {Component, OnInit} from '@angular/core';
import {OfferService} from '../../../shared/services/offer/offer.service';
import {OfferDetails} from '../../../shared/models/offer/offer-details.model';
import {SpinService} from '../../../components/ng-spin/spin.service';

@Component({
  selector: 'app-backend-offer-list',
  templateUrl: './backend-offer-list.component.html'
})
export class BackendOfferListComponent implements OnInit {
  items: Array<OfferDetails>;

  constructor(private offerService: OfferService,
              public spinSevice: SpinService) {
    this.items = [];
  }

  ngOnInit() {
    this.spinSevice.startLoading();
    this.offerService.detailsByCategories().subscribe(resp => {
      this.items = resp as OfferDetails[];
      this.spinSevice.stopLoading();
    }, error1 => {this.spinSevice.stopLoading();});
  }
}
