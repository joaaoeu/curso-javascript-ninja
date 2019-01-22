(function(){
  'use strict';
  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
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

  var ajax           = new XMLHttpRequest(),
      $formCEP       = new DOM('[data-cep="form"]'),
      $inputCEP      = new DOM('[data-cep="input-cep"]'),
      $status        = new DOM('[data-cep="status"]'),
      $street        = new DOM('[data-cep="street"]'),
      $neighbourhood = new DOM('[data-cep="neighbourhood"]'),
      $city          = new DOM('[data-cep="city"]'),
      $state         = new DOM('[data-cep="state"]'),
      $cep           = new DOM('[data-cep="cep"]');

  $formCEP.on('submit', handleSubmitFormCEP);

  function handleSubmitFormCEP(event) {
    event.preventDefault();

    if($inputCEP.get()[0].value) {
      ajax.open('GET', getUrl());
      ajax.send();
      getMessage('loading');
      ajax.addEventListener('readystatechange', handleReadyStateChange);
    }
  }

  function getUrl() {
    return 'http://apps.widenet.com.br/busca-cep/api/cep.json?code=' + $inputCEP.get()[0].value.replace(/\D/g, '');
  }

  function handleReadyStateChange() {
    if(isRequestOk())
      fillCEPFields();
  }

  function isRequestOk() {
    return ajax.readyState === 4 && ajax.status === 200;
  }

  function fillCEPFields() {
    var data = JSON.parse(ajax.responseText);

    if(data.status === 1) getMessage('ok');
    if(data.status === 0) getMessage('error');

    $street.get()[0].textContent        = data.address || '-';
    $neighbourhood.get()[0].textContent = data.district || '-';
    $city.get()[0].textContent          = data.city || '-';
    $state.get()[0].textContent         = data.state || '-';
    $cep.get()[0].textContent           = data.code || '-';
  }

  function getMessage(type) {
    var messages = {
      loading: 'Buscando informações para o CEP: ',
      ok: 'Endereço referente ao CEP: ',
      error: 'Não encontramos o endereço para o CEP: '
    };

    return $status.get()[0].textContent = messages[type] + $inputCEP.get()[0].value.replace(/\D/g, '');
  }
})(document);
