import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccountModel} from '../../models/account/account.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService{
  private url = 'http://localhost:57058/api/account';

  constructor(protected httpClient: HttpClient) {
  }

  login(account: AccountModel) : Observable<any> {
    return this.httpClient.post(`${this.url}/login`, account);
  }
}
