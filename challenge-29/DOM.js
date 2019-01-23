(function(window, document){
  'use strict';

  function DOM(node) {
    if(!(this instanceof DOM))
      return new DOM(node);

    this.elements = document.querySelectorAll(node);
  }

  DOM.isArray = function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  };

  DOM.isObject = function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
  };

  DOM.isFunction = function isFunction(value) {
    return Object.prototype.toString.call(value) === '[object Function]';
  };

  DOM.isNumber = function isNumber(value) {
    return Object.prototype.toString.call(value) === '[object Number]';
  };

  DOM.isString = function isString(value) {
    return Object.prototype.toString.call(value) === '[object String]';
  };

  DOM.isBoolean = function isBoolean(value) {
    return Object.prototype.toString.call(value) === '[object Boolean]';
  };

  DOM.isNull = function isNull(value) {
    var object = Object.prototype.toString.call(value);
    return object === '[object Null]' || object === '[object Undefined]';
  };

  DOM.prototype.on = function on(event, callback) {
    Array.prototype.forEach.call(this.elements, function(element) {
      element.addEventListener(event, callback);
    });
  };

  DOM.prototype.off = function off(event, callback) {
    Array.prototype.forEach.call(this.elements, function(element) {
      element.removeEventListener(event, callback);
    });
  };

  DOM.prototype.get = function get(index) {
    if(!index) return this.elements[0];
    return this.elements[index];
  };

  DOM.prototype.forEach = function forEach() {
    return Array.prototype.forEach.apply(this.elements, arguments);
  };

  DOM.prototype.map = function map() {
    return Array.prototype.map.apply(this.elements, arguments);
  };

  DOM.prototype.filter = function filter() {
    return Array.prototype.filter.apply(this.elements, arguments);
  };

  DOM.prototype.reduce = function reduce() {
    return Array.prototype.reduce.apply(this.elements, arguments);
  };

  DOM.prototype.reduceRight = function reduceRight() {
    return Array.prototype.reduceRight.apply(this.elements, arguments);
  };

  DOM.prototype.every = function every() {
    return Array.prototype.every.apply(this.elements, arguments);
  };

  DOM.prototype.some = function some() {
    return Array.prototype.some.apply(this.elements, arguments);
  };

  window.DOM = DOM;
})(window, document);
