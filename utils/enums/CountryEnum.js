const iso3166 = require("iso-3166-1-alpha-2");

// Function to generate the countries with their codes
function generateCountryEnums() {
  const countryNames = {};
  const countryCodes = {};
  for (const countryCode in iso3166.data) {
    const countryData = iso3166.data[countryCode];
    const countryName = countryData.name;
    const countryCodeNumeric = countryData.numeric;
    const countryWithCode = `+${countryCodeNumeric}`;
    countryNames[countryName] = countryCode;
    countryCodes[countryCode] = countryWithCode;
  }
  return { names: countryNames, codes: countryCodes };
}

const { names: CountryNamesEnum, codes: CountryCodesEnum } =
  generateCountryEnums();

module.exports = {
  CountryNamesEnum,
  CountryCodesEnum,
};
