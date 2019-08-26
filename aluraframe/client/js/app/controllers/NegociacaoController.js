class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        let self = this;

        //Negociações
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
            get (target, prop, receiver){
                if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)){
                    return function(){
                        Reflect.apply(target[prop], target, arguments);
                        self._negociacoesView.update(target);
                    }
                }
                
                return Reflect.get(target, prop, receiver);
            }
        });

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