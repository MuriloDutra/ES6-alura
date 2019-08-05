class MensagemView extends View{

    /*  -- Construtor omitido
        O javascript já considera que o elemento passado por construtor, 
        deve ser redirecionado para a classe "pai", por isso esta classe não possui construtor.
        A classe pai no caso é 'View'
    */

    template(model){
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`;
    }
}