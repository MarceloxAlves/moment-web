<template>
  <div class="row">
    <div class="col s12">
      <q-card inline style="width: 100%">
        <q-card-title>
          Cadastro Cupom
          <div slot="right" class="row items-center">
            <q-icon name="calendar" />
          </div>
        </q-card-title>
        <q-card-main>
          <q-field
            icon=""
            helper="">
            <q-input v-model="cupom.nome" float-label="Descrição" />
          </q-field><br>
            <q-datetime v-model="cupom.dataValidade" format="DD/MM/YYYY"  :min="hoje" float-label="Data de Validade" type="date" /><br>
          <q-input v-model="cupom.desconto" type="number" suffix="%" max-lenght="3" placeholder="10" stack-label="Desconto" /><br>
          <q-input v-model="quantidade" type="number" stack-label="Quantidade" /><br>

        </q-card-main>

        <q-card-separator />
        <q-card-actions>
          <q-btn  color="secondary" @click="gerar_cupom" label="Gerar Cupons" />
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
        name: "cupom-form",
        props : ["evento"],
          data(){
          return{
            cupom:{
              id: null,
              nome: '',
              dataValidade: '',
              evento: {
                id : null
              },
              desconto: 0,
            },
            quantidade: 1,
            hoje : new Date()
          }
        },
      watch:{
        quantidade: function (newValue, oldValue) {
          this.quantidade =  parseInt(newValue);
            if (newValue < 0){
              this.quantidade = 1
            }
        }
      },
      created(){
        if (this.evento == null){
          this.$router.push('/painel')
        }
        this.cupom.evento.id = this.evento.id;
        this.cupom.dataValidade = this.$moment.prepareDate(this.evento.dataInicio);
      },
      methods:{
        gerar_cupom(){
          console.log(this.cupom.nome)
          this.$http.post( '/cupom/cadastrar/'+this.quantidade, {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
            "id": null,
            "descricao" : this.cupom.nome,
            "dataValidade" : this.$moment.prepareDateReverse(this.cupom.dataValidade),
            "desconto": this.cupom.desconto / 100,
            "evento": this.cupom.evento
          })
            .then(response => {
                if (response.data.result.status == "success"){
                  this.$q.notify({
                    message: this.quantidade + " cupom gerados com sucesso",
                    timeout: 3000,
                    type: 'positive',
                    color: 'positive',
                    textColor: 'white',
                    icon: 'check'
                  })
                  this.$emit('get-cupons')

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
