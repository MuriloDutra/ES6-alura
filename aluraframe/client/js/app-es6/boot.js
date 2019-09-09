import { currentInstance } from './controllers/NegociacaoController';

let negocicaoController = currentInstance();

/* Associando as funções ao elementos do HTML e mantendo o THIS dos métodos*/
document.querySelector('.form').onsubmit = negocicaoController.adiciona.bind(negocicaoController);
document.querySelector('[type==button]').onclick = negocicaoController.apaga.bind(negocicaoController);