<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="secondary"
      >
        <q-toolbar-title>
          Moment
          <div slot="subtitle">Marketplace de eventos</div>
        </q-toolbar-title>
        <q-btn push label="Criar Conta" color="yellow-10" dense icon="people" /> &nbsp;
        <q-btn push label="Acessar" color="green-6" dense icon="lock" />
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
  methods: {
    openURL
  }
}
</script>

<style>
</style>
