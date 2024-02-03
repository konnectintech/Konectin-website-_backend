
exports.getCountry = (arr, abbreviation)=>{
    let firstIndex = 0;
    let lastIndex = arr.length - 1;
    let middleIndex = Math.floor((firstIndex + lastIndex)/2);
    if(arr[middleIndex][abbreviation] === abbreviation){
        return arr[middleIndex][full_name];
    }else if(arr[middleIndex][abbreviation] > arr[middleIndex][firstIndex]){
        firstIndex = arr[middleIndex] + 1;
    }else{
        firstIndex = arr[middleIndex] -1;
    }
    return -1;
};

exports.countries = [
    {
      abbreviation: "AD",
      full_name: "Andorra"
    },
    {
      abbreviation: "AE",
      full_name: "United Arab Emirates"
    },
    {
      abbreviation: "AF",
      full_name: "Afghanistan"
    },
    {
      abbreviation: "AG",
      full_name: "Antigua and Barbuda"
    },
    {
      abbreviation: "AI",
      full_name: "Anguilla"
    },
    {
      abbreviation: "AL",
      full_name: "Albania"
    },
    {
      abbreviation: "AM",
      full_name: "Armenia"
    },
    {
      abbreviation: "AO",
      full_name: "Angola"
    },
    {
      abbreviation: "AQ",
      full_name: "Antarctica"
    },
    {
      abbreviation: "AR",
      full_name: "Argentina"
    },
    {
      abbreviation: "AS",
      full_name: "American Samoa"
    },
    {
      abbreviation: "AT",
      full_name: "Austria"
    },
    {
      abbreviation: "AU",
      full_name: "Australia"
    },
    {
      abbreviation: "AW",
      full_name: "Aruba"
    },
    {
      abbreviation: "AX",
      full_name: "Åland Islands"
    },
    {
      abbreviation: "AZ",
      full_name: "Azerbaijan"
    },
    {
      abbreviation: "BA",
      full_name: "Bosnia and Herzegovina"
    },
    {
      abbreviation: "BB",
      full_name: "Barbados"
    },
    {
      abbreviation: "BD",
      full_name: "Bangladesh"
    },
    {
      abbreviation: "BE",
      full_name: "Belgium"
    },
    {
      abbreviation: "BF",
      full_name: "Burkina Faso"
    },
    {
      abbreviation: "BG",
      full_name: "Bulgaria"
    },
    {
      abbreviation: "BH",
      full_name: "Bahrain"
    },
    {
      abbreviation: "BI",
      full_name: "Burundi"
    },
    {
      abbreviation: "BJ",
      full_name: "Benin"
    },
    {
      abbreviation: "BL",
      full_name: "Saint Barthélemy"
    },
    {
      abbreviation: "BM",
      full_name: "Bermuda"
    },
    {
      abbreviation: "BN",
      full_name: "Brunei Darussalam"
    },
    {
      abbreviation: "BO",
      full_name: "Bolivia, Plurinational State of"
    },
    {
      abbreviation: "BQ",
      full_name: "Bonaire, Sint Eustatius and Saba"
    },
    {
      abbreviation: "BR",
      full_name: "Brazil"
    },
    {
      abbreviation: "BS",
      full_name: "Bahamas"
    },
    {
      abbreviation: "BT",
      full_name: "Bhutan"
    },
    {
      abbreviation: "BV",
      full_name: "Bouvet Island"
    },
    {
      abbreviation: "BW",
      full_name: "Botswana"
    },
    {
      abbreviation: "BY",
      full_name: "Belarus"
    },
    {
      abbreviation: "BZ",
      full_name: "Belize"
    },
    {
      abbreviation: "CA",
      full_name: "Canada"
    },
    {
      abbreviation: "CC",
      full_name: "Cocos (Keeling) Islands"
    },
    {
      abbreviation: "CD",
      full_name: "Congo, Democratic Republic of the"
    },
    {
      abbreviation: "CF",
      full_name: "Central African Republic"
    },
    {
      abbreviation: "CG",
      full_name: "Congo"
    },
    {
      abbreviation: "CH",
      full_name: "Switzerland"
    },
    {
      abbreviation: "CI",
      full_name: "Côte d'Ivoire"
    },
    {
      abbreviation: "CK",
      full_name: "Cook Islands"
    },
    {
      abbreviation: "CL",
      full_name: "Chile"
    },
    {
      abbreviation: "CM",
      full_name: "Cameroon"
    },
    {
      abbreviation: "CN",
      full_name: "China"
    },
    {
      abbreviation: "CO",
      full_name: "Colombia"
    },
    {
      abbreviation: "CR",
      full_name: "Costa Rica"
    },
    {
      abbreviation: "CU",
      full_name: "Cuba"
    },
    {
      abbreviation: "CV",
      full_name: "Cabo Verde"
    },
    {
      abbreviation: "CW",
      full_name: "Curaçao"
    },
    {
      abbreviation: "CX",
      full_name: "Christmas Island"
    },
    {
      abbreviation: "CY",
      full_name: "Cyprus"
    },
    {
      abbreviation: "CZ",
      full_name: "Czechia"
    },
    {
      abbreviation: "DE",
      full_name: "Germany"
    },
    {
      abbreviation: "DJ",
      full_name: "Djibouti"
    },
    {
      abbreviation: "DK",
      full_name: "Denmark"
    },
    {
      abbreviation: "DM",
      full_name: "Dominica"
    },
    {
      abbreviation: "DO",
      full_name: "Dominican Republic"
    },
    {
      abbreviation: "DZ",
      full_name: "Algeria"
    },
    {
      abbreviation: "EC",
      full_name: "Ecuador"
    },
    {
      abbreviation: "EE",
      full_name: "Estonia"
    },
    {
      abbreviation: "EG",
      full_name: "Egypt"
    },
    {
      abbreviation: "EH",
      full_name: "Western Sahara"
    },
    {
      abbreviation: "ER",
      full_name: "Eritrea"
    },
    {
      abbreviation: "ES",
      full_name: "Spain"
    },
    {
      abbreviation: "ET",
      full_name: "Ethiopia"
    },
    {
      abbreviation: "FI",
      full_name: "Finland"
    },
    {
      abbreviation: "FJ",
      full_name: "Fiji"
    },
    {
      abbreviation: "FK",
      full_name: "Falkland Islands (Malvinas)"
    },
    {
      abbreviation: "FM",
      full_name: "Micronesia, Federated States of"
    },
    {
      abbreviation: "FO",
      full_name: "Faroe Islands"
    },
    {
      abbreviation: "FR",
      full_name: "France"
    },
    {
      abbreviation: "GA",
      full_name: "Gabon"
    },
    {
      abbreviation: "GB",
      full_name: "United Kingdom of Great Britain and Northern Ireland"
    },
    {
      abbreviation: "GD",
      full_name: "Grenada"
    },
    {
      abbreviation: "GE",
      full_name: "Georgia"
    },
    {
      abbreviation: "GF",
      full_name: "French Guiana"
    },
    {
      abbreviation: "GG",
      full_name: "Guernsey"
    },
    {
      abbreviation: "GH",
      full_name: "Ghana"
    },
    {
      abbreviation: "GI",
      full_name: "Gibraltar"
    },
    {
      abbreviation: "GL",
      full_name: "Greenland"
    },
    {
      abbreviation: "GM",
      full_name: "Gambia"
    },
    {
      abbreviation: "GN",
      full_name: "Guinea"
    },
    {
      abbreviation: "GP",
      full_name: "Guadeloupe"
    },
    {
      abbreviation: "GQ",
      full_name: "Equatorial Guinea"
    },
    {
      abbreviation: "GR",
      full_name: "Greece"
    },
    {
      abbreviation: "GS",
      full_name: "South Georgia and the South Sandwich Islands"
    },
    {
      abbreviation: "GT",
      full_name: "Guatemala"
    },
    {
      abbreviation: "GU",
      full_name: "Guam"
    },
    {
      abbreviation: "GW",
      full_name: "Guinea-Bissau"
    },
    {
      abbreviation: "GY",
      full_name: "Guyana"
    },
    {
      abbreviation: "HK",
      full_name: "Hong Kong"
    },
    {
      abbreviation: "HM",
      full_name: "Heard Island and McDonald Islands"
    },
    {
      abbreviation: "HN",
      full_name: "Honduras"
    },
    {
      abbreviation: "HR",
      full_name: "Croatia"
    },
    {
      abbreviation: "HT",
      full_name: "Haiti"
    },
    {
      abbreviation: "HU",
      full_name: "Hungary"
    },
    {
      abbreviation: "ID",
      full_name: "Indonesia"
    },
    {
      abbreviation: "IE",
      full_name: "Ireland"
    },
    {
      abbreviation: "IL",
      full_name: "Israel"
    },
    {
      abbreviation: "IM",
      full_name: "Isle of Man"
    },
    {
      abbreviation: "IN",
      full_name: "India"
    },
    {
      abbreviation: "IO",
      full_name: "British Indian Ocean Territory"
    },
    {
      abbreviation: "IQ",
      full_name: "Iraq"
    },
    {
      abbreviation: "IR",
      full_name: "Iran, Islamic Republic of"
    },
    {
      abbreviation: "IS",
      full_name: "Iceland"
    },
    {
      abbreviation: "IT",
      full_name: "Italy"
    },
    {
      abbreviation: "JE",
      full_name: "Jersey"
    },
    {
      abbreviation: "JM",
      full_name: "Jamaica"
    },
    {
      abbreviation: "JO",
      full_name: "Jordan"
    },
    {
      abbreviation: "JP",
      full_name: "Japan"
    },
    {
      abbreviation: "KE",
      full_name: "Kenya"
    },
    {
      abbreviation: "KG",
      full_name: "Kyrgyzstan"
    },
    {
      abbreviation: "KH",
      full_name: "Cambodia"
    },
    {
      abbreviation: "KI",
      full_name: "Kiribati"
    },
    {
      abbreviation: "KM",
      full_name: "Comoros"
    },
    {
      abbreviation: "KN",
      full_name: "Saint Kitts and Nevis"
    },
    {
      abbreviation: "KP",
      full_name: "Korea, Democratic People's Republic of"
    },
    {
      abbreviation: "KR",
      full_name: "Korea, Republic of"
    },
    {
      abbreviation: "KW",
      full_name: "Kuwait"
    },
    {
      abbreviation: "KY",
      full_name: "Cayman Islands"
    },
    {
      abbreviation: "KZ",
      full_name: "Kazakhstan"
    },
    {
      abbreviation: "LA",
      full_name: "Lao People's Democratic Republic"
    },
    {
      abbreviation: "LB",
      full_name: "Lebanon"
    },
    {
      abbreviation: "LC",
      full_name: "Saint Lucia"
    },
    {
      abbreviation: "LI",
      full_name: "Liechtenstein"
    },
    {
      abbreviation: "LK",
      full_name: "Sri Lanka"
    },
    {
      abbreviation: "LR",
      full_name: "Liberia"
    },
    {
      abbreviation: "LS",
      full_name: "Lesotho"
    },
    {
      abbreviation: "LT",
      full_name: "Lithuania"
    },
    {
      abbreviation: "LU",
      full_name: "Luxembourg"
    },
    {
      abbreviation: "LV",
      full_name: "Latvia"
    },
    {
      abbreviation: "LY",
      full_name: "Libya"
    },
    {
      abbreviation: "MA",
      full_name: "Morocco"
    },
    {
      abbreviation: "MC",
      full_name: "Monaco"
    },
    {
      abbreviation: "MD",
      full_name: "Moldova, Republic of"
    },
    {
      abbreviation: "ME",
      full_name: "Montenegro"
    },
    {
      abbreviation: "MF",
      full_name: "Saint Martin, (French part)"
    },
    {
      abbreviation: "MG",
      full_name: "Madagascar"
    },
    {
      abbreviation: "MH",
      full_name: "Marshall Islands"
    },
    {
      abbreviation: "MK",
      full_name: "North Macedonia"
    },
    {
      abbreviation: "ML",
      full_name: "Mali"
    },
    {
      abbreviation: "MM",
      full_name: "Myanmar"
    },
    {
      abbreviation: "MN",
      full_name: "Mongolia"
    },
    {
      abbreviation: "MO",
      full_name: "Macao"
    },
    {
      abbreviation: "MP",
      full_name: "Northern Mariana Islands"
    },
    {
      abbreviation: "MQ",
      full_name: "Martinique"
    },
    {
      abbreviation: "MR",
      full_name: "Mauritania"
    },
    {
      abbreviation: "MS",
      full_name: "Montserrat"
    },
    {
      abbreviation: "MT",
      full_name: "Malta"
    },
    {
      abbreviation: "MU",
      full_name: "Mauritius"
    },
    {
      abbreviation: "MV",
      full_name: "Maldives"
    },
    {
      abbreviation: "MW",
      full_name: "Malawi"
    },
    {
      abbreviation: "MX",
      full_name: "Mexico"
    },
    {
      abbreviation: "MY",
      full_name: "Malaysia"
    },
    {
      abbreviation: "MZ",
      full_name: "Mozambique"
    },
    {
      abbreviation: "NA",
      full_name: "Namibia"
    },
    {
      abbreviation: "NC",
      full_name: "New Caledonia"
    },
    {
      abbreviation: "NE",
      full_name: "Niger"
    },
    {
      abbreviation: "NF",
      full_name: "Norfolk Island"
    },
    {
      abbreviation: "NG",
      full_name: "Nigeria"
    },
    {
      abbreviation: "NI",
      full_name: "Nicaragua"
    },
    {
      abbreviation: "NL",
      full_name: "Netherlands"
    },
    {
      abbreviation: "NO",
      full_name: "Norway"
    },
    {
      abbreviation: "NP",
      full_name: "Nepal"
    },
    {
      abbreviation: "NR",
      full_name: "Nauru"
    },
    {
      abbreviation: "NU",
      full_name: "Niue"
    },
    {
      abbreviation: "NZ",
      full_name: "New Zealand"
    },
    {
      abbreviation: "OM",
      full_name: "Oman"
    },
    {
      abbreviation: "PA",
      full_name: "Panama"
    },
    {
      abbreviation: "PE",
      full_name: "Peru"
    },
    {
      abbreviation: "PF",
      full_name: "French Polynesia"
    },
    {
      abbreviation: "PG",
      full_name: "Papua New Guinea"
    },
    {
      abbreviation: "PH",
      full_name: "Philippines"
    },
    {
      abbreviation: "PK",
      full_name: "Pakistan"
    },
    {
      abbreviation: "PL",
      full_name: "Poland"
    },
    {
      abbreviation: "PM",
      full_name: "Saint Pierre and Miquelon"
    },
    {
      abbreviation: "PN",
      full_name: "Pitcairn"
    },
    {
      abbreviation: "PR",
      full_name: "Puerto Rico"
    },
    {
      abbreviation: "PS",
      full_name: "Palestine, State of"
    },
    {
      abbreviation: "PT",
      full_name: "Portugal"
    },
    {
      abbreviation: "PW",
      full_name: "Palau"
    },
    {
      abbreviation: "PY",
      full_name: "Paraguay"
    },
    {
      abbreviation: "QA",
      full_name: "Qatar"
    },
    {
      abbreviation: "RE",
      full_name: "Réunion"
    },
    {
      abbreviation: "RO",
      full_name: "Romania"
    },
    {
      abbreviation: "RS",
      full_name: "Serbia"
    },
    {
      abbreviation: "RU",
      full_name: "Russian Federation"
    },
    {
      abbreviation: "RW",
      full_name: "Rwanda"
    },
    {
      abbreviation: "SA",
      full_name: "Saudi Arabia"
    },
    {
      abbreviation: "SB",
      full_name: "Solomon Islands"
    },
    {
      abbreviation: "SC",
      full_name: "Seychelles"
    },
    {
      abbreviation: "SD",
      full_name: "Sudan"
    },
    {
      abbreviation: "SE",
      full_name: "Sweden"
    },
    {
      abbreviation: "SG",
      full_name: "Singapore"
    },
    {
      abbreviation: "SH",
      full_name: "Saint Helena, Ascension and Tristan da Cunha"
    },
    {
      abbreviation: "SI",
      full_name: "Slovenia"
    },
    {
      abbreviation: "SJ",
      full_name: "Svalbard and Jan Mayen"
    },
    {
      abbreviation: "SK",
      full_name: "Slovakia"
    },
    {
      abbreviation: "SL",
      full_name: "Sierra Leone"
    },
    {
      abbreviation: "SM",
      full_name: "San Marino"
    },
    {
      abbreviation: "SN",
      full_name: "Senegal"
    },
    {
      abbreviation: "SO",
      full_name: "Somalia"
    },
    {
      abbreviation: "SR",
      full_name: "Suriname"
    },
    {
      abbreviation: "SS",
      full_name: "South Sudan"
    },
    {
      abbreviation: "ST",
      full_name: "Sao Tome and Principe"
    },
    {
      abbreviation: "SV",
      full_name: "El Salvador"
    },
    {
      abbreviation: "SX",
      full_name: "Sint Maarten, (Dutch part)"
    },
    {
      abbreviation: "SY",
      full_name: "Syrian Arab Republic"
    },
    {
      abbreviation: "SZ",
      full_name: "Eswatini"
    },
    {
      abbreviation: "TC",
      full_name: "Turks and Caicos Islands"
    },
    {
      abbreviation: "TD",
      full_name: "Chad"
    },
    {
      abbreviation: "TF",
      full_name: "French Southern Territories"
    },
    {
      abbreviation: "TG",
      full_name: "Togo"
    },
    {
      abbreviation: "TH",
      full_name: "Thailand"
    },
    {
      abbreviation: "TJ",
      full_name: "Tajikistan"
    },
    {
      abbreviation: "TK",
      full_name: "Tokelau"
    },
    {
      abbreviation: "TL",
      full_name: "Timor-Leste"
    },
    {
      abbreviation: "TM",
      full_name: "Turkmenistan"
    },
    {
      abbreviation: "TN",
      full_name: "Tunisia"
    },
    {
      abbreviation: "TO",
      full_name: "Tonga"
    },
    {
      abbreviation: "TR",
      full_name: "Türkiye"
    },
    {
      abbreviation: "TT",
      full_name: "Trinidad and Tobago"
    },
    {
      abbreviation: "TV",
      full_name: "Tuvalu"
    },
    {
      abbreviation: "TW",
      full_name: "Taiwan, Province of China"
    },
    {
      abbreviation: "TZ",
      full_name: "Tanzania, United Republic of"
    },
    {
      abbreviation: "UA",
      full_name: "Ukraine"
    },
    {
      abbreviation: "UG",
      full_name: "Uganda"
    },
    {
      abbreviation: "UM",
      full_name: "United States Minor Outlying Islands"
    },
    {
      abbreviation: "US",
      full_name: "United States of America"
    },
    {
      abbreviation: "UY",
      full_name: "Uruguay"
    },
    {
      abbreviation: "UZ",
      full_name: "Uzbekistan"
    },
    {
      abbreviation: "VA",
      full_name: "Holy See"
    },
    {
      abbreviation: "VC",
      full_name: "Saint Vincent and the Grenadines"
    },
    {
      abbreviation: "VE",
      full_name: "Venezuela, Bolivarian Republic of"
    },
    {
      abbreviation: "VG",
      full_name: "Virgin Islands, British"
    },
    {
      abbreviation: "VI",
      full_name: "Virgin Islands, U.S."
    },
    {
      abbreviation: "VN",
      full_name: "Viet Nam"
    },
    {
      abbreviation: "VU",
      full_name: "Vanuatu"
    },
    {
      abbreviation: "WF",
      full_name: "Wallis and Futuna"
    },
    {
      abbreviation: "WS",
      full_name: "Samoa"
    },
    {
      abbreviation: "YE",
      full_name: "Yemen"
    },
    {
      abbreviation: "YT",
      full_name: "Mayotte"
    },
    {
      abbreviation: "ZA",
      full_name: "South Africa"
    },
    {
      abbreviation: "ZM",
      full_name: "Zambia"
    },
    {
      abbreviation: "ZW",
      full_name: "Zimbabwe"
    }
  ];