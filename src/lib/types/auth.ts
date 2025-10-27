export interface RegisterFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  countryOfCitizenship: string;
  email: string;
  referralResource: string;
  countryOfInterest: string;
  gdprConsent: boolean;
}

export interface VerificationData {
  email: string;
  verificationCode: string;
}
