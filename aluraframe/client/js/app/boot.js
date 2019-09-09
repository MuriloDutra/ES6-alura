'use strict';

System.register(['./controllers/NegociacaoController'], function (_export, _context) {
  "use strict";

  var currentInstance, negocicaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      currentInstance = _controllersNegociacaoController.currentInstance;
    }],
    execute: function () {
      negocicaoController = currentInstance();


      /* Associando as funções ao elementos do HTML e mantendo o THIS dos métodos*/
      document.querySelector('.form').onsubmit = negocicaoController.adiciona.bind(negocicaoController);
      document.querySelector('[type==button]').onclick = negocicaoController.apaga.bind(negocicaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map