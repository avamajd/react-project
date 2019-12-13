export default {
  isNumber: str => {
    const pattern = /^[0-9]+$/;
    return pattern.test(str);
  },

  isPhoneNumber: str => {
    const pattern = /^(0)?9\d{9}$/;
    return pattern.test(str);
  },

  isShorterThan: (str, len) => str.length < len,

  isEmpty: value =>
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
};
