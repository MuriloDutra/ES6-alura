class ListaNegociacoes{
    

    constructor(){
        this._negociacoes = [];        
    }

    adiciona(negociaco){
        this._negociacoes.push(negociaco);
    }

    get negociacoes(){
        return [].concat(this._negociacoes); //concatenando os dois vetores
    }

    esvazia(){
        this._negociacoes = [];
    }
}