
const  meses = new Array("Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro");
const  semana = new Array("Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado");

export default ({ Vue }) => {
  Vue.prototype.$moment = {

    DiaExtenso() {
      hoje = new Date();
      dia = hoje.getDate();
      dias = hoje.getDay();
      mes = hoje.getMonth();
      ano = hoje.getYear();
      if (navigator.appName == "Netscape")
        ano = ano + 1900;
      diaext = semana[dias] + ", " + dia + " de " + meses[mes]
        + " de " + ano;
      return diaext;
  }
  }
}
