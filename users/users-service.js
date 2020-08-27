const Users = require('./users-model');

module.exports = {
  validDiner,
  validOperator,
  validLogin
};

function validLogin(credentials) {
  return Boolean(
    credentials.username &&
      credentials.password &&
      typeof credentials.password === 'string'
  );
}

function validDiner(diner) {
  return Boolean(diner.username && diner.password && diner.email);
}

function validOperator(operator) {
  return Boolean(operator.username && operator.password && operator.email);
}
