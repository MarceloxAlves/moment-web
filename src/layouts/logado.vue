<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="secondary"
      >
        <q-btn flat round dense icon="menu" @click="left = !left" aria-label="Toggle menu on left side" />
        <q-toolbar-title >
          <q-btn flat label="Moment" @click="$router.push('/')"/>
          <div slot="subtitle">Marketplace de eventos</div>
        </q-toolbar-title>
        <q-btn push label="Sair"  @click="logout()" color="orange-6" dense icon="reply" />
      </q-toolbar>
    </q-layout-header>


    <q-layout-drawer
      side="left"
      v-model="left"
    >
      <q-scroll-area class="fit">
        <q-list-header class="text-center">
          <q-icon  name="person" style="font-size:100px; margin: 0 auto;" /><br>
          {{usuario.nome}}
          <p><small>{{usuario.email}}</small></p>
        </q-list-header>

        <q-item to="/painel">
          <q-item-side icon="home" />
          <q-item-main label="Início" sublabel="voltar para a pagina inicial" />
        </q-item>

        <q-item to="/eventos">
          <q-item-side icon="event" />
          <q-item-main label="Eventos" sublabel="listagem de eventos" />
          <q-item-side right icon="thumb_up" />
        </q-item>

        <q-item to="/local">
          <q-item-side icon="location_on" />
          <q-item-main label="Locais" sublabel="listagem de locais"  />
        </q-item>

        <q-item to="/tags">
          <q-item-side icon="event" />
          <q-item-main label="Tags" sublabel="listagem de tags" />
        </q-item>

      </q-scroll-area>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { LocalStorage, SessionStorage } from 'quasar'
import { Dialog } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      left: false,
      usuario :{
          id: null,
          nome: null,
          email: null
      },
    }
  },
  watch:{

  },
  created(){
      this.getDados()
  },
  methods: {
    openURL,
    drawerClick (e) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (this.miniState) {
        this.miniState = false

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation()
      }
    },
    getDados(){
      this.$http.get('/usuario/'+ SessionStorage.get.item("email"))
        .then(response => {
          let result = response.data.result.response
          let usuario = result.usuario
          if (usuario != null){
            this.usuario = usuario
          }else{
            this.$router.push('/acesso');
          }
        })
        .catch(e=>{
          console.log(e)
          Dialog.create(
            {
              title: 'Error',
              message: "Erro ao acessar o serviço"
            }
          )
        });
    },
    logout(){
      SessionStorage.clear();
      this.$router.push("/acesso")
    }
  }
}
</script>

<style>
</style>
