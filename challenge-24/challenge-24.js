(function(document){
  'use strict';
  /*
  Nossa calculadora agora está funcional! A ideia desse desafio é modularizar
  o código, conforme vimos na aula anterior. Quebrar as responsabilidades
  em funções, onde cada função faça somente uma única coisa, e faça bem feito.

  - Remova as duplicações de código;
  - agrupe os códigos que estão soltos em funções (declarações de variáveis,
  listeners de eventos, etc);
  - faça refactories para melhorar esse código, mas de forma que o mantenha com a
  mesma funcionalidade.
  */
  var $visor     = document.querySelector('[data-calculator-visor]'),
      $numbers   = document.querySelectorAll('[data-calculator-number]'),
      $operators = document.querySelectorAll('[data-calculator-operator]');

  function init() {
    _addListeners();
  }

  function _addListeners() {
    $numbers.forEach(function($number) {
      $number.addEventListener('click', handleClickNumber);
    });

    $operators.forEach(function($operator) {
      $operator.addEventListener('click', handleClickOperator);
    });
  }

  function handleClickNumber() {
    return (
      $visor.value !== '0'
      ? $visor.value += this.value
      : $visor.value = this.value
    );
  }

  function handleClickOperator() {
    var operator = this.value;

    if($visor.value === '0' || operator === 'ce')
      return $visor.value = '0';

    $visor.value = removeLastItemIfIsAnOperator($visor.value);

    if(operator === '=')
      return handleCalculate();
    return $visor.value += operator;
  }

  function handleCalculate() {
    var operation = $visor.value.match(/\d+[\÷\x\-\+]?/g);
    return $visor.value = operation.reduce(calculateOperation);
  }

  function calculateOperation(accumulated, currentValue) {
    var firstValue   = accumulated.slice(0,-1),
        operator     = accumulated.split('').pop(),
        secondValue  = removeLastItemIfIsAnOperator(currentValue),
        lastOperator = isLastItemAnOperator(currentValue) ? currentValue.split('').pop() : '';
    return doOperation(operator, firstValue, secondValue) + lastOperator;
  }

  function doOperation(operator, firstValue, secondValue) {
    switch (operator) {
      case '÷':
        return Number(firstValue) / Number(secondValue);
      case 'x':
        return Number(firstValue) * Number(secondValue);
      case '-':
        return Number(firstValue) - Number(secondValue);
      case '+':
        return Number(firstValue) + Number(secondValue);
    }
  }

  function isLastItemAnOperator(value) {
    return /[\÷\x\-\+]$/.test(value);
  }

  function removeLastItemIfIsAnOperator(value) {
    if(isLastItemAnOperator(value))
      value = value.slice(0, -1);
    return value;
  }

  init();
})(document);
