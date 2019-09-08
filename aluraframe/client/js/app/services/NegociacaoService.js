'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._http = new HttpService();
    }

    _createClass(NegociacaoService, [{
        key: 'obterNegociacoes',
        value: function obterNegociacoes() {
            return Promise.all([this._http.get('negociacoes/semana'), this._http.get('negociacoes/anterior'), this._http.get('negociacoes/retrasada')]).then(function (negociacoes) {
                return negociacoes.reduce(function (novoArray, periodo) {
                    return novoArray.concat(periodo);
                }, []).map(function (objeto) {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Um erro ocorreu ao importar as Negociações.');
            });
        }
    }, {
        key: 'cadastra',
        value: function cadastra(negociacao) {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).then(function () {
                return 'Negociação adicionada com sucesso.';
            }).catch(function (erro) {
                console.log(erro);
                throw new Error(erro);
            });
        }
    }, {
        key: 'lista',
        value: function lista() {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.listaTodos();
            }).catch(function (erro) {
                console.log(erro);
                throw new Error(erro);
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.apagaTodos();
            }).then(function () {
                return 'Negociações apagas com sucesso!';
            }).catch(function (erro) {
                console.log(erro);
                throw new Error(erro);
            });
        }
    }, {
        key: 'importa',
        value: function importa(listaAtual) {
            return this.obterNegociacoes().then(function (negociacoes) {
                return negociacoes.filter(function (negociacao) {
                    return (//acessando uma Negociação das que foram IMPORTADAS
                        !listaAtual //acesso listaAtual, o retorno precisa ser 'false' para que as Negociações que foram iguais, não serem incluídas no novo vetor feito por 'filter()'
                        .some(function (negociacaoExistente) {
                            return (//acessa uma Negociação de listaAtual
                                negociacao.isEquals(negociacaoExistente)
                            );
                        })
                    );
                });
            }) //compara Negociação que foi IMPORTADA COM a Negociação de listaAtual
            .catch(function (erro) {
                console.log(erro);
                throw new Error(erro);
            });
        }
    }]);

    return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map