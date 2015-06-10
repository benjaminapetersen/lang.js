# lang.js

We spent a lot of time talking about the virtues of functional programming
at Republic Wireless.  [One of my team members](https://github.com/skibblenybbles/)
would write up a lang lib for each new project we began (initially sharing one
library, but it evolved over time).  For the sake of the learning experience,
I am working on my own version of a lang library.  This is not in any way optimized
and should not be assumed to be production ready.

## Production ready alternatives:

- [Lodash](https://lodash.com)
- [Underscore](http://underscorejs.org/)
- [Ramda](http://ramdajs.com/)
- and others

## Usage

Require in node:

`var lang = require('./path/to/lang.js');`

Include script in browser

`<script src="./path/to/lang.js"></script>`

## Tests

Run the tests with:

`cd /path/to/lang.js/`
`jasmine-node ./test/lang_test.spec.js --verbose`