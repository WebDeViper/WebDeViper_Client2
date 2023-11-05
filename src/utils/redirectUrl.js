export const redirectUrl = provider => {
  const url = window.location.origin;
  return `${url}/oauth/${provider}`;
};
