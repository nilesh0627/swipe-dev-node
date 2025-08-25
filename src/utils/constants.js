export const FIRST_NAME = "firstName";
export const LAST_NAME = "lastName";
export const GENDER = "gender";
export const SKILLS = "skills";
export const AGE = "age";
export const PASSWORD = "password";
export const PHOTO_URL = "photoUrl";
export const EMAIL = "email";
export const ABOUT = "about";

export const ALLOWED_FIELDS_TO_UPDATE = [
  FIRST_NAME,
  LAST_NAME,
  GENDER,
  SKILLS,
  AGE,
  PASSWORD,
  PHOTO_URL,
  ABOUT,
];

export const ALL_FIELDS = [
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  GENDER,
  SKILLS,
  AGE,
  PASSWORD,
  PHOTO_URL,
  ABOUT,
];

export const MANDATORY_FIELDS = [FIRST_NAME, LAST_NAME, EMAIL, AGE, PASSWORD];

export const VALIDATION_MESSAGE = {
  EMPTY: {
    [FIRST_NAME]: `First name can't be empty`,
    [LAST_NAME]: `Last name can't be empty`,
    [EMAIL]: `Email can't be empty.`,
    [PASSWORD]: `Password can't be empty`,
    [AGE]: `Age can't be empty`,
  },
  INVALID: {
    [FIRST_NAME]: `First name must be in between 4 to 20 characters`,
    [LAST_NAME]: `Last name must be in between 4 to 20 characters`,
    [EMAIL]: `Email format is invalid`,
    [AGE]: `User's age must be greater than 18 years`,
    [SKILLS]: `Number of skills can't exceed more than 10`,
    [PHOTO_URL]: `The format of photo url is not valid`,
    [GENDER]: `Gender can either male/female/others.`,
    [PASSWORD]: `Password must contain atleast 1 of each Upper case, Lower case and special character. Minimum Length of password should be atleast 8`,
    [ABOUT]: `User about description can't be more than 150 words`,
  },
};

export const GENDER_LIST = ["MALE", "FEMALE", "OTHERS"];
