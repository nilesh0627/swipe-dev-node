export const FIRST_NAME = "firstName";
export const LAST_NAME = "lastName";
export const GENDER = "gender";
export const SKILLS = "skills";
export const AGE = "age";
export const PASSWORD = "password";
export const PHOTO_URL = "photoUrl";
export const EMAIL = "email";

export const ALLOWED_FIELDS_TO_UPDATE = [
  FIRST_NAME,
  LAST_NAME,
  GENDER,
  SKILLS,
  AGE,
  PASSWORD,
  PHOTO_URL,
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
];

export const MANDATORY_FIELDS = [FIRST_NAME, LAST_NAME, EMAIL, AGE, PASSWORD];

export const VALIDATION_MESSAGE = {
  EMPTY: {
    firstName: `First name can't be empty`,
    lastName: `Last name can't be empty`,
    email: `Email can't be empty.`,
    password: `Password can't be empty`,
    age: `Age can't be empty`,
  },
  INVALID: {
    firstName: `First name must be in between 4 to 20 characters`,
    lastName: `Last name must be in between 4 to 20 characters`,
    email: `Email format is invalid`,
    age: `User's age must be greater than 18 years`,
    skills: `Number of skills can't exceed more than 10`,
    photoUrl: `The format of photo url is not valid`,
    gender: `Gender can either male/female/others.`,
    password: `Password must contain atleast 1 of each Upper case, Lower case and special character. Minimum Length of password should be atleast 8`,
  },
};

export const GENDER_LIST = ["MALE", "FEMALE", "OTHERS"];
