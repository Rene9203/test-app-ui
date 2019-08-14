import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CoreService} from '../../../base/core_service';
import {Candidate} from '../../models/candidate/candidate.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService extends CoreService {

  constructor(protected httpClient: HttpClient) {
    super('/offer', httpClient);
  }

  apply(candidate: Candidate, offerId: string): Observable<any>{
      return this.httpClient.post(`${this.fullUrl}/${offerId}/apply`,candidate, {headers: this.tokenHeader});
  }

  detailsByCategories(): Observable<any>{
      return this.httpClient.get(`${this.fullUrl}/details-by-categories`,{headers: this.tokenHeader});
  }
}
