<template>
        <div class="row">
          <div class="col s10">
            <q-tabs color="secondary" inverted>
              <!-- Tabs - notice slot="title" -->
              <q-tab default  slot="title" name="tab-1" icon="message" label="Meus Eventos" />
              <q-tab  slot="title" name="tab-3" icon="account_box" label="Minhas Inscrições" />
              <!-- Targets -->
              <q-tab-pane name="tab-1">
                    <meus-eventos></meus-eventos>
              </q-tab-pane>
                    <listagem-inscricao></listagem-inscricao>
            </q-tabs>
          </div>
        </div>
</template>

<script>
  import { Dialog } from 'quasar'
  import MeusEventos from "./evento/meus-eventos";
  import ListagemInscricao from "./usuario/inscricao/listagem-inscricoes";
    export default {
        name: "painel",
      components: {ListagemInscricao, MeusEventos},
      data(){
          return {
            model: null,
            usuario: {
              nome: '',
              email: '',
              password: '',
            }
          }
        },
      methods: {

      }
    }
</script>

<style scoped>

</style>
