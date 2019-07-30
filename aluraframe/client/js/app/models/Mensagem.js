class Mensagem{
    
                    //caso não seja passado nenhum parâmetro para o construtor, o valor padrão da  variável "texto" será: " ".
    constructor(texto=" "){
        this._texto = texto;
    }

    get texto(){
        return this._texto;
    }

    set texto(texto){
        this._texto = texto;
    }
}