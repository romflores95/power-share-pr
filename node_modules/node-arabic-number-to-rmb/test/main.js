var arabicToRMB = require('../index'),
    assert = require('assert');


describe('arbicNumberToRMB', function() {

    describe('simple', function() {

        it('zero', function() {
            assert.equal(arabicToRMB('0'), '零元整');
        });

        it('smallInteger', function() {
            assert.equal(arabicToRMB('1'), '壹元整');
        });

    });

    describe('withDecimal', function() {

        it('withDecimal.01', function() {
            assert.equal(arabicToRMB('1.01'), '壹元壹分');
        });

        it('withDecimal.11', function() {
            assert.equal(arabicToRMB('1.11'), '壹元壹角壹分');
        });

        it('withDecimal.10', function() {
            assert.equal(arabicToRMB('1.10'), '壹元壹角');
        });

    });


    describe('bigInteger', function() {

        it('pureBigInteger', function() {
            assert.equal(arabicToRMB('999999999'), '玖亿玖仟玖佰玖拾玖万玖仟玖佰玖拾玖元整');
        });

        it('bigIntegerWithDecimal', function() {
            assert.equal(arabicToRMB('999999999.10'), '玖亿玖仟玖佰玖拾玖万玖仟玖佰玖拾玖元壹角');
        });

    });

    describe('errorCon', function() {

        it('moreThanMax', function() {
            assert.equal(arabicToRMB('999999999999999999'), 'error');
        });

        it('noneInteger', function() {
            assert.equal(arabicToRMB('12abc13'), 'error');
        });
    });
});
