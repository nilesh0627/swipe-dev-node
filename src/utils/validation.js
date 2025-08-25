import validator from "validator";
import {
  AGE,
  ALL_FIELDS,
  EMAIL,
  FIRST_NAME,
  GENDER,
  GENDER_LIST,
  LAST_NAME,
  MANDATORY_FIELDS,
  PASSWORD,
  PHOTO_URL,
  SKILLS,
  VALIDATION_MESSAGE,
} from "./constants.js";
import { isEmpty } from "./helper.js";

export const signupValidation = (signUpData = {}) => {
  for (let field of MANDATORY_FIELDS) {
    if (isEmpty(signUpData[field])) return getValidatonMessage(field, "EMPTY");
  }
  for (let field of ALL_FIELDS) {
    switch (field) {
      case FIRST_NAME:
      case LAST_NAME:
        if (signUpData[field]?.length < 4 || signUpData[field]?.length > 20)
          return getValidatonMessage(field, "INVALID");
        break;
      case EMAIL:
        if (!validator.isEmail(signUpData[field]))
          return getValidatonMessage(field, "INVALID");
        break;
      case AGE:
        if (signUpData[field] < 18)
          return getValidatonMessage(field, "INVALID");
        break;
      case SKILLS:
        if (!isEmpty(signUpData[field]) && signUpData[field]?.length > 10)
          return getValidatonMessage(field, "INVALID");
        break;
      case PHOTO_URL:
        if (!isEmpty(signUpData[field]) && !validator.isURL(signUpData[field]))
          return getValidatonMessage(field, "INVALID");
        break;
      case GENDER:
        if (
          !isEmpty(signUpData[field]) &&
          typeof signUpData[field] === "string" &&
          !GENDER_LIST.includes(signUpData[field].toUpperCase())
        )
          return getValidatonMessage(field, "INVALID");
        break;
      case PASSWORD:
        if (!validator.isStrongPassword(signUpData[field]))
          return getValidatonMessage(field, "INVALID");
      default:
        break;
    }
  }
};

const getValidatonMessage = (field, type) => {
  throw new Error(VALIDATION_MESSAGE?.[type]?.[field]);
};
