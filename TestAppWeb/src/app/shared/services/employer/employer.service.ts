import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CoreService} from '../../../base/core_service';
import {Observable} from 'rxjs';
import {ChangeState} from '../../models/offer/change-state.model';

@Injectable({
  providedIn: 'root'
})
export class EmployerService extends CoreService{

  constructor(protected httpClient: HttpClient) {
    super('/employer', httpClient);
  }

  getMyOffers(employerId: string, page): Observable<any>{
    return this.httpClient.get(`${this.fullUrl}/${employerId}/offers?page=${page}&limit=10`, {headers: this.tokenHeader});
  }

  changeStateOffer(changeSate: ChangeState, offerId: string, employerId: string): Observable<any>{
    return this.httpClient.post(`${this.fullUrl}/${employerId}/active/offer/${offerId}`, changeSate,{headers: this.tokenHeader});
  }
}
