export const sampleFields = {
  fields: [
    {
      label: "FileNumber",
      value: "FileNumber",
    },
    {
      label: "FirmName",
      value: "FirmName",
    },
    {
      label: "WillStorage",
      value: "WillStorage",
    },
    {
      label: "NumberOfClients",
      value: "NumberOfClients",
    },
    {
      label: "Clients",
      value: "Clients",
      children: [
        { label: "FullName", value: "ClientsFullName" },
        { label: "LastName", value: "ClientsLastName" },
        { label: "Title", value: "ClientsTitle" },
      ],
    },
    {
      label: "DateWillSigned",
      value: "DateWillSigned",
    },
    {
      label: "DateWillSignedMidEnd",
      value: "DateWillSignedMidEnd",
    },
    {
      label: "Client",
      value: "Client",
      children: [
        { label: "FirstName", value: "ClientFirstName" },
        { label: "LastName", value: "ClientLastName" },
        { label: "MiddleName", value: "ClientMiddleName" },
        { label: "FullName", value: "ClientFullName" },
        { label: "BirthDate", value: "ClientBirthDate" },
        { label: "BirthLocation", value: "ClientBirthLocation" },
        { label: "Gender", value: "ClientGender" },
        { label: "Title", value: "ClientTitle" },
        { label: "HeSheWord", value: "ClientHeSheWord" },
        { label: "HimHerWord", value: "ClientHimHerWord" },
        { label: "HisHerWord", value: "ClientHisHerWord" },
        { label: "Occupation", value: "ClientOccupation" },
        { label: "Municipality", value: "ClientMunicipality" },
        { label: "AddressMultiLines", value: "ClientAddressMultiLines" },
        { label: "AddressOneLine", value: "ClientAddressOneLine" },
        { label: "Blind", value: "ClientBlind" },
        { label: "SignedByMark", value: "ClientSignedByMark" },
        { label: "MaritalStatus", value: "ClientMaritalStatus" },
        { label: "MaritalStatusVerb", value: "ClientMaritalStatusVerb" },
        { label: "MaritalStatusNoune", value: "ClientMaritalStatusNoune" },
        { label: "hasSpouse", value: "ClienthasSpouse" },
        { label: "SpouseFullName", value: "ClientSpouseFullName" },
        { label: "SpouseFirstName", value: "ClientSpouseFirstName" },
        { label: "SpouseRelation", value: "ClientSpouseRelation" },
        { label: "SpouseHeSheWord", value: "ClientSpouseHeSheWord" },
        { label: "SpouseHimHerWord", value: "ClientSpouseHimHerWord" },
        { label: "SpouseHisHerWord", value: "ClientSpouseHisHerWord" },
      ],
    },
    {
      label: "GuardianSelected",
      value: "GuardianSelected",
    },
    {
      label: "GuardianPrimaryRelation",
      value: "GuardianPrimaryRelation",
    },
    {
      label: "GuardianPrimaryFullName",
      value: "GuardianPrimaryFullName",
    },
    {
      label: "alternateGuardian",
      value: "alternateGuardian",
    },
    {
      label: "GuardianAlternateRelation",
      value: "GuardianAlternateRelation",
    },
    {
      label: "GuardianAlternateFullName",
      value: "GuardianAlternateFullName",
    },
    {
      label: "PrimaryTrusteesNumber",
      value: "PrimaryTrusteesNumber",
    },
    {
      label: "AlternateTrusteesNumber",
      value: "AlternateTrusteesNumber",
    },
    {
      label: "AlternateResidueDistribution",
      value: "AlternateResidueDistribution",
    },
    {
      label: "ResiduePrimary",
      value: "ResiduePrimary",
    },
    {
      label: "ResidueAlternate",
      value: "ResidueAlternate",
    },
    {
      label: "ResiduePrimaryIndividualsNumber",
      value: "ResiduePrimaryIndividualsNumber",
    },
    {
      label: "ResidueAlternateIndividualsNumber",
      value: "ResidueAlternateIndividualsNumber",
    },
    {
      label: "ResiduePrimaryTrustAge",
      value: "ResiduePrimaryTrustAge",
    },
    {
      label: "ResidueAlternateTrustAge",
      value: "ResidueAlternateTrustAge",
    },
    {
      label: "UltimateDistribution",
      value: "UltimateDistribution",
    },
    {
      label: "UltimateDistributionNumber",
      value: "UltimateDistributionNumber",
    },
    {
      label: "UltimateBeneficiariesOneNumber",
      value: "UltimateBeneficiariesOneNumber",
    },
    {
      label: "UltimateBeneficiariesTwoNumber",
      value: "UltimateBeneficiariesTwoNumber",
    },
    {
      label: "UltimateBeneficiariesThreeNumber",
      value: "UltimateBeneficiariesThreeNumber",
    },
    {
      label: "UltimateBeneficiariesFourNumber",
      value: "UltimateBeneficiariesFourNumber",
    },
    {
      label: "AttorneysPropertyPrimaryNumber",
      value: "AttorneysPropertyPrimaryNumber",
    },
    {
      label: "AttorneysPropertyPrimaryAct",
      value: "AttorneysPropertyPrimaryAct",
    },
    {
      label: "AttorneysPropertyAlternateNumber",
      value: "AttorneysPropertyAlternateNumber",
    },
    {
      label: "AttorneysPropertyAlternateAct",
      value: "AttorneysPropertyAlternateAct",
    },
    {
      label: "PoaPropertyRestrictions",
      value: "PoaPropertyRestrictions",
    },
    {
      label: "AttorneysCarePrimaryNumber",
      value: "AttorneysCarePrimaryNumber",
    },
    {
      label: "AttorneysCarePrimaryAct",
      value: "AttorneysCarePrimaryAct",
    },
    {
      label: "AttorneysCareAlternateNumber",
      value: "AttorneysCareAlternateNumber",
    },
    {
      label: "AttorneysCareAlternateAct",
      value: "AttorneysCareAlternateAct",
    },
    {
      label: "PoaCareRestrictions",
      value: "PoaCareRestrictions",
      children: [{ label: "Restriction", value: "PoaCareRestrictionsRestriction" }],
    },
    {
      label: "AttorneysPropertyPrimary",
      value: "AttorneysPropertyPrimary",
      children: [
        { label: "FullName", value: "AttorneysPropertyPrimaryFullName" },
        { label: "Relation", value: "AttorneysPropertyPrimaryRelation" },
        { label: "HeShe", value: "AttorneysPropertyPrimaryHeShe" },
      ],
    },
    {
      label: "AttorneysPropertyAlternate",
      value: "AttorneysPropertyAlternate",
      children: [
        { label: "FullName", value: "AttorneysPropertyAlternateFullName" },
        { label: "Relation", value: "AttorneysPropertyAlternateRelation" },
        { label: "HeShe", value: "AttorneysPropertyAlternateHeShe" },
      ],
    },
    {
      label: "AttorneysCarePrimary",
      value: "AttorneysCarePrimary",
      children: [
        { label: "FullName", value: "AttorneysCarePrimaryFullName" },
        { label: "Relation", value: "AttorneysCarePrimaryRelation" },
        { label: "HeShe", value: "AttorneysCarePrimaryHeShe" },
      ],
    },
    {
      label: "AttorneysCareAlternate",
      value: "AttorneysCareAlternate",
      children: [
        { label: "FullName", value: "AttorneysCareAlternateFullName" },
        { label: "Relation", value: "AttorneysCareAlternateRelation" },
        { label: "HeShe", value: "AttorneysCareAlternateHeShe" },
      ],
    },
    {
      label: "ResidueBeneficiariesPrimary",
      value: "ResidueBeneficiariesPrimary",
      children: [
        { label: "FullName", value: "ResidueBeneficiariesPrimaryFullName" },
        { label: "Relation", value: "ResidueBeneficiariesPrimaryRelation" },
        { label: "HeShe", value: "ResidueBeneficiariesPrimaryHeShe" },
        { label: "GiftOver", value: "ResidueBeneficiariesPrimaryGiftOver" },
        { label: "Spouse", value: "ResidueBeneficiariesPrimarySpouse" },
      ],
    },
    {
      label: "ResidueBeneficiariesAlternate",
      value: "ResidueBeneficiariesAlternate",
      children: [
        { label: "FullName", value: "ResidueBeneficiariesAlternateFullName" },
        { label: "Relation", value: "ResidueBeneficiariesAlternateRelation" },
        { label: "HeShe", value: "ResidueBeneficiariesAlternateHeShe" },
        { label: "GiftOver", value: "ResidueBeneficiariesAlternateGiftOver" },
        { label: "Spouse", value: "ResidueBeneficiariesAlternateSpouse" },
      ],
    },
    {
      label: "UltimateBeneficiariesOne",
      value: "UltimateBeneficiariesOne",
      children: [
        { label: "FullName", value: "UltimateBeneficiariesOneFullName" },
        { label: "Relation", value: "UltimateBeneficiariesOneRelation" },
        { label: "HeShe", value: "UltimateBeneficiariesOneHeShe" },
        { label: "GiftOver", value: "UltimateBeneficiariesOneGiftOver" },
      ],
    },
    {
      label: "UltimateBeneficiariesTwo",
      value: "UltimateBeneficiariesTwo",
      children: [
        { label: "FullName", value: "UltimateBeneficiariesTwoFullName" },
        { label: "Relation", value: "UltimateBeneficiariesTwoRelation" },
        { label: "HeShe", value: "UltimateBeneficiariesTwoHeShe" },
        { label: "GiftOver", value: "UltimateBeneficiariesTwoGiftOver" },
      ],
    },
    {
      label: "UltimateBeneficiariesThree",
      value: "UltimateBeneficiariesThree",
      children: [
        { label: "FullName", value: "UltimateBeneficiariesThreeFullName" },
        { label: "Relation", value: "UltimateBeneficiariesThreeRelation" },
        { label: "HeShe", value: "UltimateBeneficiariesThreeHeShe" },
        { label: "GiftOver", value: "UltimateBeneficiariesThreeGiftOver" },
      ],
    },
    {
      label: "UltimateBeneficiariesFour",
      value: "UltimateBeneficiariesFour",
      children: [
        { label: "FullName", value: "UltimateBeneficiariesFourFullName" },
        { label: "Relation", value: "UltimateBeneficiariesFourRelation" },
        { label: "HeShe", value: "UltimateBeneficiariesFourHeShe" },
        { label: "GiftOver", value: "UltimateBeneficiariesFourGiftOver" },
      ],
    },
    {
      label: "Children",
      value: "Children",
      children: [
        { label: "FullName", value: "ChildrenFullName" },
        { label: "Relation", value: "ChildrenRelation" },
      ],
    },
    {
      label: "TrusteesPrimary",
      value: "TrusteesPrimary",
      children: [
        { label: "FullName", value: "TrusteesPrimaryFullName" },
        { label: "Relation", value: "TrusteesPrimaryRelation" },
      ],
    },
    {
      label: "TrusteesAlternate",
      value: "TrusteesAlternate",
      children: [
        { label: "FullName", value: "TrusteesAlternateFullName" },
        { label: "Relation", value: "TrusteesAlternateRelation" },
      ],
    },
    {
      label: "Lawyer",
      value: "Lawyer",
      children: [
        { label: "Name", value: "LawyerName" },
        { label: "FirmName", value: "LawyerFirmName" },
        { label: "FirmTitle", value: "LawyerFirmTitle" },
        { label: "Municipality", value: "LawyerMunicipality" },
        { label: "AddressMultiLines", value: "LawyerAddressMultiLines" },
        { label: "Telephone", value: "LawyerTelephone" },
        { label: "Fax", value: "LawyerFax" },
        { label: "Email", value: "LawyerEmail" },
        { label: "Website", value: "LawyerWebsite" },
        { label: "Initials", value: "LawyerInitials" },
      ],
    },
    {
      label: "Staff",
      value: "Staff",
      children: [
        { label: "Name", value: "StaffName" },
        { label: "Municipality", value: "StaffMunicipality" },
        { label: "Initials", value: "StaffInitials" },
        { label: "Occupation", value: "StaffOccupation" },
      ],
    },
    {
      label: "WitnessOne",
      value: "WitnessOne",
      children: [
        { label: "Name", value: "WitnessOneName" },
        { label: "Municipality", value: "WitnessOneMunicipality" },
        { label: "Initials", value: "WitnessOneInitials" },
        { label: "Occupation", value: "WitnessOneOccupation" },
      ],
    },
    {
      label: "WitnessTwo",
      value: "WitnessTwo",
      children: [
        { label: "Name", value: "WitnessTwoName" },
        { label: "Municipality", value: "WitnessTwoMunicipality" },
        { label: "Initials", value: "WitnessTwoInitials" },
        { label: "Occupation", value: "WitnessTwoOccupation" },
      ],
    },
    {
      label: "CommissionerMunicipality",
      value: "CommissionerMunicipality",
    },
    {
      label: "RemoteSigning",
      value: "RemoteSigning",
    },
    {
      label: "RemoteWitness",
      value: "RemoteWitness",
    },
    {
      label: "RemoteCommissioner",
      value: "RemoteCommissioner",
    },
    {
      label: "MainFeeAmount",
      value: "MainFeeAmount",
      isMoney: true,
    },
    {
      label: "MainFeeDescription",
      value: "MainFeeDescription",
    },
    {
      label: "OtherFees",
      value: "OtherFees",
      children: [
        { label: "Description", value: "OtherFeesDescription" },
        { label: "Amount", value: "OtherFeesAmount", isMoney: true },
      ],
    },
    {
      label: "TotalFeesAmount",
      value: "TotalFeesAmount",
      isMoney: true,
    },
    {
      label: "TotalFeesHSTAmount",
      value: "TotalFeesHSTAmount",
      isMoney: true,
    },
    {
      label: "Disbursements",
      value: "Disbursements",
      children: [
        { label: "Description", value: "DisbursementsDescription" },
        { label: "Amount", value: "DisbursementsAmount", isMoney: true },
      ],
    },
    {
      label: "TotalDisbursementsAmount",
      value: "TotalDisbursementsAmount",
      isMoney: true,
    },
    {
      label: "TotalDisbursementsHstAmount",
      value: "TotalDisbursementsHstAmount",
      isMoney: true,
    },
    {
      label: "DisbursementsNonHstExist",
      value: "DisbursementsNonHstExist",
    },
    {
      label: "DisbursementsNonHst",
      value: "DisbursementsNonHst",
      children: [
        { label: "Description", value: "DisbursementsNonHstDescription" },
        { label: "Amount", value: "DisbursementsNonHstAmount", isMoney: true },
      ],
    },
    {
      label: "TotalDisbursementsNonHstAmount",
      value: "TotalDisbursementsNonHstAmount",
      isMoney: true,
    },
    {
      label: "TotalAmount",
      value: "TotalAmount",
      isMoney: true,
    },
    {
      label: "AmountPaid",
      value: "AmountPaid",
      isMoney: true,
    },
    {
      label: "AmountOwing",
      value: "AmountOwing",
      isMoney: true,
    },
  ],
};

export const printFilterOptions = [
  "filter",
  "currency",
  "number",
  "date",
  "json",
  "lowercase",
  "uppercase",
  "limitTo",
  "orderBy",
];

export const formatOptions = ["$X,XXX", "X,XXX$", "$XXXX", "Ten dollars and twenty cents", "As is"];

export const outputOptions = ["As is", "UPPERCASE", "lowercase", "Title Case", "Sentence case."];

export const basicOperators = [">", "<", ">=", "<=", "==", "!="];

export const loopBlockOptions = ["p", "tr"];

export const loopFilters = ["filter", "limitTo", "orderBy"];
