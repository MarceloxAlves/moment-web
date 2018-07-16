<template>
  <q-page>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <img src="../assets/eventos.png" width="100%">
    </transition>

    <q-page-container class="container-eventos">
      <q-page>
        <div class="row">
          <div class="col s12">
              <h3 class="title">Eventos</h3>
          </div>
        </div>
          <div class="row">
            <div class="col s6" v-for="evento in eventos">
              <q-card inline style="width: 500px">

                <q-card-media>
                  <img :src="evento.foto">
                </q-card-media>
                <q-card-title>
                    {{evento.titulo}}
                  <q-rating slot="subtitle" v-model="eventos.length" :max="5" />
                  <div slot="right" class="row items-center">
                    <q-icon name="place" />
                  </div>
                </q-card-title>
                <q-card-main>
                  <p class="text-faded"> {{evento.descricao}}</p>
                </q-card-main>
                <q-card-separator />
                <q-card-actions>
                  <q-btn flat round dense icon="event" />
                  <q-btn flat color="positive" label="Participar" />
                </q-card-actions>
              </q-card>
            </div>
          </div>
      </q-page>
    </q-page-container>
  </q-page>
</template>

<style scoped>
  .container-eventos{
    padding: 100px;
  }
</style>

<script>
export default {
  name: 'PageIndex',
  data(){
    return {
      eventos: [
        {
          titulo: "Semama de Programação",
          foto: "https://i.ytimg.com/vi/ZzV3VIgn8fI/maxresdefault.jpg",
          descricao: "Evento sobre programação",
          dataInicial: "2018-07-22",
          dataFinal: "2018-07-22"
        },
        {
          titulo: "Semama de Programação",
          foto: "https://i.ytimg.com/vi/ZzV3VIgn8fI/maxresdefault.jpg",
          descricao: "Evento sobre programação",
          dataInicial: "2018-07-22",
          dataFinal: "2018-07-22"
        }


      ]
    }
  }
}
</script>
