"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonpath = require('jsonpath');
var chai_1 = require("chai");
require("mocha");
var JsonPathCustom_1 = require("../src/utility/JsonPathCustom");
describe('JsonPath tests', function () {
    context('Simple query tst', function () {
        it('should return all city names in list', function () {
            var cities = [
                { name: "London", "population": 8615246 },
                { name: "Berlin", "population": 3517424 },
                { name: "Madrid", "population": 3165235 },
                { name: "Rome", "population": 2870528 }
            ];
            var names = jsonpath.query(cities, '$..name');
            chai_1.expect(names).to.eql(['London', 'Berlin', 'Madrid', 'Rome']);
        });
    });
    context('should change color value for bicycle from red to blue', function () {
        it('should add results to bicyle', function () {
            var json = JSON.parse("{\n        \"store\": {\n          \"book\": [ \n            {\n              \"category\": \"reference\",\n              \"author\": \"Nigel Rees\",\n              \"title\": \"Sayings of the Century\",\n              \"price\": 8.95\n            }, {\n              \"category\": \"fiction\",\n              \"author\": \"Evelyn Waugh\",\n              \"title\": \"Sword of Honour\",\n              \"price\": 12.99\n            }, {\n              \"category\": \"fiction\",\n              \"author\": \"Herman Melville\",\n              \"title\": \"Moby Dick\",\n              \"isbn\": \"0-553-21311-3\",\n              \"price\": 8.99\n            }, {\n               \"category\": \"fiction\",\n              \"author\": \"J. R. R. Tolkien\",\n              \"title\": \"The Lord of the Rings\",\n              \"isbn\": \"0-395-19395-8\",\n              \"price\": 22.99\n            }\n          ],\n          \"bicycle\": {\n            \"color\": \"red\",\n            \"price\": 19.95\n          }\n        }\n      }");
            jsonpath.value(json, '$.store.bicycle.color', "blue");
            chai_1.expect(jsonpath.query(json, '$.store.bicycle.color')).to.eql(["blue"]);
        });
    });
    context('Adding new value to Json', function () {
        it('should add results to bicyle', function () {
            var json = JSON.parse("{\n        \"store\": {\n          \"book\": [ \n            {\n              \"category\": \"reference\",\n              \"author\": \"Nigel Rees\",\n              \"title\": \"Sayings of the Century\",\n              \"price\": 8.95\n            }, {\n              \"category\": \"fiction\",\n              \"author\": \"Evelyn Waugh\",\n              \"title\": \"Sword of Honour\",\n              \"price\": 12.99\n            }, {\n              \"category\": \"fiction\",\n              \"author\": \"Herman Melville\",\n              \"title\": \"Moby Dick\",\n              \"isbn\": \"0-553-21311-3\",\n              \"price\": 8.99\n            }, {\n               \"category\": \"fiction\",\n              \"author\": \"J. R. R. Tolkien\",\n              \"title\": \"The Lord of the Rings\",\n              \"isbn\": \"0-395-19395-8\",\n              \"price\": 22.99\n            }\n          ],\n          \"bicycle\": {\n            \"color\": \"red\",\n            \"price\": 19.95\n          }\n        }\n      }");
            jsonpath.value(json, '$.store.bicycle.result', "MyResults");
            chai_1.expect(jsonpath.query(json, '$.store.bicycle.result')).to.eql(["MyResults"]);
        });
    });
    context('Adding new value to Json', function () {
        it('should add results to bicyle', function () {
            var json = JSON.parse("{}");
            jsonpath.value(json, '$.store', "MyResults");
            chai_1.expect(jsonpath.query(json, '$.store')).to.eql(["MyResults"]);
        });
    });
    context('query field that doesnt exist in json', function () {
        it('should add results to bicyle', function () {
            var json = JSON.parse("{\n        \"store\": {\n          \"book\": [ \n            {\n              \"category\": \"reference\",\n              \"author\": \"Nigel Rees\",\n              \"title\": \"Sayings of the Century\",\n              \"price\": 8.95\n            }, {\n              \"category\": \"fiction\",\n              \"author\": \"Evelyn Waugh\",\n              \"title\": \"Sword of Honour\",\n              \"price\": 12.99\n            }, {\n              \"category\": \"fiction\",\n              \"author\": \"Herman Melville\",\n              \"title\": \"Moby Dick\",\n              \"isbn\": \"0-553-21311-3\",\n              \"price\": 8.99\n            }, {\n              \"category\": \"fiction\",\n              \"author\": \"J. R. R. Tolkien\",\n              \"title\": \"The Lord of the Rings\",\n              \"isbn\": \"0-395-19395-8\",\n              \"price\": 22.99\n            }\n          ],\n          \"bicycle\": {\n            \"color\": \"red\",\n            \"price\": 19.95\n          }\n        },\n        \"abc\": \"\"\n      }");
            //let nodes = jsonpath.nodes(json, '$..author');
            //console.log(nodes);
            /*
            console.log(jsonpath.nodes(json, '$.xyz'));
            console.log(jsonpath.nodes(json, '$.xyz').length); //0
            console.log(jsonpath.nodes(json, '$.abc'));
            console.log(jsonpath.nodes(json, '$.abc').length); //1
            */
            chai_1.expect(jsonpath.query(json, '$.xyz')).to.eql([]);
        });
    });
    context('JsonPathCustom Test', function () {
        it('test containsNode on JsonPathCustom', function () {
            var json = JSON.parse("{\n        \"store\": {\n          \"book\": [ \n            {\n              \"category\": \"reference\",\n              \"author\": \"Nigel Rees\",\n              \"title\": \"Sayings of the Century\",\n              \"price\": 8.95\n            }, {\n              \"category\": \"fiction\",\n              \"author\": \"Evelyn Waugh\",\n              \"title\": \"Sword of Honour\",\n              \"price\": 12.99\n            }, {\n              \"category\": \"fiction\",\n              \"author\": \"Herman Melville\",\n              \"title\": \"Moby Dick\",\n              \"isbn\": \"0-553-21311-3\",\n              \"price\": 8.99\n            }, {\n              \"category\": \"fiction\",\n              \"author\": \"J. R. R. Tolkien\",\n              \"title\": \"The Lord of the Rings\",\n              \"isbn\": \"0-395-19395-8\",\n              \"price\": 22.99\n            }\n          ],\n          \"bicycle\": {\n            \"color\": \"red\",\n            \"price\": 19.95\n          }\n        },\n        \"abc\": \"\"\n      }");
            ;
            chai_1.expect(JsonPathCustom_1.JsonPathCustom.nodes(json, '$.xyz').length).to.eql(0); //0
            chai_1.expect(JsonPathCustom_1.JsonPathCustom.nodes(json, '$.abc').length).to.eql(1); //1
            chai_1.expect(JsonPathCustom_1.JsonPathCustom.containsNode(json, '$.abc')).to.eql(true); //1
            chai_1.expect(JsonPathCustom_1.JsonPathCustom.containsNode(json, '$.xyz')).to.eql(false); //1
            chai_1.expect(JsonPathCustom_1.JsonPathCustom.query(json, '$.xyz')).to.eql([]);
        });
    });
});
