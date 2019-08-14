import {OfferEmployer} from './offer-employer.model';
import {OfferType} from './offer-type.model';

export class Offer {
  constructor(public id: string = '',
              public description: string = '',
              public offerTypeName: string = '',
              public active: boolean = false,
              public employer: OfferEmployer = null,
              public offerType: OfferType = null) {
  }

}
