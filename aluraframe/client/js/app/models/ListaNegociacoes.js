class ListaNegociacoes{
    
                          //armadilha é a nova função que será executada em um novo contexto, um novo 'this'
    constructor(armadilha){
        this._negociacoes = [];
        this._armadilha = armadilha;
    }

    adiciona(negociaco){
        this._negociacoes.push(negociaco);

        this._armadilha(this);
        /*  Este 'this' de '_armadilha' NÃO é da classe atual, ListaNegociacoes, mas sim a classe 'NegociacaoController'.
            Pois no momento da chamada, a função que será executada está no contexto de 'NegociacoController', pois foi usado ARROWS FUNCTIONS.
            E o 'this' que está como parâmetro, esse sim é a classe 'ListaNegociacoes'
        */
    }

    get negociacoes(){
        return [].concat(this._negociacoes); //concatenando os dois vetores
    }

    esvazia(){
        this._negociacoes = [];
        this._armadilha(this);
    }
}