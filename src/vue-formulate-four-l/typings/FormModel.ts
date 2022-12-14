import {
  IFormModel,
  IAddress,
  IPartner,
  IBiometricEnrollment,
  IReferee,
} from "./IFormModel";

export class FormModel implements IFormModel {
  addressHistory: IAddress[];
  partner: IPartner;
  previousPartners: IPartner[];
  referees: IReferee[];
  biometricEnrollment: IBiometricEnrollment;

  constructor() {
    this.addressHistory = [];
    this.partner = {
      info: {},
      address: {},
    };
    this.previousPartners = [];
    this.referees = [];
    this.biometricEnrollment = {};
  }
}
