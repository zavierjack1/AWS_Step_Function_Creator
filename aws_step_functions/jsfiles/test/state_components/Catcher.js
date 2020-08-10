"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var Catcher_1 = require("../../src/state_components/Catcher");
describe('Catcher class tests', function () {
    context('nextStateName Tests', function () {
        it('should return the nextStateName', function () {
            chai_1.expect(new Catcher_1.Catcher("myNextState").getNextStateName()).equal("myNextState");
        });
        it('should return new nextStateName', function () {
            var catcher = new Catcher_1.Catcher("myNextState");
            catcher.setNextStateName("newNextState");
            chai_1.expect(catcher.getNextStateName()).to.equal("newNextState");
        });
    });
    context('errorEquals Tests', function () {
        it('should return the default ErrorEquals', function () {
            chai_1.expect(new Catcher_1.Catcher("myNextState").getErrorEquals()).eql(["States.ALL"]);
        });
        it('should return the default ErrorEquals 0 position', function () {
            chai_1.expect(new Catcher_1.Catcher("myNextState").getErrorEquals()[0]).equal("States.ALL");
        });
    });
});
