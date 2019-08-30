class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';

        //Negociações | Utilizando o Bind para ligar a View ao Proxy
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        //Mensagens | Utilizando o Bind para ligar a View ao Proxy
        this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), 'texto');
    }

    
    adiciona(event){
        event.preventDefault();
        try{
            this._listaNegociacoes.adiciona(this._criaNegociaco());
            this._mensagem.texto = 'Negociação adicionada com sucesso.';
            this._limpaFormulario();
        }catch(erro){
            this._mensagem.texto = erro;
        }
    }


    apaga(){
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Lista de negociações apagadas com sucesso.";
    }


    importaNegociacoes(){
        let service = new NegociacaoService();

        service.obterNegociacoes()
        .then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações dos períodos importadas com sucesso.';
        })
        .catch(erro => this._mensagem.texto = erro);
    }


    ordena(coluna){
        document.getElementById('ordenaView').innerHTML = `Lista ordenada por <span class="alert-success">${coluna.toUpperCase()}</span>`;

        if(this._ordemAtual == coluna)
            this._listaNegociacoes.inverteOrdem();
        else
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);

        this._ordemAtual = coluna;
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