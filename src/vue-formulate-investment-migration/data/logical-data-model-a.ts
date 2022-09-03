// I put data in a ts file, instead of json to enable comments

export const logicalDataModel = {
  Explore: {
    Id: "20ad60f6-51c1-ec11-811e-0050560111da",
    QuestionnnaireSubmitted: null,
    Adopted: null,
    SpentThreeYearsInUk: null,
    HighestTertiaryQualification: null,
    WorkStatus: null,
    Experience: null,
    InPersonOrRemote: null,
    SalaryAndBonus: null,
    PrimaryObjective: "nothing",
    HavePartner: null,
    HaveChildren: null,
  },
  HavePartner: false,
  HaveChildren: false,
  PrimaryApplicant: {
    Id: "a161b1bb-72a9-dd11-a616-001f2965fc1c",
    PreferredTitle: 100000000,
    FirstName: "Joe",
    LastName: "Bloggs",
    DateOfBirth: "1993-03-17T00:00:00+02:00",
    Gender: 1,
    MaritalStatus: 1,
    AddressLine1: "111 Protea 3456",
    AddressLine2: "18th Floor One Croydon",
    City: "Where Ever We Are",
    PostalCode: "3149",
    PreferredContactMethod: 1,
    MobilePhone: "0795249933",
    HomeNumber: "27217123527",
    WorkNumber: "01155555222",
    EmailHome: "michael.hayn@sableinternational.com",
    EmailWork: "michael.hayn@sableinternational.com",
    PassportCountry: 5478,
    PassportNumber: "ytrewq4321",
    AdditionalPassports: [
      {
        Id: "25d9c9d9-efd0-ec11-a402-005056011ae9",
        StateCode: 0,
        PassportCountry: 5428,
        PassportNumber: null,
      },
    ],
    CountryOfBirth: 5453,
    Adopted: true,
    SpentThreeYearsInUk: false,
    Ancestry: [
      {
        Id: "240249e0-efd0-ec11-a402-005056011ae9",
        StateCode: 0,
        FatherCountryOfBirth: 5478,
        FatherDateOfBirth: "1993-12-31T00:00:00",
        MotherCountryOfBirth: 5453,
        MotherDateOfBirth: "1993-06-17T01:00:00",
        ParentsDateOfMarriage: "1993-06-17T01:00:00",
        FathersFatherCountryOfBirth: 803,
        FathersMotherCountryOfBirth: 5453,
        MothersFatherCountryOfBirth: 5453,
        MothersMotherCountryOfBirth: 4328,
      },
    ],
    HighestTertiaryQualification: 100000001,
    AdditionalQualifications: [],
    AdditionalLanguages: [],
    WorkStatus: 100000000,
    JobTitle: "job stuff",
    Experience: "44",
    InPersonOrRemote: 100000000,
    Holding: [],
    SalaryAndBonus: 0.0,
    AdditionalIncome: [],
    Assets: [],
    Budget: [],
  },
  Partner: null,
  Dependents: [],
  TimeZone: {
    Windows: "GMT Standard Time",
    Iana: "Europe/London",
  },
};