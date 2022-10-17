export interface IPrimaryApplicant {
  CriminalRecord: string | null;
}

export interface IFormModel {
  PrimaryApplicant: IPrimaryApplicant;
}

export interface IPartner {
  HadOtherNames: string | null;
}
