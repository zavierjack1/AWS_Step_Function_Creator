var jsonpath = require('jsonpath');
import { expect } from 'chai';
import 'mocha';
import { JsonPathCustom } from '../src/utility/JsonPathCustom';

describe('JsonPath tests', function () {
  context('Simple query tst', function () {
    it('should return all city names in list', function () {
      var cities = [
        { name: "London", "population": 8615246 },
        { name: "Berlin", "population": 3517424 },
        { name: "Madrid", "population": 3165235 },
        { name: "Rome",   "population": 2870528 }
      ];
      var names = jsonpath.query(cities, '$..name');
      expect(names).to.eql(['London', 'Berlin', 'Madrid', 'Rome']);
    });
  })

  context('should change color value for bicycle from red to blue', function () {
    it('should add results to bicyle', function () {
      let json = JSON.parse(`{
        "store": {
          "book": [ 
            {
              "category": "reference",
              "author": "Nigel Rees",
              "title": "Sayings of the Century",
              "price": 8.95
            }, {
              "category": "fiction",
              "author": "Evelyn Waugh",
              "title": "Sword of Honour",
              "price": 12.99
            }, {
              "category": "fiction",
              "author": "Herman Melville",
              "title": "Moby Dick",
              "isbn": "0-553-21311-3",
              "price": 8.99
            }, {
               "category": "fiction",
              "author": "J. R. R. Tolkien",
              "title": "The Lord of the Rings",
              "isbn": "0-395-19395-8",
              "price": 22.99
            }
          ],
          "bicycle": {
            "color": "red",
            "price": 19.95
          }
        }
      }`);
      jsonpath.value(json, '$.store.bicycle.color', "blue");
      expect(jsonpath.query(json, '$.store.bicycle.color')).to.eql(["blue"]);
    });
  })

  context('Adding new value to Json', function () {
    it('should add results to bicyle', function () {
      let json = JSON.parse(`{
        "store": {
          "book": [ 
            {
              "category": "reference",
              "author": "Nigel Rees",
              "title": "Sayings of the Century",
              "price": 8.95
            }, {
              "category": "fiction",
              "author": "Evelyn Waugh",
              "title": "Sword of Honour",
              "price": 12.99
            }, {
              "category": "fiction",
              "author": "Herman Melville",
              "title": "Moby Dick",
              "isbn": "0-553-21311-3",
              "price": 8.99
            }, {
               "category": "fiction",
              "author": "J. R. R. Tolkien",
              "title": "The Lord of the Rings",
              "isbn": "0-395-19395-8",
              "price": 22.99
            }
          ],
          "bicycle": {
            "color": "red",
            "price": 19.95
          }
        }
      }`);
      jsonpath.value(json, '$.store.bicycle.result', "MyResults");
      expect(jsonpath.query(json, '$.store.bicycle.result')).to.eql(["MyResults"]);
    });
  })

  context('Adding new value to Json', function () {
    it('should add results to bicyle', function () {
      let json = JSON.parse(`{}`);
      jsonpath.value(json, '$.store', "MyResults");
      expect(jsonpath.query(json, '$.store')).to.eql(["MyResults"]);
    });
  })

  context('query field that doesnt exist in json', function () {
    it('should add results to bicyle', function () {
      let json = JSON.parse(
      `{
        "store": {
          "book": [ 
            {
              "category": "reference",
              "author": "Nigel Rees",
              "title": "Sayings of the Century",
              "price": 8.95
            }, {
              "category": "fiction",
              "author": "Evelyn Waugh",
              "title": "Sword of Honour",
              "price": 12.99
            }, {
              "category": "fiction",
              "author": "Herman Melville",
              "title": "Moby Dick",
              "isbn": "0-553-21311-3",
              "price": 8.99
            }, {
              "category": "fiction",
              "author": "J. R. R. Tolkien",
              "title": "The Lord of the Rings",
              "isbn": "0-395-19395-8",
              "price": 22.99
            }
          ],
          "bicycle": {
            "color": "red",
            "price": 19.95
          }
        },
        "abc": ""
      }`);
      //let nodes = jsonpath.nodes(json, '$..author');
      //console.log(nodes);
      /*
      console.log(jsonpath.nodes(json, '$.xyz'));
      console.log(jsonpath.nodes(json, '$.xyz').length); //0
      console.log(jsonpath.nodes(json, '$.abc'));
      console.log(jsonpath.nodes(json, '$.abc').length); //1
      */
      expect(jsonpath.query(json, '$.xyz')).to.eql([]);
    });
  })

  context('JsonPathCustom Test', function () {
    it('test containsNode on JsonPathCustom', function () {
      let json = JSON.parse(
      `{
        "store": {
          "book": [ 
            {
              "category": "reference",
              "author": "Nigel Rees",
              "title": "Sayings of the Century",
              "price": 8.95
            }, {
              "category": "fiction",
              "author": "Evelyn Waugh",
              "title": "Sword of Honour",
              "price": 12.99
            }, {
              "category": "fiction",
              "author": "Herman Melville",
              "title": "Moby Dick",
              "isbn": "0-553-21311-3",
              "price": 8.99
            }, {
              "category": "fiction",
              "author": "J. R. R. Tolkien",
              "title": "The Lord of the Rings",
              "isbn": "0-395-19395-8",
              "price": 22.99
            }
          ],
          "bicycle": {
            "color": "red",
            "price": 19.95
          }
        },
        "abc": ""
      }`);;
      expect(JsonPathCustom.nodes(json, '$.xyz').length).to.eql(0); //0
      expect(JsonPathCustom.nodes(json, '$.abc').length).to.eql(1); //1
      expect(JsonPathCustom.containsNode(json, '$.abc')).to.eql(true); //1
      expect(JsonPathCustom.containsNode(json, '$.xyz')).to.eql(false); //1
      expect(JsonPathCustom.query(json, '$.xyz')).to.eql([]);
    });
  })
})