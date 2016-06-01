var _ = require('lodash');
var countries = require('country-data').countries;
var currencies = require('country-data').currencies;

exports.settings = {
  defaultCurrency: 'USD',
  currencyMap: {
    '$': 'USD',
    '£': 'GBP',
    '€': 'EUR',
    '¥': 'JPY',
    '₩': 'KRW'
  },
  sizeMap: {
    'extra small': 'XS',
    'x small': 'XS',
    'small': 'S',
    'medium': 'M',
    'large': 'L',
    'extra large': 'XL',
    'xx large': 'XXL',
    'xxx large': 'XXXL',
    'os': 'OS',
    'n/a': 'OS',
    'one size': 'OS'
  },
  logging: 'none' // to log, set this to debug
};

if (exports.settings.logging === "debug") {
  var log = console.log;
} else {
  var log = function () {};
}

// splits string into Array based on slashes and commas also trims whitespace.
var convertString = function(inputString) {
  return _.map(inputString.split(/[\/,]+/), function(n) {
    return n.trim();
  });
};

var getCountryCode = function(country, type) {
  var code = _.find(countries.all, function(o) {
    return o.name.toLowerCase() === country.toLowerCase();
  });
  if (!code) {
    log('No ISO code found for input', country);
    return country;
  }
  return code[type];
};

var getCurrencyCode = function(country) {
  var code = _.find(countries.all, function(o) {
    return o.name.toLowerCase() === country.toLowerCase();
  });
  if (!code) {
    log('No currency found for input', country);
    return;
  }
  return code.currencies[0];
  // return code;
};

exports.countries = function(inputString, type) {
  if (typeof inputString === 'string') {
    if (type === 'name') {
      var filter = 'name';
    } else if (type === 'currency') {
      var countriesArray = convertString(inputString);
      return _.map(countriesArray, function(country) {
        return getCurrencyCode(country)
      });
    } else {
      var filter = 'alpha2'
    }

    var countriesArray = convertString(inputString);
    return _.map(countriesArray, function(country) {
      return getCountryCode(country, filter)
    });
  } else {
    console.warn('countries method requires a string as the first arugment, arg passed in was of type', typeof inputString);
    return inputString;
  }
};

exports.currency = function(price) {
  if (exports.settings.currencyMap[price[0]]) {
    var currency_code = exports.settings.currencyMap[price[0]];
  } else {
    var currency_code = exports.settings.defaultCurrency;
  }
  return { currency_code: currency_code, amount: parseFloat(price.replace(/[^0-9-.]/g, '')) *100 };
};

exports.size = function(size) {
  var res;
  if (typeof size === 'string') {
    size = size.toLowerCase();
    if (exports.settings.sizeMap[size]) {
      res = exports.settings.sizeMap[size];
    } else {
      log('No size mapping for input', size);
      res = size;
    }
  } else {
    res = size
  }
  log(res)
  return res;
};

exports.getDefaults = function() {
  if (_.size(arguments) === 0) {
    return exports.settings;
  }
};