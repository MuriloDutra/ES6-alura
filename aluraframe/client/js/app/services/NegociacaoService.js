class NegociacaoService{

    obterNegociacoesDaSemana(callback){
        
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
                    callback(null, JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))); //O map retorna um novo vetor com objeto Negociacao criados
                 }else{
                    console.log(xhr.responseText);
                    callback('Não foi possível obter as Negociações.', null);
                 }
             }
        };

        xhr.send();
    }
} 