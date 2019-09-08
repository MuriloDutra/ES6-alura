class ProxyFactory{

    static create(objeto, props, acao){
        return  new Proxy(objeto, {

                    get (target, prop, receiver){
                        if(props.includes(prop) && ProxyFactory._verificaSeEFuncao(target[prop])){
                            return function(){
                                console.log(`Interceptando ${prop}`);
                                
                                let retorno = Reflect.apply(target[prop], target, arguments);   //Possível retorno
                                // 1º função, 2º contexto/this, 3º parâmetros da função original
                                
                                acao(target);
                                return retorno; //Caso a Reflect.apply tenha algum retorno, seu valor será retornado aqui.
                            }
                        }   
                       return Reflect.get(target, prop, receiver);                              //Possível retorno
                    },

                    set (target, prop, value, receiver){
                        let retorno = Reflect.set(target, prop, value, receiver);               //Possível retorno
                        
                        if(props.includes(prop))
                            acao(target);
                        
                        return retorno;
                    }
                });
    }

    static _verificaSeEFuncao(func){
        return typeof(func) == typeof(Function);
    }
}