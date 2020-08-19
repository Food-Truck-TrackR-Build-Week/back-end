module.exports = {
  isValid
};

function isValid(credentials) {
  return Boolean(
    credentials.username &&
      credentials.password &&
      typeof credentials.password === 'string'
  );
}
