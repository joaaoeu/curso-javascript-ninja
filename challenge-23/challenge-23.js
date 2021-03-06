(function(document){
  'use strict';
  /*
  Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
  As regras são:

  - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
  diretamente;
  - O input deve iniciar com valor zero;
  - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
  - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
  multiplicação(x) e divisão(÷);
  - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
  que irá limpar o input, deixando-o com valor 0;

  - A cada número pressionado, o input deve atualizar concatenando cada valor
  digitado, como em uma calculadora real;
  - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
  operação no input. Se o último caractere no input já for um símbolo de alguma
  operação, esse caractere deve ser substituído pelo último pressionado.
  Exemplo:
  - Se o input tem os valores: "1+2+", e for pressionado o botão de
  multiplicação (x), então no input deve aparecer "1+2x".
  - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
  input;
  - Ao pressionar o botão "CE", o input deve ficar zerado.
  */
  var $visor     = document.querySelector('[data-calculator-visor]'),
      $numbers   = document.querySelectorAll('[data-calculator-number]'),
      $operators = document.querySelectorAll('[data-calculator-operator]');

  $numbers.forEach(function($number) {
    $number.addEventListener('click', handleClickNumber);
  });

  $operators.forEach(function($operator) {
    $operator.addEventListener('click', handleClickOperator);
  });

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
    return $visor.value = operation.reduce(function(accumulated, currentValue) {
      var firstValue   = accumulated.slice(0,-1),
          operator     = accumulated.split('').pop(),
          secondValue  = removeLastItemIfIsAnOperator(currentValue),
          lastOperator = isLastItemAnOperator(currentValue) ? currentValue.split('').pop() : '';

      switch (operator) {
        case '÷':
          return (Number(firstValue) / Number(secondValue)) + lastOperator;
        case 'x':
          return (Number(firstValue) * Number(secondValue)) + lastOperator;
        case '-':
          return (Number(firstValue) - Number(secondValue)) + lastOperator;
        case '+':
          return (Number(firstValue) + Number(secondValue)) + lastOperator;
      }
    });
  }

  function isLastItemAnOperator(value) {
    return /[\÷\x\-\+]$/.test(value);
  }

  function removeLastItemIfIsAnOperator(value) {
    if(isLastItemAnOperator(value))
      value = value.slice(0, -1);
    return value;
  }
})(document);
