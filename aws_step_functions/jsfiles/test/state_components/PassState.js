"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PassState_1 = require("../../src/state_components/PassState");
var chai_1 = require("chai");
require("mocha");
var JsonPath = require('jsonpath');
describe('PassState class tests', function () {
    context('Name Tests', function () {
        it('should return name of State', function () {
            chai_1.expect(new PassState_1.PassState("myName").getName()).to.equal("myName");
        });
        it('should return the newName of State', function () {
            var state = new PassState_1.PassState("myName");
            state.setName("newName");
            chai_1.expect(state.getName()).to.equal("newName");
        });
        it('fail due too name being > 128', function () {
            var name = "";
            for (var i = 0; i < 129; i++) {
                name = name + "a";
            }
            chai_1.expect(function () { var state = new PassState_1.PassState(name); }).to.throw(Error, "name must be <= 128 char");
        });
    });
    context('Type Tests', function () {
        it('should return state type', function () {
            chai_1.expect(new PassState_1.PassState("myName").getType()).to.equal("Pass");
        });
    });
    context('Comment Tests', function () {
        it('should return state comment', function () {
            chai_1.expect(new PassState_1.PassState("myName", "result", "myComment").getComment()).to.equal("myComment");
        });
        it('should return new state comment', function () {
            var state = new PassState_1.PassState("myName", "result", "myComment");
            state.setComment("newComment");
            chai_1.expect(state.getComment(), "newComment");
        });
    });
    context('NextState Tests', function () {
        it('should return the next state', function () {
            chai_1.expect(new PassState_1.PassState("myName", "result", "myComment", "myNextState").getNextStateName()).to.equal("myNextState");
        });
        it('should return new next state', function () {
            var state = new PassState_1.PassState("myName", "result", "myComment", "myNextState");
            state.setNextStateName("newNextState");
            chai_1.expect(state.getNextStateName(), "newNextState");
        });
    });
    context('End Tests', function () {
        it('should return end state = false', function () {
            chai_1.expect(new PassState_1.PassState("myName", "result", "myComment").isEndState()).to.equal(false);
        });
        it('should set end state to true with constructor', function () {
            chai_1.expect(new PassState_1.PassState("myName", "result", "comment", "", true).isEndState()).to.equal(true);
        });
        it('should set end state true with setState()', function () {
            var state = new PassState_1.PassState("myName", "result", "comment");
            state.setEndState(true);
            chai_1.expect(state.isEndState()).equal(true);
        });
    });
    context('Result Tests', function () {
        it('should return result', function () {
            chai_1.expect(new PassState_1.PassState("myName", "result", "myComment").getResult()).to.equal("result");
        });
        it('should set new result', function () {
            var state = new PassState_1.PassState("myName", "result", "comment");
            state.setResult("result2");
            chai_1.expect(state.getResult()).equal("result2");
        });
    });
    context('Result and Execution Tests', function () {
        it('should fail with outputPath Error', function () {
            var state = new PassState_1.PassState("myName", "result", "myComment", "", false, "", "$.result");
            chai_1.expect(function () { var result = state.execute("{}"); }).to.throw(Error, "outputPath not found in input json");
        });
        it('should return result', function () {
            var state = new PassState_1.PassState("myName", "result", "myComment", "", false, "", "$.result");
            var result = state.execute('{"result":""}');
            chai_1.expect(result['result']).to.equal("result");
        });
    });
    context('toString test', function () {
        it('should return json version of state', function () {
            chai_1.expect(new PassState_1.PassState("myName", "myResult", "myComment").toString()).to.equal('"myName":{"Type":"Pass","Result":"myResult","Comment":"myComment"}');
        });
        it('should return json version of state', function () {
            chai_1.expect(new PassState_1.PassState("myName", "myResult").toString()).to.equal('"myName":{"Type":"Pass","Result":"myResult"}');
        });
    });
    context('InputPath Test', function () {
        it('should set and get inputPath', function () {
            var state = new PassState_1.PassState("myName", "myResult", "myComment");
            state.setInputPath("$.store.book[*].author");
            chai_1.expect(state.getInputPath()).to.equal("$.store.book[*].author");
        });
    });
    context('OutputPath Tests', function () {
        it('should set and get outputPath', function () {
            var state = new PassState_1.PassState("myName", "myResult", "myComment");
            state.setOutputPath("$.store.book[*].author");
            chai_1.expect(state.getOutputPath()).to.equal("$.store.book[*].author");
        });
        it('should output a json with store.result = "myResult""', function () {
            var state = new PassState_1.PassState("myName", "myResult", "myComment");
            var json = "{\n          \"store\": {\n              \"book\": [\n                  {\n                      \"category\": \"reference\",\n                      \"author\": \"Nigel Rees\",\n                      \"title\": \"Sayings of the Century\",\n                      \"price\": 8.95\n                  },\n                  {\n                      \"category\": \"fiction\",\n                      \"author\": \"Evelyn Waugh\",\n                      \"title\": \"Sword of Honour\",\n                      \"price\": 12.99\n                  },\n                  {\n                      \"category\": \"fiction\",\n                      \"author\": \"Herman Melville\",\n                      \"title\": \"Moby Dick\",\n                      \"isbn\": \"0-553-21311-3\",\n                      \"price\": 8.99\n                  },\n                  {\n                      \"category\": \"fiction\",\n                      \"author\": \"J. R. R. Tolkien\",\n                      \"title\": \"The Lord of the Rings\",\n                      \"isbn\": \"0-395-19395-8\",\n                      \"price\": 22.99\n                  }\n              ],\n              \"bicycle\": {\n                  \"color\": \"red\",\n                  \"price\": 19.95\n              },\n              \"result\":\"\"\n          },\n          \"expensive\": 10\n        }";
            state.setInputPath("$.store.book[*].author");
            state.setOutputPath("$.store.result");
            chai_1.expect(JsonPath.query(state.execute(json), '$.store.result')).to.eql(['myResult']);
        });
    });
    it('should set inputJson expense field to array of numbers', function () {
        var state = new PassState_1.PassState("myName", [100, 200], "myComment");
        var json = "{\n        \"store\": {\n            \"book\": [\n                {\n                    \"category\": \"reference\",\n                    \"author\": \"Nigel Rees\",\n                    \"title\": \"Sayings of the Century\",\n                    \"price\": 8.95\n                },\n                {\n                    \"category\": \"fiction\",\n                    \"author\": \"Evelyn Waugh\",\n                    \"title\": \"Sword of Honour\",\n                    \"price\": 12.99\n                },\n                {\n                    \"category\": \"fiction\",\n                    \"author\": \"Herman Melville\",\n                    \"title\": \"Moby Dick\",\n                    \"isbn\": \"0-553-21311-3\",\n                    \"price\": 8.99\n                },\n                {\n                    \"category\": \"fiction\",\n                    \"author\": \"J. R. R. Tolkien\",\n                    \"title\": \"The Lord of the Rings\",\n                    \"isbn\": \"0-395-19395-8\",\n                    \"price\": 22.99\n                }\n            ],\n            \"bicycle\": {\n                \"color\": \"red\",\n                \"price\": 19.95\n            }\n        },\n        \"expensive\": 10\n      }";
        state.setInputPath("$.expensive");
        state.setOutputPath("$.expensive");
        chai_1.expect(JsonPath.query(state.execute(json), state.getOutputPath())).to.eql([[100, 200]]);
    });
    it('should set inputJson expense field to 100', function () {
        var state = new PassState_1.PassState("myName", 100, "myComment");
        var json = "{\n        \"store\": {\n            \"book\": [\n                {\n                    \"category\": \"reference\",\n                    \"author\": \"Nigel Rees\",\n                    \"title\": \"Sayings of the Century\",\n                    \"price\": 8.95\n                },\n                {\n                    \"category\": \"fiction\",\n                    \"author\": \"Evelyn Waugh\",\n                    \"title\": \"Sword of Honour\",\n                    \"price\": 12.99\n                },\n                {\n                    \"category\": \"fiction\",\n                    \"author\": \"Herman Melville\",\n                    \"title\": \"Moby Dick\",\n                    \"isbn\": \"0-553-21311-3\",\n                    \"price\": 8.99\n                },\n                {\n                    \"category\": \"fiction\",\n                    \"author\": \"J. R. R. Tolkien\",\n                    \"title\": \"The Lord of the Rings\",\n                    \"isbn\": \"0-395-19395-8\",\n                    \"price\": 22.99\n                }\n            ],\n            \"bicycle\": {\n                \"color\": \"red\",\n                \"price\": 19.95\n            }\n        },\n        \"expensive\": 10\n      }";
        state.setInputPath("$.expensive");
        state.setOutputPath("$.expensive");
        chai_1.expect(JsonPath.query(state.execute(json), state.getOutputPath())).to.eql([100]);
    });
});
