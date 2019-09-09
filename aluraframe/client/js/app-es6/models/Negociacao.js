export class Negociacao{

    constructor(data, quantidade, valor){
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;
        this._volume = this._quantidade * this._valor;

        Object.freeze(this); //congelando objeto para que ele não possa ser modificado
    }

    get volume(){
        return this._volume;
    }

    get data(){
        return new Date(this._data.getTime());
    }

    get quantidade(){
        return this._quantidade;
    }

    get valor(){
        return this._valor;
    }

    isEquals(outraNegociacao) {
        return JSON.stringify(this) == JSON.stringify(outraNegociacao)
    }
}