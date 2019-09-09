import { ListaNegociacoes } from '../models/ListaNegociacoes';
import { Mensagem } from '../models/Mensagem';
import { Negociacao } from '../models/Negociacao';
import { NegociacoesView } from '../views/NegociacoesView';
import { MensagemView } from '../views/MensagemView';
import { NegociacaoService } from '../services/NegociacaoService';
import { DateHelper } from '../helpers/DateHelper';
import { Bind } from '../helpers/Bind';

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

        this._service = new NegociacaoService();

        this._init();
    }


    _init(){
        this._service
        .lista()
        .then(negociacoes => negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
        .catch(erro => this._mensagem.texto = erro);

        setInterval(() =>  this.importaNegociacoes(), 5000);
    }

    
    adiciona(event){
        event.preventDefault(); //Para desabilitar o reload da página

        let negociacao = this._criaNegociaco();
        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = erro
            });
    }


    apaga(){
        this._service
        .apaga()
        .then(mensagem => {
            this._listaNegociacoes.esvazia();
            this._mensagem.texto = mensagem;
        })
        .catch(erro => this._mensagem.texto = erro);
    }


    importaNegociacoes(){
        this._service
        .importa(this._listaNegociacoes.negociacoes)
        .then(negociacoes => negociacoes.forEach(negociacao => {
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = 'Negociações do período importadas.';
        }))
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

let negociacaoController = new NegociacaoController();

export function currentInstance(){ //EXPORTANDO UMA INSTÂNCIA DE negociacaoController
    return negociacaoController;
}
