class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        //Negociações                              
        this._listaNegociacoes = new ListaNegociacoes(model => 
            /*Esta arrow function atualiza a lista de negociações sempre que uma nova negociação for adicionada.
            Mas ela será executada na classe ListaNegociacoes, porém usando o contexto de NegoaciacoController.
            Ela só conseguirá usar o contexto de 'NegociacaoController' dentro de 'ListaNegociacoes' 
            pois o contexto de uma arrow function é léxico. Ele se mantém, não muda, 
            não é dinâmico que nem se você usar a palavra chave 'function' na declaração de uma função*/
            this._negociacoesView.update(model)
        );

        this._negociacoesView = new NegociacoesView($("#negociacoesView"));

        //Mensagens
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($("#mensagemView"));
        
    }

    adiciona(event){
        event.preventDefault();

        let negociacao = this._criaNegociaco();

        this._listaNegociacoes.adiciona(negociacao);

        this._mensagem.texto = 'Negociação adicionada com sucesso.';
        this._mensagemView.update(this._mensagem);
        
        this._limpaFormulario();
        
    }

    apaga(){
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = "Lista de negociações apagadas com sucesso.";
        this._mensagemView.update(this._mensagem);
    }

    _criaNegociaco(){
        
        let data = DateHelper.textoParaData(this._inputData.value);
        
        return new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario(){
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}