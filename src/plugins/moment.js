
const  meses = new Array("Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro");
const  semana = new Array("Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado");

export default ({ Vue }) => {
  Vue.prototype.$moment = {
     extenso: function DiaExtenso() {
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
      },
     prepareDate: function (stringDate) {
      return stringDate.replace(/-/g, '/');
    },
    prepareDateReverse: function (stringDate) {
      return stringDate.replace(/\//g, '-');
    },
    in_array: function(needle, haystack, argStrict) {
      var key = '', strict = !!argStrict;
      if (strict) {
        for (key in haystack) {
          if (haystack[key] === needle) {
            return true;
          }
        }
      }
      else {
        for (key in haystack) {
          if (haystack[key] == needle) {
            return true;
          }
        }
      }
      return false;
    },

    remove_array : function remove(array, element) {
      const index = array.indexOf(element);
      array.splice(index, 1);
    }
  }
}
