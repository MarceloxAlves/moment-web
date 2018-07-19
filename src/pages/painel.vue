<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <br>
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
              <q-tab-pane name="tab-3">Tab Three</q-tab-pane>
            </q-tabs>
          </div>
        </div>

      </q-page>
    </q-page-container>
  </q-layout>

</template>

<script>
  import { Dialog } from 'quasar'
  import MeusEventos from "./evento/meus-eventos";
    export default {
        name: "painel",
      components: {MeusEventos},
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
        salvar(){
          this.$http.post( '/evento/cadastro', {
            params:{
              nome: this.usuario.nome,
              email: this.usuario.email,
              password: this.usuario.password,
            }
          })
            .then(response => {
              console.log(response)
            })
            .catch(e=>{
              Dialog.create(
                {
                  title: 'Error',
                  message: "" + e
                }
              )
            });
          }
      }
    }
</script>

<style scoped>

</style>
