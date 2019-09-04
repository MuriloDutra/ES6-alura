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

    cadastra(negociacao){
        return ConnectionFactory.getConnection()
                .then(connection => new NegociacaoDao(connection))
                .then(dao => dao.adiciona(negociacao))
                .then(() => 'Negociação adicionada com sucesso.')
                .catch(erro => {
                    console.log(erro);
                    throw new Error(erro);
                });
    }

    lista(){
        return ConnectionFactory.getConnection()
                .then(connection => new NegociacaoDao(connection))
                .then(dao => dao.listaTodos())
                .catch(erro => {
                    console.log(erro);
                    throw new Error(erro);
                });
    }

    apaga(){
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociações apagas com sucesso!')
            .catch(erro => {
                console.log(erro);
                throw new Error(erro);
            });
    }

    importa(listaAtual){
        return  this.obterNegociacoes()
                .then(negociacoes => 
                    negociacoes.filter(negociacao =>                                                //acessando uma Negociação das que foram IMPORTADAS
                        !listaAtual                                                                 //acesso listaAtual
                        .some(negociacaoExistente =>                                                //acessa uma Negociação de listaAtual
                                JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente))))//compara Negociação que foi IMPORTADA COM a Negociação de listaAtual
                .catch(erro => {
                    console.log(erro);
                    throw new Error(erro);
                });
    }
} 