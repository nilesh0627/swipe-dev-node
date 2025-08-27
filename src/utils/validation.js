import validator from "validator";
import {
  ABOUT,
  AGE,
  ALL_FIELDS,
  EMAIL,
  FIRST_NAME,
  GENDER,
  GENDER_LIST,
  LAST_NAME,
  PASSWORD,
  PHOTO_URL,
  SKILLS,
  VALIDATION_MESSAGE,
} from "./constants.js";
import { isEmpty } from "./helper.js";

const getValidatonMessage = (field, type) => {
  throw new Error(VALIDATION_MESSAGE?.[type]?.[field]);
};

export const validateUserInfoField = (field, value, required = false) => {
  if (required && isEmpty(value)) return getValidatonMessage(field, "EMPTY");
  switch (field) {
    case FIRST_NAME:
      if (value?.length < 3 || value?.length > 20)
        return getValidatonMessage(field, "INVALID");
      break;
    case LAST_NAME:
      if (value?.length < 1 || value?.length > 20)
        return getValidatonMessage(field, "INVALID");
      break;
    case EMAIL:
      if (!validator.isEmail(value))
        return getValidatonMessage(field, "INVALID");
      break;
    case AGE:
      if (value < 18) return getValidatonMessage(field, "INVALID");
      break;
    case SKILLS:
      if (!isEmpty(value) && value?.length > 10)
        return getValidatonMessage(field, "INVALID");
      break;
    case PHOTO_URL:
      if (!isEmpty(value) && !validator.isURL(value))
        return getValidatonMessage(field, "INVALID");
      break;
    case ABOUT:
      if (
        !isEmpty(value) &&
        typeof value === "string" &&
        value.split(" ").length > 150
      )
        return getValidatonMessage(field, "INVALID");
      break;
    case GENDER:
      if (
        !isEmpty(value) &&
        typeof value === "string" &&
        !GENDER_LIST.includes(value.toUpperCase())
      )
        return getValidatonMessage(field, "INVALID");
      break;
    case PASSWORD:
      if (!validator.isStrongPassword(value))
        return getValidatonMessage(field, "INVALID");
      break;
    default:
      break;
  }
};

export const signUpDataValidation = (body) => {
  ALL_FIELDS.forEach((FIELD) => {
    validateUserInfoField(FIELD, body[FIELD]);
  });
};
