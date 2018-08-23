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
            <q-item-side right ><q-btn round flat @click="remover_atividade(atividade)" color="red"  icon="remove_circle" /></q-item-side>
          </q-item>
        </slot>
        <q-item disabled >
          <q-item-main label="Total"/>
          <q-item-side>{{total}}</q-item-side>
          <q-item-side right ></q-item-side>
        </q-item>
      </q-list>
      <q-page-container>
        <div class="row">
          <div class="col-2"></div>
          <div class="col-2"><q-input  v-model="cupom"  stack-label="Inserir cupom" /></div>
          <div class="col-2"><q-btn @click="adicionar_cupom"  color="orange" label="Aplicar"/></div>
          <div class="col-3"></div>
          <div class="col-2"><q-btn @click="finalizar_compra"  color="secondary" label="Finalizar Compra"/></div>
        </div>
      </q-page-container>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import { LocalStorage, SessionStorage } from 'quasar'
  export default {
        name: "cart",
        props: ["opened"],
        error: true,
        warning:  false,
        data(){
          return {
              atividades: [],
              cupom: '',
              desconto: 0,
              total: 0,
              evento: null,
              usuario: null
          }
        },
        created(){
          this.atualiza()
          console.log(this.atividades)
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

        this.total = this.atividades.reduce(function (prevVal, elem) {
          return prevVal + elem.valor
        },0)

        let cupom = SessionStorage.get.item("cupom")
        if (cupom != null){
          this.desconto = cupom.desconto
          this.total -= (this.total * this.desconto)
        }


      },
      remover_atividade(atividade){
        this.$moment.remove_array(this.atividades, atividade)
        SessionStorage.set("cart",this.atividades)
        this.atualiza()
      },
      adicionar_cupom(){
        this.$http.get( '/cupom/aplicar/'+ this.cupom , {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
          .then(response => {
            if (response.data.result.status == "success"){
              this.$q.notify({
                message:response.data.result.msg ,
                timeout: 3000,
                type: 'positive',
                color: 'positive',
                textColor: 'white',
                icon: 'check'
              })
              let cupom = response.data.result.response.cupom
               SessionStorage.set("cupom",cupom)
               this.desconto = cupom.desconto
               this.total -= (this.total * this.desconto)
            }else{
              if (erros.length > 0){
                this.$q.notify({
                  message:response.data.result.msg ,
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
            this.$q.notify({
              message: "Cupom inválido ou já utilizado!" ,
              timeout: 3000,
              type: 'negative',
              color: 'red',
              textColor: 'white',
              icon: 'error'
            })
          });
      },

      preparar_ids_atividades(){
        let idAtividade = Array();
        for (let i = 0; i< this.atividades.length; i++ ) {
           idAtividade.push({"id": this.atividades[i].id})
           this.evento =  this.atividades[i].evento
        }
        return idAtividade;
      },
      get_dados_usuario(){
        this.$http.get( '/usuario/'+ SessionStorage.get.item("email"), {
        })
          .then(response => {
            this.usuario =  response.data.result.response.usuario

            this.teste()
            this.inscricao_cadastrar(this.usuario.id)

          })
          .catch(e=>{
            Dialog.create(
              {
                title: 'Error',
                message: "Não foi possível carregar os eventos"
              }
            )
          });
      },
      finalizar_compra(){
        let email = SessionStorage.get.item("email")
        if (email == null){
          this.$router.push('/acesso')
        }else{
            this.get_dados_usuario()
        }

      },
      teste(){
        let atividades = this.preparar_ids_atividades()
        console.log({
          "id": null,
          "desconto" : this.desconto,
          "atividades": atividades ,
          "evento": {"id": this.evento},
          "usuario": {"id": this.usuario.id}
        })
      },
      inscricao_cadastrar(usuario){
        let atividades = this.preparar_ids_atividades()
        this.$http.post( '/inscricao/cadastrar', {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          "id": null,
          "desconto" : this.desconto,
          "atividades": atividades ,
          "evento": {"id": this.evento},
          "usuario": {"id": this.usuario.id}
        })
          .then(response => {
              this.$q.notify({
                message: "Inscrição realizada com sucesso!",
                timeout: 3000,
                type: 'positive',
                color: 'positive',
                textColor: 'white',
                icon: 'check'
              })
            SessionStorage.remove("cupom")
            this.$router.push('/painel')

          })
          .catch(e=>{
            console.log(e)
          });
      }
    }
  }
</script>

<style scoped>

</style>
