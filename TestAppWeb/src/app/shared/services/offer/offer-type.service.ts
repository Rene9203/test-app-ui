import {Injectable} from '@angular/core';
import {CoreService} from '../../../base/core_service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OfferTypeService extends CoreService {
  constructor(protected httpClient: HttpClient) {
    super('/offerType', httpClient);
  }
}
