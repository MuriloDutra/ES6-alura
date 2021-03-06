'use strict';

System.register(['../models/Negociacao'], function (_export, _context) {
    "use strict";

    var Negociacao, _createClass, NegociacaoDao;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('NegociacaoDao', NegociacaoDao = function () {
                function NegociacaoDao(connection) {
                    _classCallCheck(this, NegociacaoDao);

                    this._connection = connection;
                    this._store = 'negociacoes';
                }

                _createClass(NegociacaoDao, [{
                    key: 'adiciona',
                    value: function adiciona(negociacao) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            var request = _this._connection.transaction([_this._store], 'readwrite') //Obtem a transição
                            .objectStore(_this._store) //Recupera a store
                            .add(negociacao); //Adiciona o dado na Store

                            request.onsuccess = function (event) {
                                resolve();
                            };

                            request.onerror = function (event) {
                                console.log(event.target.error);
                                reject('Não foi possível adicionar a Negociação.');
                            };
                        });
                    }
                }, {
                    key: 'listaTodos',
                    value: function listaTodos() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            var cursor = _this2._connection.transaction([_this2._store], 'readwrite') //Obtendo a Transação
                            .objectStore(_this2._store) //Obtendo a Store
                            .openCursor(); //Obtendo o Cursor, que irá varrer a Object Store

                            var negociacoes = [];

                            cursor.onsuccess = function (event) {
                                var atual = event.target.result;

                                if (atual) {
                                    var dado = atual.value;
                                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                                    atual.continue();
                                } else resolve(negociacoes);
                            };

                            cursor.onerror = function (event) {
                                console.log(event.target.error.name);
                                reject('Não foi possível listar as Negociações.');
                            };
                        });
                    }
                }, {
                    key: 'apagaTodos',
                    value: function apagaTodos() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {

                            var request = _this3._connection.transaction([_this3._store], 'readwrite') //Obtendo a Transação
                            .objectStore(_this3._store) //Obtendo a Store
                            .clear(); //Apagando os dados da Object Store

                            request.onsuccess = function (event) {
                                return resolve('Negociações removidas com sucesso.');
                            };

                            request.onerror = function (event) {
                                console.log(event.target.error);
                                reject('Não foi possível apagar as Negociações.');
                            };
                        });
                    }
                }]);

                return NegociacaoDao;
            }());

            _export('NegociacaoDao', NegociacaoDao);
        }
    };
});
//# sourceMappingURL=NegociacaoDao.js.map