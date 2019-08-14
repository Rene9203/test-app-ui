import {HttpHeaders} from '@angular/common/http';

export class CoreService {
  private staticUrl = 'http://localhost:57058/api';
  protected fullUrl: string;
  protected tokenHeader: HttpHeaders;

  constructor(protected pathUrl: string, protected httpClient) {
    this.fullUrl = this.staticUrl + this.pathUrl;
    this.tokenHeader = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`});
  }

  getAll(page: number = null, limit: number = null, params: Array<any> = null) {
    let query = [];
    if (page !== null) {
      query.push(`page=${page}`);
    }
    if (limit !== null) {
      query.push(`limit=${limit}`);
    }
    if (params !== null) {
      for (let index in params){
        query.push(`${index}=${params[index]}`);
      }
    }
    const queryString = query.length == 0 ? '' : `?${query.join('&')}`
    return this.httpClient.get(`${this.fullUrl}${queryString}`, {headers: this.tokenHeader});
  }

  getById(id: string) {
    return this.httpClient.get(`${this.fullUrl}/${id}`, {headers: this.tokenHeader});
  }

  post(obj: any) {
    return this.httpClient.post(this.fullUrl, obj, {headers: this.tokenHeader});
  }

  put(obj: any) {
    return this.httpClient.put(this.fullUrl, obj, {headers: this.tokenHeader});
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.fullUrl}/${id}`, {headers: this.tokenHeader});
  }

  deleteByGuid(id: string) {
    return this.httpClient.delete(`${this.fullUrl}/${id}`, {headers: this.tokenHeader});
  }
}
