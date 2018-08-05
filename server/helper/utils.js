const moment = require('moment'),
  request = require('request'),
  q= require('q'),
  config = global.config;
  _ = require('lodash');

/**
 * @class Utils
 * @description class to manage the common methods accross the application
 */
class Utils{

	/**
   * @method getTime
   * @description function to get time to add in db
   * @returns {number}
   */
  static getTime(){
      return Math.round(moment.utc().valueOf() / 1000, 0)
  }

	/**
   * @method parseBoolean
   * @description function to parse the boolean value
   * @param value
   * @returns {*}
   */
  static parseBoolean(value){
    if(value===true){
      return true;
    }
    if(value===false){
      return false;
    }
    if (value === "true") {
      return true;
    }
    if(value==="false"){
      return false;
    }
    return null;
  }

	/**
   * @method parseJSON
   * @param stringValue
   * @param defaultValue
   * @description function to parse the JSON and handle the error while parsing the JSON
   */
  static parseJSON(stringValue,defaultValue){
    let returnValue = defaultValue || {};
    try{
      returnValue = JSON.parse(stringValue);
    } catch(e){}
    return returnValue;
  }

  /**
   * @method stringifyJSON
   * @param stringValue
   * @param defaultValue
   * @description function to stringify the JSON and handle the error while parsing the JSON
   */
  static stringifyJSON(stringValue,defaultValue){
    let returnValue = defaultValue || '';
    try{
      returnValue = JSON.stringify(stringValue);
    } catch(e){}
    return returnValue;
  }

	/**
   * @method getRandomString
   * @description function to get the random string
   * @param length
   * @returns {string}
   */
  static getRandomString(length=10){
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

}

module.exports = Utils;
