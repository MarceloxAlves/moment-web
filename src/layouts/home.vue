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

        <q-btn push color="secondary" dense icon="shopping_cart"  @click="cart = !cart"/> &nbsp;
        <q-btn push label="Criar Conta" color="yellow-10" dense icon="people"  @click="$router.push('/cadastro')"/> &nbsp;
        <q-btn push label="Acessar"  @click="$router.push('/acesso')" color="green-6" dense icon="lock" />
      </q-toolbar>
    </q-layout-header>


    <q-page-container>
      <cart :opened="cart" @fechei="cart = false"></cart>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import Cart from "../pages/atividade/cart";

export default {
  name: 'LayoutDefault',
  components: {Cart},
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      cart: false
    }
  },
  created(){

  },
  methods: {
    openURL,
  }
}
</script>

<style>
</style>
