/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import chai = require('chai')
import FirstRule = require('../src/NoUnusedImportsRule');

describe('FirstRuleTests', () : void => {

    it('should run a test', () : void => {
        chai.expect(1).to.equal(1);
        console.log(FirstRule);
    });

});