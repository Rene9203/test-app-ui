import {Component, OnInit} from '@angular/core';
import {IcomponentBase} from './base/icomponent.base';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisteredService} from './shared/services/account/registered.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends IcomponentBase implements OnInit {

  constructor(public router: Router, public route: ActivatedRoute, public registeredService: RegisteredService) {
    super(router);
  }

  ngOnInit() {
    console.log(this.route.snapshot);
  }
}
