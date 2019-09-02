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
}