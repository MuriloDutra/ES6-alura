
//Criando uma função anônima. Isso foi feito para envolver a classe ConnectionFactory envolto de um módulo

var ConnectionFactory = (
    function (){

        const stores = ['negociacoes'];
        const version = 4;
        const dbName = 'aluraframe';
        
        var connection = null;
        var close = null;


        return class ConnectionFactory{

            constructor(){
                throw new Error('Não é possível criar instâncias de ConnectionFactory.');
            }


            static getConnection(){
                return new Promise((resolve, reject) => {

                    let openRequest = window.indexedDB.open(dbName, version); //Requisitando abertura de conexão

                    openRequest.onupgradeneeded = event => {
                        ConnectionFactory._createStores(event.target.result); //Cria as Stores
                    };

                    openRequest.onsuccess = event => {
                        if(!connection){ //Para não devolver conexões diferentes
                            connection = event.target.result;
                            close = connection.close.bind(connection); //Obtendo o método original com seu THIS original
                            connection.close = function(){ //sobrescrevendo o método close()
                                throw new Error('Não é permitido fechar diretamente a conexão.');
                            }
                        }
                        
                        resolve(connection); //Caso tudo dê certo
                    };

                    openRequest.onerror = event => {
                        console.log(event.target.error);
                        reject(event.target.error.name); //Caso um erro aconteça
                    };
                });
            }


            static _createStores(connection){
                stores.forEach(store => {

                    if(connection.objectStoreNames.contains(store))    //Verificando se a ObjectStore já existe
                        connection.deleteObjectStore(store);   //Deletando a ObjectStore já existente. Para atualizar uma ObjectStore, é necessário deletá-la e criá-la novamente

                    connection.createObjectStore(store, {autoIncrement: true}); //Criando a ObjectStore    
                });
            }


            static closeConnection(){
                if(connection){
                    close();
                    //Reflect.apply(close, connection, []); Outra maneira de preservar o THIS de 'close'
                    connection = null;
                }
            }
        }
}) ();  //Invocano a função anônima