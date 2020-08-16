"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapState_1 = require("../../src/state_components/MapState");
var chai_1 = require("chai");
require("mocha");
var Catcher_1 = require("../../src/state_components/Catcher");
var MapIterator_1 = require("../../src/state_components/MapIterator");
var SucceedState_1 = require("../../src/state_components/SucceedState");
var TaskState_1 = require("../../src/state_components/TaskState");
var JsonPath = require('jsonpath');
describe('MapState class tests', function () {
    var defaultMapIterator = new MapIterator_1.MapIterator([new SucceedState_1.SucceedState("myState")], "");
    context('Name Tests', function () {
        it('should return name of State', function () {
            chai_1.expect(new MapState_1.MapState("myName", defaultMapIterator).getName()).to.equal("myName");
        });
        it('should return the newName of State', function () {
            var state = new MapState_1.MapState("myName", defaultMapIterator);
            state.setName("newName");
            chai_1.expect(state.getName()).to.equal("newName");
        });
        it('fail due too name being > 128', function () {
            var name = "";
            for (var i = 0; i < 129; i++) {
                name = name + "a";
            }
            chai_1.expect(function () { var state = new MapState_1.MapState(name, defaultMapIterator); }).to.throw(Error, "name must be <= 128 char");
        });
    });
    context('Type Tests', function () {
        it('should return state type', function () {
            chai_1.expect(new MapState_1.MapState("myName", defaultMapIterator).getType()).to.equal("Map");
        });
    });
    context('Resource Tests', function () {
        it('should return resource', function () {
            chai_1.expect(new MapState_1.MapState("myName", defaultMapIterator).getType()).to.equal("Map");
        });
    });
    context('Comment Tests', function () {
        it('should return state comment', function () {
            chai_1.expect(new MapState_1.MapState("myName", defaultMapIterator, "myComment").getComment()).to.equal("myComment");
        });
        it('should return new state comment', function () {
            var state = new MapState_1.MapState("myName", defaultMapIterator, "myComment");
            state.setComment("newComment");
            chai_1.expect(state.getComment()).to.equal("newComment");
        });
    });
    context('nextStateName Tests', function () {
        it('should return the nextStateName', function () {
            chai_1.expect(new MapState_1.MapState("myName", defaultMapIterator, "myComment", "myNextState").getNextStateName()).equal("myNextState");
        });
        it('should return new nextStateName', function () {
            var state = new MapState_1.MapState("myName", defaultMapIterator, "myComment", "myNextState");
            state.setNextStateName("newNextState");
            chai_1.expect(state.getNextStateName()).to.equal("newNextState");
        });
    });
    context('EndStates Tests', function () {
        it('should return end state = false', function () {
            chai_1.expect(new MapState_1.MapState("myName", defaultMapIterator, "myComment").isEndState()).to.equal(false);
        });
        it('should set end state to true with constructor', function () {
            chai_1.expect(new MapState_1.MapState("myName", defaultMapIterator, "comment", "", true).isEndState()).to.equal(true);
        });
        it('should set end state true with setState()', function () {
            var state = new MapState_1.MapState("myName", defaultMapIterator, "comment");
            state.setEndState(true);
            chai_1.expect(state.isEndState()).to.equal(true);
        });
    });
    context('End Tests', function () {
        it('should return end state = false', function () {
            chai_1.expect(new MapState_1.MapState("myName", defaultMapIterator, "myComment").isEndState()).to.equal(false);
        });
    });
    context('InputPath Tests', function () {
        it('should set and get inputPath', function () {
            var state = new MapState_1.MapState("myName", defaultMapIterator, "myComment");
            state.setInputPath("$.store.book[*].author");
            chai_1.expect(state.getInputPath()).to.equal("$.store.book[*].author");
        });
    });
    context('OutputPath Tests', function () {
        it('should set and get outputPath', function () {
            var state = new MapState_1.MapState("myName", defaultMapIterator, "myComment");
            state.setOutputPath("$.store.book[*].author");
            chai_1.expect(state.getOutputPath()).to.equal("$.store.book[*].author");
        });
    });
    context("Execute Test", function () {
        var mapStateInputJson = "{\n        \"ship-date\": \"2016-03-14T01:59:00Z\",\n        \"detail\": {\n          \"delivery-partner\": \"UQS\",\n          \"shipped\": [\n            { \"prod\": \"R31\", \"dest-code\": 9511, \"quantity\": 1344, \"result\": \"\" },\n            { \"prod\": \"S39\", \"dest-code\": 9511, \"quantity\": 40, \"result\": \"\" },\n            { \"prod\": \"R31\", \"dest-code\": 9833, \"quantity\": 12, \"result\": \"\" },\n            { \"prod\": \"R40\", \"dest-code\": 9860, \"quantity\": 887, \"result\": \"\" },\n            { \"prod\": \"R40\", \"dest-code\": 9511, \"quantity\": 1220, \"result\": \"\" }\n          ]\n        },\n        \"result\": \"\"\n      }";
        it('should output the input array in detail.shipped', function () {
            var json = mapStateInputJson;
            var resource = function (x) {
                return x;
            };
            var mapIterator = new MapIterator_1.MapIterator([new TaskState_1.TaskState("myTaskState", resource, "", "", true, "$.prod", "$.result")], "myTaskState");
            var mapState = new MapState_1.MapState("myName", mapIterator, "myComment");
            mapState.setInputPath("$.detail.shipped");
            chai_1.expect(JsonPath.query(mapState.execute(json), '$.detail.shipped')).to.eql([
                [
                    { prod: 'R31', 'dest-code': 9511, quantity: 1344, result: ["R31"] },
                    { prod: 'S39', 'dest-code': 9511, quantity: 40, result: ["S39"] },
                    { prod: 'R31', 'dest-code': 9833, quantity: 12, result: ["R31"] },
                    { prod: 'R40', 'dest-code': 9860, quantity: 887, result: ["R40"] },
                    { prod: 'R40', 'dest-code': 9511, quantity: 1220, result: ["R40"] }
                ]
            ]);
        });
        it('should print inputJson expense field to 2x', function () {
            var json = mapStateInputJson;
            var resource = function (x) {
                return Number(x) * 2;
            };
            var mapIterator = new MapIterator_1.MapIterator([new TaskState_1.TaskState("myTaskState", resource, "", "", true, "$.quantity", "$.result")], "myTaskState");
            var mapState = new MapState_1.MapState("myName", mapIterator, "myComment");
            mapState.setResource(resource);
            mapState.setInputPath("$.detail.shipped");
            chai_1.expect(JsonPath.query(mapState.execute(json), '$.detail.shipped')).to.eql([
                [
                    { prod: 'R31', 'dest-code': 9511, quantity: 1344, result: 2688 },
                    { prod: 'S39', 'dest-code': 9511, quantity: 40, result: 80 },
                    { prod: 'R31', 'dest-code': 9833, quantity: 12, result: 24 },
                    { prod: 'R40', 'dest-code': 9860, quantity: 887, result: 1774 },
                    { prod: 'R40', 'dest-code': 9511, quantity: 1220, result: 2440 }
                ]
            ]);
        });
    });
    context('toString test', function () {
        it('should return json of task state', function () {
            var mapState = new MapState_1.MapState("myName", defaultMapIterator, "myComment");
            chai_1.expect(mapState.toString()).to.equal('"myName":{"Type":"Map","Comment":"myComment", "Iterator": {"StartAt":"", "myState":{"Type":"Succeed","End":true}}}');
        });
    });
    context('Catcher test', function () {
        it('should add Catcher to MapState', function () {
            var mapState = new MapState_1.MapState("myName", defaultMapIterator, "myComment");
            mapState.addCatcher(new Catcher_1.Catcher("nextStateName"));
            chai_1.expect(mapState.getCatchers()[0].getNextStateName()).to.equal("nextStateName");
            chai_1.expect(mapState.getCatchers()[0].getErrorEquals()).to.eql(['States.ALL']);
        });
    });
});
