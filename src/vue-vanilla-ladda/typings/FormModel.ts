import { runInThisContext } from "vm";
import { IPrimaryApplicant, IPartner, IFormModel } from "./IFormModel";

export class FormModel implements IFormModel {
  PrimaryApplicant: IPrimaryApplicant;
  Partner: IPartner;

  constructor() {
    this.PrimaryApplicant = {
      CriminalRecord: null,
    };
    this.Partner = {
      HadOtherNames: "false",
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
