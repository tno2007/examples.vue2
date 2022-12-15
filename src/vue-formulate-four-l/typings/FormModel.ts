import {
  IFormModel,
  IAddress,
  IPartner,
  IBiometricEnrollment,
  IReferee,
} from "./IFormModel";

export class FormModel implements IFormModel {
  addressHistory: IAddress[];
  partners: IPartner[];
  referees: IReferee[];
  biometricEnrollment: IBiometricEnrollment;

  constructor() {
    this.addressHistory = [];
    this.partners = [];
    this.referees = [];
    this.biometricEnrollment = {
      new_biometricenrolmentid: null,
    };
  }
}
