"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapIterator = void 0;
var PassState_1 = require("./PassState");
var TaskState_1 = require("./TaskState");
var MapIterator = /** @class */ (function () {
    function MapIterator(states, startState) {
        if (states === void 0) { states = []; }
        if (startState === void 0) { startState = ""; }
        this.states = [];
        this.states = states;
        this.startState = startState;
    }
    MapIterator.prototype.getStates = function () {
        return this.states;
    };
    MapIterator.prototype.addState = function (state) {
        if (!this.stateNameIsUnique(state.getName())) {
            throw new Error("State names must be unique");
        }
        this.getStates().push(state);
        return this.validateNextStates();
    };
    MapIterator.prototype.setStates = function (states) {
        var _this = this;
        if (states.length > 0) {
            this.states = [];
            states.forEach(function (s) { return _this.addState(s); });
            return this.validateNextStates();
        }
        else {
            throw new Error("can not set states to empty");
        }
    };
    MapIterator.prototype.getStartStateName = function () {
        return this.startState;
    };
    MapIterator.prototype.setStartStateName = function (startState) {
        this.startState = startState;
    };
    MapIterator.prototype.isValid = function () {
        return this.validateNextStates() &&
            this.validateCatchNextStates() &&
            this.validateStartStateName() && //add this to StateMachine
            this.getStates().length > 0;
    };
    MapIterator.prototype.stateNameIsUnique = function (stateName) {
        if (this.getStates().some(function (element) {
            return element.getName() == stateName;
        })) {
            return false;
        }
        return true;
    };
    MapIterator.prototype.validateNextStates = function () {
        //check that each non-terminal state in the machine points to another state in the machine
        var states = this.getStates();
        var returnVal = true;
        var _loop_1 = function (idx) {
            if (
            //current state is not terminal
            !states[idx].isTerminal()
                &&
                    //the nextstate of the current state match a statename in the machine
                    !(this_1.getStates().some(function matchesNextState(element) {
                        if (states[idx] instanceof PassState_1.PassState)
                            return states[idx].getNextStateName() == element.getName();
                        if (states[idx] instanceof TaskState_1.TaskState)
                            return states[idx].getNextStateName() == element.getName();
                        return false;
                    }))) {
                returnVal = false;
            }
        };
        var this_1 = this;
        for (var idx in states) {
            _loop_1(idx);
        }
        return returnVal;
    };
    MapIterator.prototype.validateCatchNextStates = function () {
        //check that each task state w/ Catchers in the machine points to another state in the machine
        var states = this.getStates();
        var returnVal = true;
        var _loop_2 = function (idx) {
            if (states[idx] instanceof TaskState_1.TaskState) {
                var taskState_1 = states[idx];
                if (taskState_1.getCatchers().length > 0) {
                    if (!this_2.getStates().some(function matchesNextState(element) {
                        return taskState_1.getCatchers()[0].getNextStateName() == element.getName();
                    })) {
                        returnVal = false;
                    }
                }
            }
        };
        var this_2 = this;
        for (var idx in states) {
            _loop_2(idx);
        }
        return returnVal;
    };
    MapIterator.prototype.validateStartStateName = function () {
        var _this = this;
        return this.getStates().some(function (state) {
            return state.getName() == _this.getStartStateName();
        });
    };
    return MapIterator;
}());
exports.MapIterator = MapIterator;
