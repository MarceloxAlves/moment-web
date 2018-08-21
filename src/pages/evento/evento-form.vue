<template>
  <div class="row">
    <div class="col s12">
      <q-card inline style="width: 100%">
        <q-card-title>
          Cadastro Evento
          <div slot="right" class="row items-center">
            <q-icon name="calendar" />
          </div>
        </q-card-title>
        <q-card-main>
          <q-field
            icon=""
            helper="">
            <q-input v-model="evento.descricao" float-label="Descrição" />
          </q-field><br>
            <q-datetime v-model="evento.dataInicio" format="DD/MM/YYYY"  :min="hoje" float-label="Data de início" type="date" />
            <q-datetime v-model="evento.dataTermino" format="DD/MM/YYYY"   :min="hoje" float-label="Data de término" type="date" /><br>

          <q-chips-input v-model="chips1" placeholder="Select from list or add new one" stack-label="List of countries" @duplicate="duplicate">
            <q-autocomplete @search="search" @selected="selected" />
          </q-chips-input>

        </q-card-main>

        <q-card-separator />
        <q-card-actions>
          <q-btn  color="secondary" @click="salvarEvento" label="Salvar" />
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
        name: "evento-form",
        props : ["usuario","eventoData"],
          data(){
          return{
            evento:{
              id: null,
              descricao: '',
              dataInicio: '',
              dataTermino: '',
              usuario:{
                "id": this.usuario.id
              }
            },
            chips1: ['Romania', 'Algeria'],
            DataInicio: null,
            hoje: new Date()
          }
        },
      created(){
        if (this.eventoData != null){
          this.evento =  this.eventoData
          this.DataInicio =  new Date(this.evento.dataInicio)
          let diff = date.getDateDiff(this.DataInicio, this.hoje, "days")
          console.log(diff)
        }
      },
      methods:{
        salvarEvento(){
          this.$http.post( '/evento/cadastrar', {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
            "id": this.evento.id,
            "descricao" : this.evento.descricao,
            "dataInicio": this.$moment.prepareDateReverse(this.evento.dataInicio),
            "dataTermino" : this.$moment.prepareDateReverse(this.evento.dataTermino),
            "usuario": this.evento.usuario
          })
            .then(response => {
                if (response.data.result.status == "success"){
                  this.$q.notify({
                    message: "Evento salvo com sucesso",
                    timeout: 3000,
                    type: 'positive',
                    color: 'positive',
                    textColor: 'white',
                    icon: 'check'
                  })
                  this.$emit('get-eventos')

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
        },
        search (terms, done) {
          setTimeout(() => {
            done(filter(terms, {field: 'value', list: [
                {label: "Marcelo", value: 1},
                {label: "Alves", value: 3},
                {label: "Pereria", value: 4}
                ]}))
          }, 1000)
        },
        selected (item) {
          this.$q.notify(`Selected suggestion "${item.label}"`)
        },
        duplicate (label) {
          this.$q.notify(`"${label}" already in list`)
        }
      }
    }
</script>

<style scoped>

</style>
