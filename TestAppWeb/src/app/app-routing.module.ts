import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ExtranetComponent} from './pages/extranet/extranet.component';
import {LoginComponent} from './pages/login/login/login.component';
import {ForbiddenPageComponent} from './pages/forbidden-page/forbidden-page.component';
import {CandidateApplyComponent} from './pages/candidate/candidate-apply/candidate-apply.component';
import {OfferEmployerListComponent} from './pages/offer-employer/offer-employer-list/offer-employer-list.component';
import {EmployerGuard} from './auth/employer.guard';
import {OfferAddComponent} from './pages/offer-employer/offer-employer-add/offer-add.component';
import {BackendOfferListComponent} from './pages/backend-offer/backend-offer-list/backend-offer-list.component';
import {AdminGuard} from './auth/admin.guard';

const appRoutes = [
  {path: '', redirectTo: 'offers', pathMatch: 'full'},
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'forbidden', component: ForbiddenPageComponent
  },
  {
    path: 'offers', component: null, children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {
        path: 'list', component: ExtranetComponent
      },
      {
        path: 'apply/:id', component: CandidateApplyComponent
      }
    ]
  },
  {
    path: 'employer', component: null, canActivate:[EmployerGuard], children: [
      {path: '', redirectTo: 'offers-list', pathMatch: 'full'},
      {path: 'offers-list', component: OfferEmployerListComponent},
      {path: 'offers-add', component: OfferAddComponent}
    ]
  },
  {
    path: 'backend',  component: null, canActivate:[AdminGuard], children: [
      {path: '', redirectTo: 'offers-details', pathMatch: 'full'},
      {path: 'offers-details', component: BackendOfferListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
