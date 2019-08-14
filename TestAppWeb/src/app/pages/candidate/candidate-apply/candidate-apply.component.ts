import {Component} from '@angular/core';
import {Candidate} from '../../../shared/models/candidate/candidate.model';
import {SpinService} from '../../../components/ng-spin/spin.service';
import {OfferService} from '../../../shared/services/offer/offer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationHandlerService} from '../../../shared/services/notify/notification-handler.service';

@Component({
  selector: 'app-candidate-apply',
  templateUrl: './candidate-apply.component.html'
})
export class CandidateApplyComponent {
  formData: Candidate;

  constructor(private spinService: SpinService,
              private offerService: OfferService,
              private notificationHandler: NotificationHandlerService,
              private router: Router,
              private route: ActivatedRoute) {
    this.formData = new Candidate();
  }

  onSubmit() {
    this.spinService.startLoading();
    const offerId = this.route.snapshot.paramMap.get('id');
    this.offerService.apply(this.formData, offerId).subscribe(resp => {
      this.spinService.stopLoading();
      if (resp.success) {
        this.notificationHandler.handleMessage('Thanks for apply on this offer');
        this.router.navigate(['/offers']);
      }else{
        this.notificationHandler.handleErrorMessage(resp.errors.join(','));
      }
    }, err => {
      this.spinService.stopLoading();
      this.notificationHandler.handleException(err);
    });
  }
}
