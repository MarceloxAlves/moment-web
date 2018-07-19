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
        <q-btn push label="Sair"  @click="$router.push('/')" color="gray-6" dense icon="reply" />
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
        alert(response.data)
      })
    }
  }
}
</script>

<style>
</style>
