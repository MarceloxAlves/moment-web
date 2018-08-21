<template>
  <q-page>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <img src="../assets/eventos.png" width="100%">
    </transition>
    <listagem-evento></listagem-evento>
  </q-page>
</template>

<style scoped>
  .container-eventos{
    padding: 100px;
  }
</style>

<script>
import ListagemEvento from "./evento/listagem-evento";
export default {
  name: 'PageIndex',
  components: {ListagemEvento},
  data(){
    return {

    }
  }
}
</script>
