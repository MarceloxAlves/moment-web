<template>
  <q-page-container class="container-eventos">
      <q-search  icon="event" color="secondary"  v-model="busca"  stack-label="Pesquisar Evento" clearable />
       <br>
        <slot  v-for="evento in eventosFilters">
          <q-card inline class="evento">

            <!--<q-card-media>-->
              <!--<img src="http://via.placeholder.com/380x200">-->
            <!--</q-card-media>-->

            <q-card-title class="titulo">
              {{evento.descricao}}
              <q-rating slot="subtitle" v-model="eventos.length" :max="5" />
              <div slot="right" class="row items-center">
                <q-icon name="place" />
              </div>
            </q-card-title>
            <q-card-main>
              <!--<p class="text-faded"> {{evento.descricao}}</p>-->
            </q-card-main>
            <q-card-separator />
            <q-card-actions>
              <q-btn @click="onAtividades(evento)"  color="orange" style="width: 100%" label="Mais Informações" />
            </q-card-actions>
          </q-card>
        </slot>
  </q-page-container>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
        name: "listagem-evento",
        data(){
          return {
            eventos: [],
            eventosFilters:[],
            busca: null
          }
        },
        created(){
          this.listarEventos()
        },
        watch:{
          busca: function (n, o) {
            var buscaAgora = n;
              if (n == ''){
                this.eventosFilters = this.eventos
              }else{
                this.eventosFilters =  this.eventos.filter(function (evento) {
                  let tm  = evento.descricao.search(new RegExp(buscaAgora, "i"))
                  console.log(tm)
                  return tm > 0
                });
              }
          }
        },
        methods:{
          ...mapMutations('evento',[
            'setEventoSelecionado',
          ]),
          listarEventos(){
            this.$http.get( '/evento/listar', {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            })
              .then(response => {
                this.eventos = response.data;
                this.eventosFilters = this.eventos;
              })
              .catch(e=>{
                console.log(e)
              });
          },
          onAtividades(evento){
            this.setEventoSelecionado(evento)
            this.$router.push('/evento/list-atividade-evento')
          },
        }
    }
</script>

<style scoped>
   .evento{
     width: 30%;
     margin-left: 10px;
     margin-bottom: 10px;
   }

   .titulo{
     background: #26A69A;
     color: #fff;
   }

   @media only screen and (max-width: 980px) {
     .evento {
       width: 100%;
     }
   }


</style>
