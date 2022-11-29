import { IFormModel, IAddressHistory } from "./IFormModel";

export class FormModel implements IFormModel {
  addressHistory: IAddressHistory[];

  constructor() {
    this.addressHistory = [];
  }
}
