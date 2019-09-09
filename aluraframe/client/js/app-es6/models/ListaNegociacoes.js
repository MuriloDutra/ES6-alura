export class ListaNegociacoes{
    
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

    get volumeTotal(){
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }

    ordena(criterio){
        this._negociacoes.sort(criterio);
    }

    inverteOrdem(){
        this._negociacoes.reverse();
    }
}