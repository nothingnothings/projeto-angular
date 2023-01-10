export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    //aqui definimos um GETTER_... getters são acessados como PROPRIEDADES (sem o uso de '()' para os chamar), E SÃO USADOS PARA RETRIEVAREM DATA DE NOSSAS PROPREIDADES, MAS COM LÓGICA RODADA EM CIMA DESSE 'GET'... --> no caso, vamos checar, por meio do getter, se A __ TOKEN_ DE NOSSO USER_ REALMENTE É VÁLIDA...

    if (!this._tokenExpirationDate || new Date() >= this._tokenExpirationDate) {   ///// POR MEIO DE NOSSO GETTER, checamos SE __ A DATE ATUAL NÃO EXCEDE A DATE DEFINIDA POR 'tokenExpirationDate'...
   
   
        return null; ///ou seja, até podemos TER UMA 'TOKEN', mas ela já estará INVÁLIDA (ou nunca foi válida, pq a propriedade de 'tokenExpirationDate' não existia no interior desse nosso object 'user')....
   
    }



    return this._token; //retornamos a nossa token...

  }
}
