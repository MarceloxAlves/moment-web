<template>
  <q-modal v-model="opened" @show="atualiza()" :content-css="{minWidth: '80vw', minHeight: '80vh'} "  @hide="notify()">
    <q-modal-layout>
      <q-toolbar slot="header" color="secondary">
        <q-toolbar-title>
           Minha compra
        </q-toolbar-title>
      </q-toolbar>
      <q-list highlight>
        <q-list-header>Meus Itens</q-list-header>
        <slot v-for="atividade in atividades">
          <q-item >
            <q-item-main :label="atividade.nome" />
            <q-item-side>{{atividade.valor}}</q-item-side>
            <q-item-side right ><q-btn round flat @click="removerAtividade(atividade)" color="red"  icon="remove_circle" /></q-item-side>
          </q-item>
        </slot>

      </q-list>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import { LocalStorage, SessionStorage } from 'quasar'
  export default {
        name: "cart",
        props: ["opened"],
        data(){
          return {
              atividades: []
          }
        },
        created(){
          this.atualiza()
        },
    methods:{
      notify(){
        this.$emit('fechei');
      },
      atualiza(){
        let cart = SessionStorage.get.item("cart")
        if (cart != null){
          this.atividades =  cart
        }
      },
      removerAtividade(atividade){
        this.$moment.remove_array(this.atividades, atividade)
        SessionStorage.set("cart",this.atividades)
        this.atualiza()
      }
    }
  }
</script>

<style scoped>

</style>
