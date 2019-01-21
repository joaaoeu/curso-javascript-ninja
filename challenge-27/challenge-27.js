(function(document){
  'use strict';
  /*
  Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
  métodos semelhantes aos que existem no array, mas que sirvam para os
  elementos do DOM selecionados.
  Crie os seguintes métodos:
  - forEach, map, filter, reduce, reduceRight, every e some.

  Crie também métodos que verificam o tipo do objeto passado por parâmetro.
  Esses métodos não precisam depender de criar um novo elmento do DOM, podem
  ser métodos estáticos.

  Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
  no objeto, como nos exemplos abaixo:
  DOM.isArray([1, 2, 3]); // true
  DOM.isFunction(function() {}); // true
  DOM.isNumber('numero'); // false

  Crie os seguintes métodos para verificação de tipo:
  - isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
  O método isNull deve retornar `true` se o valor for null ou undefined.
  */
  function DOM(node) {
    this.elements = document.querySelectorAll(node);
  }

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

  DOM.prototype.get = function get() {
    return this.elements;
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

  DOM.prototype.isArray = function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  };

  DOM.prototype.isObject = function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
  };

  DOM.prototype.isFunction = function isFunction(value) {
    return Object.prototype.toString.call(value) === '[object Function]';
  };

  DOM.prototype.isNumber = function isNumber(value) {
    return Object.prototype.toString.call(value) === '[object Number]';
  };

  DOM.prototype.isString = function isString(value) {
    return Object.prototype.toString.call(value) === '[object String]';
  };

  DOM.prototype.isBoolean = function isBoolean(value) {
    return Object.prototype.toString.call(value) === '[object Boolean]';
  };

  DOM.prototype.isNull = function isNull(value) {
    var object = Object.prototype.toString.call(value);
    return object === '[object Null]' || object === '[object Undefined]';
  };

  var $a = new DOM('[data-js="link"]');
  console.log($a)

  $a.forEach(function(item) {
    console.log(item)
  });

  var dom = new DOM();
  console.log(dom.isArray([]));
  console.log(DOM.prototype.isArray([]));
  console.log(DOM.prototype.isObject([]));
  console.log(DOM.prototype.isObject({}));
  console.log(DOM.prototype.isString('true'));
  console.log(DOM.prototype.isBoolean(true));
  console.log(DOM.prototype.isNull(null));
  console.log(DOM.prototype.isNull(undefined));
  console.log(DOM.prototype.isNull());
})(document);
