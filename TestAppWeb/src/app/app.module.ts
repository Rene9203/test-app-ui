import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SelectComponent} from './components/select/select.component';
import {ToastrModule} from 'ngx-toastr';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {NgSpinComponent} from './components/ng-spin/ng-spin.component';
import {SpinService} from './components/ng-spin/spin.service';
import {LoginComponent} from './pages/login/login/login.component';
import {ExtranetComponent} from './pages/extranet/extranet.component';
import {OfferService} from './shared/services/offer/offer.service';
import {RegisteredService} from './shared/services/account/registered.service';
import {ForbiddenPageComponent} from './pages/forbidden-page/forbidden-page.component';
import {NotificationHandlerService} from './shared/services/notify/notification-handler.service';
import {OfferEmployerListComponent} from './pages/offer-employer/offer-employer-list/offer-employer-list.component';
import {CandidateApplyComponent} from './pages/candidate/candidate-apply/candidate-apply.component';
import {OfferAddComponent} from './pages/offer-employer/offer-employer-add/offer-add.component';
import {BackendOfferListComponent} from './pages/backend-offer/backend-offer-list/backend-offer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectComponent,
    NgSpinComponent,
    LoginComponent,
    ExtranetComponent,
    ForbiddenPageComponent,
    OfferEmployerListComponent,
    CandidateApplyComponent,
    OfferAddComponent,
    BackendOfferListComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: 'decreasing'
    })
  ],
  providers: [
    SpinService,
    OfferService,
    RegisteredService,
    NotificationHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
