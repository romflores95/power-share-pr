/**
 * Created by patrickliu on 15/7/2.
 */

var extend = require('extend');

var defaults = {
    // by default the sep is ','
    sep: ','
};

var convert = function(options) {

    options = extend(defaults, options);

    return function(number) {
        // to string
        number = number + '';

        var parts = number.split('.'),
            integral, decimal = '',
            integerArr = [];

        integral = number;
        if(parts.length > 1) {
            integral = parts[0];
            decimal = parts[1];
        }

        for(var len = integral.length, i = len - 1, num = 0; i >= 0; i--) {

            integerArr.push(integral[i]);

            if(++num % 3 === 0 && i !== 0) {
                integerArr.push(options.sep);
            }
        }

        integral = integerArr.reverse().join('');

        return decimal === '' ? integral : (integral + '.' + decimal);
    }
};


exports = module.exports = convert;

