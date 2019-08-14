import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisteredService {
  constructor(public router: Router){}

  isRegistered() {
    return localStorage.getItem('token') !== null;
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('roles');
    this.router.navigateByUrl('/offers');
  }

  signIn() {
    this.router.navigateByUrl('/login');
  }

  isAdmin(){
    if(localStorage.getItem('roles') === null) return false;
    return localStorage.getItem('roles').indexOf('Administrator') !== -1;
  }

  isEmployer(){
    if(localStorage.getItem('roles') === null) return false;
    return localStorage.getItem('roles').indexOf('Employer') !== -1;
  }
}
