<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="secondary"
      >
        <q-toolbar-title >
          <q-btn flat label="Moment" @click="$router.push('/')"/>
          <div slot="subtitle">Marketplace de eventos</div>
        </q-toolbar-title>
        <q-btn push label="Criar Conta" color="yellow-10" dense icon="people"  @click="$router.push('/cadastro')"/> &nbsp;
        <q-btn push label="Acessar"  @click="$router.push('/acesso')" color="green-6" dense icon="lock" />
      </q-toolbar>
    </q-layout-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  created(){
    this.getCount()
  },
  methods: {
    openURL,
    getCount () {
      this.$http.get('/evento/count', {})
      .then(response => {
      })
    }
  }
}
</script>

<style>
</style>
