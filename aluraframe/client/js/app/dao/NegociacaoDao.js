class NegociacaoDao{

    constructor(connection){
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao){
        return new Promise((resolve, reject) => {
            let request = this._connection.transaction([this._store], 'readwrite')  //Obtem a transição
                                .objectStore(this._store)                           //Recupera a store
                                .add(negociacao);                                   //Adiciona o dado na Store

            request.onsuccess = event => {
                resolve();
            };

            request.onerror = event => {
                console.log(event.target.error);
                reject('Não foi possível adicionar a Negociação.');
            };
        });
    }

    listaTodos(){
        return new Promise((resolve, reject) => {
            let cursor = this._connection
                            .transaction([this._store], 'readwrite')    //Obtendo a Transação
                            .objectStore(this._store)                   //Obtendo a Store
                            .openCursor();                              //Obtendo o Cursor, que irá varrer a Object Store

            let negociacoes = [];

            cursor.onsuccess = event => {
                let atual = event.target.result;

                if(atual){
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    atual.continue();
                }else
                    resolve(negociacoes);
            };

            cursor.onerror = event => {
                console.log(event.target.error.name);
                reject('Não foi possível listar as Negociações.');
            };
        });
    }

    apagaTodos(){
        return new Promise((resolve, reject) => {
            
            let request = this._connection
                            .transaction([this._store], 'readwrite')    //Obtendo a Transação
                            .objectStore(this._store)                   //Obtendo a Store
                            .clear();                                   //Apagando os dados da Object Store

            request.onsuccess = event => resolve('Negociações removidas com sucesso.');

            request.onerror = event => {
                console.log(event.target.error);
                reject('Não foi possível apagar as Negociações.');
            };
        });
    }
}