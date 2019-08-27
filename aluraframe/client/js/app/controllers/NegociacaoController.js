class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        //Negociações
        this._listaNegociacoes = ProxyFactory.create(new ListaNegociacoes(), ['adiciona', 'esvazia'], model => 
            this._negociacoesView.update(model) //esse será o target do lado de ProxyFactory, pois o 'target' representa o objeto original
        );

        this._negociacoesView = new NegociacoesView($("#negociacoesView"));

        //Mensagens
        this._mensagem = ProxyFactory.create(new Mensagem, ['texto'], model => 
            this._mensagemView.update(model)
        );

        this._mensagemView = new MensagemView($("#mensagemView"));
        
    }

    adiciona(event){
        event.preventDefault();
        let negociacao = this._criaNegociaco();
        
        this._listaNegociacoes.adiciona(negociacao);
        this._mensagem.texto = 'Negociação adicionada com sucesso.';
        this._limpaFormulario();
    }

    apaga(){
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Lista de negociações apagadas com sucesso.";
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