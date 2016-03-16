function isBlank(value) {
  return value === '';
}

function isNotBlank(value) {
  return value !== '';
}

function isValidSSN(value) {
  if (value !== null) {
    return /^\d{3}-\d{2}-\d{4}$/.test(value);
  }
  return true;
}

function isValidDate(day, month, year) {
  if (day !== null && month !== null && year !== null) {
    // Use the date class to see if the date parses back sanely as a
    // validation check. Not sure this is a great idea...
    const adjustedMonth = Number(month) - 1;  // JS Date object 0-indexes months. WTF.
    const date = new Date(year, adjustedMonth, day);
    return date.getDate() === Number(day) &&
      date.getMonth() === adjustedMonth &&
      date.getFullYear() === Number(year);
  }
  return true;
}

function isValidName(value) {
  return /^[a-zA-Z '\-]+$/.test(value);
}

function isValidMonetaryValue(value) {
  return /^\d+\.?\d*$/.test(value);
}

// TODO: look into validation libraries (npm "validator")
function isValidPhone(value) {
  return /^\d{3}-\d{3}-\d{4}$/.test(value);
}

function isValidEmail(value) {
  // Comes from StackOverflow: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}

// TODO:  1. what is a valid address?
//        2. 6 arguments to a function is ugly...
//        3. argument order is now based on form order... using
function isValidAddress(street, city, country, state, zipcode) {
  // arbitraty use of field to keep linter happy until we answer #1
  let n = 0;
  if (street === '') n++;
  if (city === '') n++;
  if (country === '') n++;
  if (state === '') n++;
  if (zipcode === '') n++;
  return true;
}

function isValidNameAndGeneralInformation(data) {
  return this.isNotBlank(data.fullName.first) &&
      this.isValidName(data.fullName.first) &&
      (isBlank(data.fullName.middle) || isValidName(data.fullName.middle)) &&
      this.isNotBlank(data.fullName.last) &&
      this.isValidName(data.fullName.last) &&
      this.isValidSSN(data.socialSecurityNumber) &&
      this.isValidDate(data.dateOfBirth.day, data.dateOfBirth.month, data.dateOfBirth.year);
}

function isValidSection(sectionPath, sectionData) {
  const sectionName = sectionPath[sectionPath.length - 1];
  switch (sectionName) {
    case 'name-and-general-information':
      return this.isValidNameAndGeneralInformation(sectionData);
    default:
      return true;
  }
}

export {
  isBlank,
  isNotBlank,
  isValidDate,
  isValidName,
  isValidSSN,
  isValidMonetaryValue,
  isValidPhone,
  isValidEmail,
  isValidAddress,
  isValidNameAndGeneralInformation,
  isValidSection
};
