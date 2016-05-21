Stndrd
===============

Stndrd is an extendable JS lib that helps you standardize currency, clothing sizing, and country codes. In the even of a standarization fails, Stndrd will return the original input.

## Installation
```npm i```


```var stndrd = require('./dist/index');```

## Methods
#### stndrd.countries('countries', '[filter]')
The countries method returns an array of ISO country codes or names depending on an optional filter string you pass it. Defaults to returning the countries' ISO code.
```
stndrd.countries('united states, canada', 'code');
// returns ['US', 'CA']

stndrd.countries('jApAN', 'name');
// returns ['Japan']

stndrd.countries('india');
// returns ['IN']

stndrd.countries('notACountry');
// returns ['notACountry'] and will console.warn()

stndrd.countries({foo: bar});
// returns {foo: bar} and will console.warn()
```

#### stndrd.currency('price')
The currency method returns an object of the ISO currency code and an amount integer in pennies. Supported currency symbols include $, £, €, ¥, ₩. Defaults to USD if no currency symbol is provided in the price string.
```
stndrd.currency('$1,234');
// returns { currency_code: 'USD', amount: 112300 }

stndrd.currency('₩ 0.95');
// returns { currency_code: 'KRW', amount: 95 }

stndrd.currency('987,654');
// returns { currency_code: 'USD', amount: 98765400 }
```

#### stndrd.size(size)
The size method takes a string value and returns a noralized string.
Default sizes handled are 'extra small', 'x small', 'medium', 'large', 'extra large', 'xx large', 'xxx large', 'os', 'n/a', 'one size'.
method will pass input through if it's not a string.
```
stndrd.size(32);
// returns 32

stndrd.size('medium');
// returns 'M'

stndrd.size('n/a');
// returns 'OS'
```

#### stndrd.getDefaults()
this is a convenience method that returns the apps default settings. These can be changed manually in your app by modifying the stndrd.settings object as you need for your app.
```
stndrd.getDefaults();
// returns {
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
  }
};
```
