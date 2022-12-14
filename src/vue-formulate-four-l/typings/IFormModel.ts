export interface IFormModel {
  addressHistory: IAddress[];
  partner: IPartner;
  previousPartners: IPartner[];
  referees: IReferee[];
  biometricEnrollment: IBiometricEnrollment;
}

export interface IReferee {
  _new_4lquestionnaireid_value: string | null;
  new_refereeid: string | null;
  new_ataddresslessthan3years: boolean | null;
  new_firstname: string | null;
  new_lastname: string | null;
  new_havepassport: boolean | null;
  new_emailaddress: string | null;
  new_passportnumber: string | null;
  new_daytimenumber: string | null;
  new_dateofbirth: string | null;
  new_gender: number | null;
}

export interface IBiometricEnrollment {
  new_biometricenrolmentid: string | null;
  _new_4lquestionnaireid_value: string;
  new_hadfingerprintstakenpartofimmigrationapp: boolean;
  new_brpenclosed: boolean;
  new_brpissued: boolean;
  new_medicalorphysicalconditionforspecialneeds: boolean;
  new_returneddatesendtous?: any;
  new_fingerprintstakentowncity?: any;
  new_lostdatereportedbrp?: any;
  new_brpexpirydate?: any;
  new_stolendatereturnedtothepolice?: any;
  new_stolenpolicestation?: any;
  new_brpissuedate?: any;
  new_brpissueplace?: any;
  new_brpnumber?: any;
  new_stolendatereportedtothepolice?: any;
  new_fingerprintstakenwhereabouts?: any;
  new_brplocation?: any;
  new_stolenpolicereportnumber?: any;
  new_applicationmadeabroaddetails?: any;
  new_fingerpintstakencountry?: any;
  new_stolencrimereferencenumber?: any;
  new_otherreasonunabletoprovidebrp?: any;
  new_fingerprintstakencountry?: any;
  new_returnedreasonsenttous?: any;
  new_fingerprintstakendate?: any;
}

export interface IAddress {
  new_fromdate: string | null;
  new_todate: string | null;
  new_iscurrent: boolean | null;
  country?: number | null;
  addressline1?: string | null;
  addressline2?: string | null;
  posttownorcity?: string | null;
  stateorprovince?: string | null;
  postalcode?: string | null;
}

export interface IPartnerInfo {
  new_iscurrent?: boolean | null;
  new_citizenshipdate?: string | null;
  new_forename?: string | null;
  new_middlename?: string | null;
  new_surname?: string | null;
  new_countryofbirth?: string | null;
  new_dateofmarriage?: string | null;
  new_knownbyothernames?: string | null;
  new_partnershipenddate?: string | null;
  new_partnershipendplace?: string | null;
  new_partnershipendreason?: string | null;
  new_partnershipplace?: string | null;
  new_passport?: string | null;
  new_relationship?: string | null;
  new_villagetownorcity?: string | null;
  new_visadependentid?: string | null;
}

export interface IPartner {
  info: IPartnerInfo;
  address: IAddress;
}
