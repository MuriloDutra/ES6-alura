class ListaNegociacoes{
    
                          //armadilha é a nova função que será executada em um novo contexto, um novo 'this'
    constructor(armadilha){
        this._negociacoes = [];
        this._armadilha = armadilha;
    }

    adiciona(negociaco){
        this._negociacoes.push(negociaco);

        this._armadilha(this);
        /*  Este 'this' de '_armadilha' NÃO é da classe atual, ListaNegociacoes, mas sim da classe 'NegociacaoController'.
            Pois no momento da chamada, a função que será executada está no contexto de 'NegociacoController'*/
    }

    get negociacoes(){
        return [].concat(this._negociacoes); //concatenando os dois vetores
    }

    esvazia(){
        this._negociacoes = [];
        this._armadilha(this);
    }
}