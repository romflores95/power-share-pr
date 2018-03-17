/**
 * Created by patrickliu on 15/7/1.
 * @refer to http://link.fobshanghai.com/rmb.htm
 */

// convert arabic number to chinese number
var chDecimals = ['角', '分'];
var chRadices = ['', '拾', '佰', '仟'];
var rmbUnit = '元';
var chInteger = '整';
// only support 9999万亿9999亿9999万9999
var chBigRadices = ['', '万', '亿', '万亿'];
var chNumberArr = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];

function convertCurrency(currencyDigits) {

    if(!isNumeric(currencyDigits)) {
        return 'error';
    }

    // make sure currencyDigits is a string
    currencyDigits = currencyDigits + '';

    // Trim zeros at the beginning.
    currencyDigits = currencyDigits.replace(/^0+/, '');

    // Process the coversion from currency digits to characters:
    // Separate integral and decimal parts before processing coversion:
    var parts = currencyDigits.split(".");

    // including integral and decimal
    if(parts.length > 1) {

        integral = parts[0];
        decimal = parts[1];

        // ingore redundant decimal digits that are after the second.
        // 1.101101 -> 1.10
        decimal = decimal.substr(0, 2);

    } else {

        integral = parts[0];
        decimal = "";
    }

    return toChinese(integral, decimal);
}


function toChinese(integral, decimal) {

    // only support 9999万亿
    if(integral.length > 16) {
        return 'error';
    }

    var integralChinese = toIntegralChinese(integral),
        decimalChinese = toDecimalChinese(decimal);

    // return 零元
    if(integralChinese + decimalChinese === '') {
        return chNumberArr[0] + rmbUnit + chInteger;
    }

    // 0.11 return 壹角壹分
    if(integralChinese === '') {

        return decimalChinese;
    }

    if(decimalChinese === '') {

        return integralChinese + rmbUnit + chInteger;
    }

    return integralChinese + rmbUnit + decimalChinese;
}

function toIntegralChinese(integral) {

    var outputCharacters = '';

    if(+integral > 0) {

        var zeroCount = 0,
            quotient = 0,
            modulus = 0;

        for(var i = 0, len = integral.length; i < len; i++) {
            var p = len - i - 1;
            var d = integral.substr(i, 1);

            quotient = p / 4;
            modulus = p % 4;

            if(d == "0") {
                zeroCount++;
            } else {
                if(zeroCount > 0) {
                    // if multiple zeroes are met, add '零' to it
                    outputCharacters += chNumberArr[0];
                }
                zeroCount = 0;
                outputCharacters += chNumberArr[+d] + chRadices[modulus];
            }

            if (modulus == 0 && zeroCount < 4) {
                outputCharacters += chBigRadices[quotient];
                zeroCount = 0;
            }
        }
    }

    return outputCharacters;
}

function toDecimalChinese(decimal) {

    var outputCharacters = '';

    // Process decimal part if there is:
    if(decimal != "") {
        for(var i = 0; i < decimal.length; i++) {
            var d = decimal.substr(i, 1);
            if(d != "0") {
                outputCharacters += chNumberArr[Number(d)] + chDecimals[i];
            }
        }
    }

    return outputCharacters;
}


function isNumeric(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
}

exports = module.exports = convertCurrency;
