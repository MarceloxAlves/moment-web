<template>
  <q-page-container style="padding: 10px;">
      <div class="container">
        <q-card>
          <q-card-title color="secondary">
            {{evento.descricao}}
          </q-card-title>

          <q-card-separator />
        </q-card>
        <q-list highlight>
          <q-list-header>Atividades do Evento</q-list-header>
         <slot v-for="atividade in evento.atividades">
           <q-item v-if="atividade.tipoAtividade.id > 0" >
             <q-item-side>
               <q-btn round @click="addCart(atividade)" color="secondary" icon="add_shopping_cart" />
             </q-item-side>
             <q-item-main :label="atividade.nome" />
             <q-item-side>{{atividade.inicio}}</q-item-side>
             <q-item-side right icon="schedule" />
           </q-item>
         </slot>

        </q-list>
      </div>
  </q-page-container>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { LocalStorage, SessionStorage } from 'quasar'
  import { date } from 'quasar'
    export default {
      name: "list-atividade-evento",
      data(){
        return {
          evento: {
            descricao: ''
          },
          cart: []
        }
      },
      created(){
        let cart = SessionStorage.get.item("cart")
        if (cart != null){
          this.cart =  cart
        }
      },
      computed:
        {
          ...mapGetters('evento',[
            'getEventoSelecionado'
          ])
        },
      created(){
          this.evento  = this.$store.state.evento.eventoSelecionado
          if (this.evento == null){
             this.$router.push('/')
          }
        },
      methods:{
        addCart(atividade){
          Object.defineProperty(atividade, 'evento', {
            value: this.evento.id,
            writable: true,
            enumerable: true,
            configurable: true
          })
          if (!this.$moment.in_array(atividade, this.cart)){
            this.cart.push(atividade)
            SessionStorage.set("cart",this.cart)
            this.$q.notify({
              message: "Atividade: "+ atividade.nome + " adicionada ao carrinho!",
              timeout: 3000,
              type: 'positive'
            })
          }else{
            this.$q.notify({
              message: "Item ja adicionado no carrinho!",
              timeout: 3000,
              type: 'negative',
              color: 'red',
              textColor: 'white',
              icon: 'error'
            })
          }
        }
      }
    }
</script>

<style scoped>

</style>
