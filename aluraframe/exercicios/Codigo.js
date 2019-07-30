class Codigo{

    constructor(code){
        if(!this._valida(code))
            throw new Error("Código inválido.");

        this._codigo = code;
        Object.freeze(this);
    }

    _valida(code){
        let expressao = /^\d{4}-\d{2}-\d{2}$/;

        if(expressao.test(code))
            return true;

        return false
    }

    get codigo(){
        return this._codigo;
    }

}