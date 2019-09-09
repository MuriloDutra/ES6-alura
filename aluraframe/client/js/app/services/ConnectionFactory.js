'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, stores, version, dbName, connection, close, ConnectionFactory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            stores = ['negociacoes'];
            version = 4;
            dbName = 'aluraframe';
            connection = null;
            close = null;

            _export('ConnectionFactory', ConnectionFactory = function () {
                function ConnectionFactory() {
                    _classCallCheck(this, ConnectionFactory);

                    throw new Error('Não é possível criar instâncias de ConnectionFactory.');
                }

                _createClass(ConnectionFactory, null, [{
                    key: 'getConnection',
                    value: function getConnection() {
                        return new Promise(function (resolve, reject) {

                            var openRequest = window.indexedDB.open(dbName, version); //Requisitando abertura de conexão

                            openRequest.onupgradeneeded = function (event) {
                                ConnectionFactory._createStores(event.target.result); //Cria as Stores
                            };

                            openRequest.onsuccess = function (event) {
                                if (!connection) {
                                    //Verificando se a conexão existe
                                    connection = event.target.result;
                                    close = connection.close.bind(connection); //Obtendo o método original com seu THIS original
                                    connection.close = function () {
                                        //sobrescrevendo o método close()
                                        throw new Error('Não é permitido fechar diretamente a conexão.');
                                    };
                                }

                                resolve(connection); //Caso tudo dê certo
                            };

                            openRequest.onerror = function (event) {
                                console.log(event.target.error);
                                reject(event.target.error.name); //Caso um erro aconteça
                            };
                        });
                    }
                }, {
                    key: '_createStores',
                    value: function _createStores(connection) {
                        stores.forEach(function (store) {

                            if (connection.objectStoreNames.contains(store)) //Verificando se a ObjectStore já existe
                                connection.deleteObjectStore(store); //Deletando a ObjectStore já existente. Para atualizar uma ObjectStore, é necessário deletá-la e criá-la novamente

                            connection.createObjectStore(store, { autoIncrement: true }); //Criando a ObjectStore    
                        });
                    }
                }, {
                    key: 'closeConnection',
                    value: function closeConnection() {
                        if (connection) {
                            close();
                            //Reflect.apply(close, connection, []); Outra maneira de preservar o THIS de 'close'
                            connection = null;
                        }
                    }
                }]);

                return ConnectionFactory;
            }());

            _export('ConnectionFactory', ConnectionFactory);
        }
    };
});
//# sourceMappingURL=ConnectionFactory.js.map