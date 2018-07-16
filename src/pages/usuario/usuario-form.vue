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
                <q-rating slot="subtitle" v-model="stars" :max="5" />
                <div slot="right" class="row items-center">
                  <q-icon name="people" />
                </div>
              </q-card-title>
              <q-card-main>
                <q-field
                  icon=""
                  helper=""
                >
                  <q-input v-model="model" float-label="Nome Completo" />
                </q-field><br>
                <q-field
                  icon=""
                  helper="">
                  <q-input v-model="model" float-label="Email" />
                </q-field><br>
                <q-input
                  v-model="text"
                  :error="error"
                  type="password"
                  :after="[
                          {
                            icon: 'warning',
                            error: true,
                            handler () {
                              alert()
                            }
                          }
                        ]"/>
              </q-card-main>

              <q-card-separator />
              <q-card-actions>
                <q-btn  color="secondary" disabled label="Cadastrar" />
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
    export default {
        name: "usuario-form",
        data(){
          return {
            model: null,
            star: 4
          }
        }
    }
</script>

<style scoped>

</style>
