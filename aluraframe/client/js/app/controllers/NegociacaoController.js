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

        this._init();
    }


    _init(){
        ConnectionFactory //Recuperando as negociações do IndexedDB
            .getConnection()
                .then(connection => new NegociacaoDao(connection))
                .then(dao => dao.listaTodos())
                .then(negociacoes => 
                    negociacoes.forEach(negociacao => 
                        this._listaNegociacoes.adiciona(negociacao)))
                .catch(erro => {
                    console.log(erro);
                    this._mensagem.texto = erro;
                });

        setInterval(() =>  this.importaNegociacoes(), 5000);
    }

    
    adiciona(event){
        event.preventDefault(); //Para desabilitar o reload da página
        ConnectionFactory.getConnection()
            .then(connection => {
                let negociacao = this._criaNegociaco();
                new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(() => {
                        this._listaNegociacoes.adiciona(negociacao);
                        this._mensagem.texto = 'Negociação adicionada com sucesso.';
                        this._limpaFormulario();
                    });
                    
            })
            .catch(erro => this._mensagem.texto = erro);
    }


    apaga(){
        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => {
                this._listaNegociacoes.esvazia();
                this._mensagem.texto = mensagem;
            })
            .catch(erro => this._mensagem.texto = erro);
        
    }


    importaNegociacoes(){
        let service = new NegociacaoService();

        service.obterNegociacoes()
        .then(negociacoes => negociacoes.filter(negociacao =>                               //acessando uma Negociação das que foram IMPORTADAS
                ! this._listaNegociacoes                                                    //acesso listaNegociacoes
                .negociacoes.some(negociacaoExistente =>                                    //acessa uma Negociação de listaNegociacoes
                        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente))))//compara Negociação que foi IMPORTADA COM a Negociação de listaNegociacoes
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
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }


    _limpaFormulario(){
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}