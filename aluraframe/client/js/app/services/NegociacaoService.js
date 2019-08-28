class NegociacaoService{

    obterNegociacoesDaSemana(){
        return new Promise((resolve, reject) => {

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
                        resolve(JSON.parse(xhr.responseText).map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))); 
                                                            //O map retorna um novo vetor com objeto Negociacao criados
                    }else{
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as Negociações da semana.');
                    }
                }
            };

            xhr.send();
        });
    }

    obterNegociacoesDaSemanaAnterior(){
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open('GET', 'negociacoes/anterior');
            xhr.onreadystatechange = () => { 
            
                if(xhr.readyState == 4){

                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    }else{
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as Negociações da semana anterior.');
                    }
                }
            };
            xhr.send();
        });
    }

    obterNegociacoesDaSemanaRetrasada(){
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open('GET', 'negociacoes/retrasada');
            xhr.onreadystatechange = () => { 
            
                if(xhr.readyState == 4){

                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    }else{
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as Negociações da semana retrasada.');
                    }
                }
            };
            xhr.send();
        });
        
    }
} 