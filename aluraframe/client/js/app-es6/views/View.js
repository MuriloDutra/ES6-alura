class View{
    
    constructor(elemento){
        this._elemento = elemento;
    }

    //método pai, mas que não deve ser chamado
    template(){
        throw new Error("O método _template() deve ser implementado.");
    }

    //atualiza o template de uma página ou elemento
    update(model){
        this._elemento.innerHTML = this.template(model);
    }
}