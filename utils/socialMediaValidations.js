const validateGitHub = (url) => {
  const urlPattern = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/;
  return urlPattern.test(url);
};

const validateFacebook = (url) => {
  const urlPattern = /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9.-]+\/?$/;
  return urlPattern.test(url);
};

const validateInstagram = (url) => {
  const urlPattern =
    /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_.-]+\/?$/;
  return urlPattern.test(url);
};

const validateLinkedInProfile = (url) => {
  const pattern =
    /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]{5,30}\/?$/;
  return pattern.test(url);
};

const validateMediumProfile = (url) => {
  const pattern =
    /^(https?:\/\/)?(www\.)?medium\.com\/@([a-zA-Z0-9_]{1,50})\/?$/;
  return pattern.test(url);
};

module.exports = {
  validateGitHub,
  validateFacebook,
  validateInstagram,
  validateLinkedInProfile,
  validateMediumProfile,
};
