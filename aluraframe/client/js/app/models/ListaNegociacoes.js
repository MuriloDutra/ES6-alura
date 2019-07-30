class ListaNegociacoes{
    
    constructor(contexto, armadilha){
        this._negociacoes = [];
        this._armadilha = armadilha;
        this._contexto = contexto;
    }

    adiciona(negociaco){
        this._negociacoes.push(negociaco);
        //this._armadilha(this);                      //Este THIS é a própria classe ListaNegociacoes
        Reflect.apply(this._armadilha, this._contexto,[this]);
    }

    get negociacoes(){
        return [].concat(this._negociacoes);
    }

    esvazia(){
        this._negociacoes = [];
        //this._armadilha(this);                      //Este THIS é a própria classe ListaNegociacoes
        Reflect.apply(this._armadilha, this._contexto,[this]);
    }
}