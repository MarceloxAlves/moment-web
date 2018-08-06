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
               Acessar Sistema
                <div slot="right" class="row items-center">
                  <q-icon name="people" />
                </div>
              </q-card-title>
              <q-card-main>
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
                <q-btn  color="secondary" @click="login()"label="Acessar" />
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
  import { mapGetters, mapMutations } from 'vuex'
  import { Dialog } from 'quasar'
  import { LocalStorage, SessionStorage } from 'quasar'

  export default {
        name: "login",
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
       created(){
          let email = SessionStorage.get.item("email")
          if (email != null){
            this.$router.push('/painel')
          }
       },
      computed : {
      ...mapGetters('usuario',[
          'getUsuarioLogado'
        ])
      },
      methods: {
        ...mapMutations('usuario',[
          'logar',
        ]),
        login(){
          this.$http.post('/usuario/login', {
              email: this.usuario.email,
              password: this.usuario.password,
          })
            .then(response => {
                let result = response.data.result.response
                let usuario = result.usuario
                if (usuario != null){
                  SessionStorage.set("email",usuario[0])
                  this.$router.push('/painel')
                }else{
                  Dialog.create(
                    {
                      title: 'Error',
                      message: "Email ou Senha inválida"
                    }
                  )
                }
            })
            .catch(e=>{
              console.log(e)
              Dialog.create(
                {
                  title: 'Error',
                  message: "Erro ao acessar o serviço"
                }
              )
            });
          }
      }
    }
</script>

<style scoped>

</style>
