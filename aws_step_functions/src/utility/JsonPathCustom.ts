var JsonPath = require('jsonpath');

export class JsonPathCustom extends JsonPath{
  public static containsNode(obj: any, pathExpression: string, count?: number){
    if (JsonPath.nodes(obj, pathExpression, count).length > 0) return true;
    return false;
  }
}