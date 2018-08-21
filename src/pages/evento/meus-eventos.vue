<template>
  <q-layout>
    <q-page-container>
      <q-btn
        round
        color="primary"
        @click="novo = !novo; evento = null"
        class="fixed"
        :icon="iconFab"
        style="right: 18px; bottom: 18px; width: 50px; height: 50px; z-index: 1000 "
      />
      <evento-form v-if="novo" :usuario="usuario" :eventoData="evento"  @get-eventos="getDadosUsuario" @cancelar="novo = false" ></evento-form>
      <q-table v-else
               title="Listagem dos meus eventos"
               :data="eventos"
               :columns="columns"
               row-key="name"
      >
        <q-td slot="body-cell-dataTermino" slot-scope="props" :props="props">
          {{onDateFormat(props.row.dataTermino)}}
        </q-td>
        <q-td slot="body-cell-dataInicio" slot-scope="props" :props="props">
          {{onDateFormat(props.row.dataInicio)}}
        </q-td>

        <q-td slot="body-cell-id" slot-scope="props" :props="props">
          <q-btn  color="blue-6" dense label="Inscritos" @click="onInscritos(props.row)" title="Inscritos" />&nbsp;
          <q-btn  color="green-6" dense label="atividades" @click="onAtividade(props.row)" title="Adicionar Atividade" />&nbsp;
          <q-btn push color="blue-14" dense icon="edit"  @click="onEdit(props.row)"/>&nbsp;
          <q-btn push color="red-14" dense icon="remove" @click="onDelete(props.row.id)" />
        </q-td>

      </q-table>
    </q-page-container>

  </q-layout>

</template>

<script>
  import { Dialog } from 'quasar'
  import { LocalStorage, SessionStorage } from 'quasar'
  import { date } from 'quasar'
  import EventoForm from "./evento-form";
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: "meus-eventos",
      components: {EventoForm},
      data(){
          return {
            model: null,
            iconFab: "add",
            eventos: [],
            evento: null,
            right: "right",
            usuario: null,
            novo: false,
            direita: false,
            columns: [
              { name: 'desc', required: true, label: 'Descrição', align: 'left', field: 'descricao', sortable: true},
              { name: 'dataInicio', label: 'Data Início', align: 'left', field: 'dataInicio' },
              { name: 'dataTermino', label: 'Data Término', align: 'left', field: 'dataTermino'},
              { name: 'situacao', label: 'Situação', align: 'left', field: row => row.estadoEvento.estado},
              { name: 'id', label: 'Ações', align: 'left', field: "id"},
            ],
          }
        },
      watch:{
        direita: function (o,v) {
          console.log(this.right)
          this.right = direita ? "right" : "left";
        }
      },
      created(){
        this.getDadosUsuario();
      },
      methods: {
        ...mapMutations('evento',[
          'setEventoSelecionado',
        ]),
        getDadosUsuario(){
          this.$http.get( '/usuario/'+ SessionStorage.get.item("email"), {
          })
            .then(response => {
                this.usuario =  response.data.result.response.usuario
                this.eventos =  this.usuario.eventos

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
        onEdit(evento){
          this.evento =  evento
          this.evento.dataInicio =  this.$moment.prepareDate(this.evento.dataInicio);
          this.evento.dataTermino =  this.$moment.prepareDate(this.evento.dataTermino);
          Object.defineProperty(this.evento, "usuario", {
            value: {"id": this.usuario.id},
            writable: true,
            enumerable: true,
            configurable: true
          });

          this.novo =  true
        },
        onDelete(id){
          this.$http.delete( '/evento/delete/'+ id, {
          })
            .then(response => {
              if (response.data.result.status == "success"){
                this.$q.notify({
                  message: response.data.result.response.msg,
                  timeout: 3000,
                  type: 'positive',
                  color: 'positive',
                  textColor: 'white',
                  icon: 'check'
                })
                this.getDadosUsuario();
              }else{
                let erros =  response.data.result.response.erros
                if (erros.length > 0){
                  this.$q.notify({
                    message:response.data.result.response.msg,
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
              Dialog.create(
                {
                  title: 'Error',
                  message: "Não foi possível fazer esta operação"
                }
              )
            });
        },
        onDateFormat(data){
          return date.formatDate(new Date(this.$moment.prepareDate(data)), 'DD/MM/YYYY')
        },
        onAtividade(evento){
          this.setEventoSelecionado(evento)
          this.$router.push('/evento/atividade-evento')
        },
        onInscritos(evento){
          this.setEventoSelecionado(evento)
          this.$router.push('/evento/inscritos')
        }

      }
    }
</script>

<style scoped>

</style>
