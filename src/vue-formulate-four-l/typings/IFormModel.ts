export interface IPrimaryApplicant {
  CriminalRecord: string | null;
}

export interface IFormModel {
  addressHistory: IAddressHistory[];
}

export interface IPartner {
  HadOtherNames: string | null;
}

export interface IAddressHistory {
  country?: number | null;
  addressline1?: string | null;
  addressline2?: string | null;
  posttownorcity?: string | null;
  stateorprovince?: string | null;
  postalcode?: string | null;
}
