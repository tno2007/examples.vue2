import { IPrimaryApplicant, IFormModel } from "./IFormModel";

export class FormModel implements IFormModel {
  PrimaryApplicant: IPrimaryApplicant;

  constructor() {
    this.PrimaryApplicant = {
      CriminalRecord: null,
    };
  }

  //PrimaryApplicant: IPrimaryApplicant;
  /*  
  PrimaryApplicant: { CriminalRecord: null };

  constructor() {
    this.PrimaryApplicant = {
      CriminalRecord: null,
    };
  }
*/
  //PrimaryApplicant: { CriminalRecord: boolean | null };
}
