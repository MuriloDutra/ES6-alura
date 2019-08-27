class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        //Negociações | Utilizando o Bind para ligar a View ao Proxy
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), 'adiciona', 'esvazia');

        //Mensagens | Utilizando o Bind para ligar a View ao Proxy
        this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), 'texto');
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


    importaNegociacoes(){
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/semana'); //A URL está assim pois o servidor é local

        xhr.onreadystatechange = () => { // toda vez que o estado de 'xhr' mudar, esta função será executada
            /**Estado de uma requisição AJAX
             * 
             * 0: requisição ainda não iniciada
             * 1: conexão com o servidor estabelecidas
             * 2: requisição recebida
             * 3: processando requisição
             * 4: requisição concluída e a resposta esta pronta */

             if(xhr.readyState == 4){
                 if(xhr.status == 200){ //Quando a resposta for OK          
                    JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)) //O map retorna um novo vetor com objeto Negociacao criados
                    .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)); //Logo após adiciono cada Negociacao do novo vetor, usando o adiciona()
                    this._mensagem.texto = 'Negociações importas com sucesso.';
                 }else{
                    console.log(xhr.responseText);
                    this._mensagem.texto = 'Não foi possível recuperar as Negociações.';
                 } 
             }
        };

        xhr.send();
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