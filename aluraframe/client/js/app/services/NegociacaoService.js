class NegociacaoService{

    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoes(){
        return Promise.all([
                this._http.get('negociacoes/semana'), 
                this._http.get('negociacoes/anterior'), 
                this._http.get('negociacoes/retrasada')
            ])
            .then(negociacoes => 
                negociacoes.reduce((novoArray, periodo) => novoArray.concat(periodo), [])
                .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            )
            .catch(erro => {
                console.log(erro);
                throw new Error('Um erro ocorreu ao importar as Negociações.');
            });
    }
} 