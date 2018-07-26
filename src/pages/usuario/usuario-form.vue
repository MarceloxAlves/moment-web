<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <br>
        <div class="row">
          <div class="col s2"></div>
          <div class="col s8">
            <q-card inline style="width: 500px">
              <q-card-title>
               Criar Conta
                <div slot="right" class="row items-center">
                  <q-icon name="people" />
                </div>
              </q-card-title>
              <q-card-main>
                <q-field
                  icon=""
                  helper=""
                >
                  <q-input v-model="usuario.nome" float-label="Nome Completo" />
                </q-field><br>
                <q-field
                  icon=""
                  helper="">
                  <q-input v-model="usuario.email" float-label="Email" />
                </q-field><br>
                <q-input
                  v-model="usuario.password"
                  type="password"
                  float-label="Senha"/>
              </q-card-main>

              <q-card-separator />
              <q-card-actions>
                <q-btn  color="secondary" @click="salvar" label="Cadastrar" />
              </q-card-actions>
            </q-card>

          </div>
          <div class="col s2"></div>
        </div>

      </q-page>
    </q-page-container>
  </q-layout>

</template>

<script>
  import { Dialog } from 'quasar'
    export default {
        name: "usuario-form",
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
          this.$http.post( '/usuario/cadastro', {
            params:{
              nome: this.usuario.nome,
              email: this.usuario.email,
              password: this.usuario.password,
            }
          })
            .then(response => {
              Dialog.create(
                {
                  title: 'Cadastrado',
                  message: "Usuario Cadastrado com sucesso!"
                }
              )
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
