<template>
  <div class="row">
    <div class="col s12">
      <q-card inline style="width: 100%">
        <q-card-title>
          Cadastro Atividade
          <div slot="right" class="row items-center">
            <q-icon name="calendar" />
          </div>
        </q-card-title>
        <q-card-main>
          <q-field
            icon=""
            helper="">
            <q-input v-model="atividade.nome" float-label="Descrição" />
          </q-field><br>
            <q-datetime v-model="atividade.inicio" format="DD/MM/YYYY HH:mm"  :min="hoje" float-label="Data de início" type="datetime" /><br>
            <q-datetime v-model="atividade.termino" format="DD/MM/YYYY HH:mm"   :min="hoje" float-label="Data de término" type="datetime" /><br>
          <q-input v-model="atividade.valor" type="number" prefix="R$" stack-label="Valor" /><br>
          <q-select
            float-label="Tipo Atividade"
            v-model="atividade.tipoAtividade.id"
            :options="selectOptions"
          />

        </q-card-main>

        <q-card-separator />
        <q-card-actions>
          <q-btn  color="secondary" @click="salvarAtividade" label="Salvar" />
          <q-btn  color="orange" @click="onCancel" label="Voltar" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
  import { Dialog } from 'quasar'
  import { date } from 'quasar'
  export default {
        name: "atividade-form",
        props : ["evento","atividadebind"],
          data(){
          return{
            atividade:{
              id: null,
              nome: '',
              inicio: '',
              termino: '',
              tipoAtividade: {
                id : null
              },
              valor: null,
            },
            selectOptions: [],
            hoje: new Date()
          }
        },
      created(){
        if (this.atividadebind != null){
          this.atividade =  this.atividadebind
        }
        this.onTipoAtividade()
      },
      methods:{
        onTipoAtividade(){
          this.$http.get( '/atividade/listar-tipos', {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          })
            .then(response => {
              this.selectOptions = response.data.map(function (row) {
                  Object.defineProperty(row, 'value', {
                    value: row.id,
                    writable: true,
                    enumerable: true,
                    configurable: true
                  }),
                    Object.defineProperty(row, 'label', {
                      value: row.nome,
                      writable: true,
                      enumerable: true,
                      configurable: true
                    })
                  return row
                })
            })
        },
        salvarAtividade(){
          this.$http.post( '/atividade/cadastrar', {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
            "id": this.atividade.id,
            "nome" : this.atividade.nome,
            "inicio": date.formatDate(new Date(this.atividade.inicio),'YYYY-MM-DD HH:mm:ss'),
            "termino" : date.formatDate(new Date(this.atividade.termino),'YYYY-MM-DD HH:mm:ss'),
            "tipoAtividade": this.atividade.tipoAtividade,
            "valor" : this.atividade.valor,
            "evento": {"id": this.evento.id}
          })
            .then(response => {
                if (response.data.result.status == "success"){
                  this.$q.notify({
                    message: "Atividade salva com sucesso",
                    timeout: 3000,
                    type: 'positive',
                    color: 'positive',
                    textColor: 'white',
                    icon: 'check'
                  })
                  this.$emit('get-atividades')

                }else{
                  let erros =  response.data.result.response.erros
                  if (erros.length > 0){
                    this.$q.notify({
                      message: erros[0].defaultMessage,
                      timeout: 3000,
                      type: 'negative',
                      color: 'red',
                      textColor: 'white',
                      icon: 'error'
                    })
                  }
                }
            })
            .catch(e=>{
                console.log(e)
            });
        },
        onCancel(){
          this.$emit('cancelar')
        }
      }
    }
</script>

<style scoped>

</style>
