<template>
  <q-page-container style="padding: 10px;">
      <div class="container">
        <q-table
          title="Minhas Inscrições"
          :data="inscricoes"
          :columns="columns"
          row-key="name"
        >

          <template slot="top-right" slot-scope="props">
            <q-btn color="secondary" flat label="Listagem de Eventos" @click="$router.push('/painel')" class="q-mr-sm" />
          </template>
          <template slot="top-selection" slot-scope="props">

            <q-btn color="secondary" flat label="Action 2" />
            <div class="col" />
            <q-btn color="negative" flat round delete icon="delete" @click="deleteRow" />
          </template>

            <q-td slot="body-cell-dataValidade" slot-scope="props" :props="props">
            {{onDateFormat(props.row.dataValidade)}}
            </q-td>

          <q-td slot="body-cell-Utilizado" slot-scope="props" :props="props">
            <q-chip v-if="props.row.utilizado"  tag color="red" icon-right="close">
              Utilizado
            </q-chip>
            <q-chip v-else  tag color="secondary" icon-right="check">
              Disponível
            </q-chip>
          </q-td>

          <q-td slot="body-cell-id" slot-scope="props" :props="props">
            <q-btn-dropdown push color="blue-7" dense icon="printer">
              <q-list link>
                <q-item v-close-overlay>
                  <q-item-side icon="share" inverted color="blue" />
                  <q-item-main>
                    <q-item-tile label>Imprimir Ingresso</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item v-close-overlay >
                  <q-item-side icon="share" inverted color="blue" />
                  <q-item-main>
                    <q-item-tile label>Google</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item v-close-overlay>
                  <q-item-side icon="share" inverted color="blue" />
                  <q-item-main>
                    <q-item-tile label>Whatsapp</q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>
            </q-btn-dropdown>&nbsp;
          </q-td>

        </q-table>
      </div>
  </q-page-container>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { date } from 'quasar'
    export default {
      name: "listagem-inscricao",
      data(){
        return {
          usuario: null,
          inscricoes: [],
          novo: false,
          columns: [
            { name: 'desc', required: true, label: 'Descrição', align: 'left', field: 'descricao', sortable: true},
            { name: 'desconto', label: 'Desconto', align: 'left', field: 'desconto', sortable: true},
            { name: 'codigo', label: 'Código', align: 'left', field: 'codigo', sortable: true},
            { name: 'dataValidade', label: 'Validade', align: 'left', field: 'dataValidade', sortable: true },
            { name: 'Utilizado', label: 'Utilizado', align: 'left', field: 'utilizado', sortable: true },
            { name: 'id', label: 'Ações', align: 'left', field: "id"},
          ],
        }
      },
      computed:
        {
          ...mapGetters('evento',[
            'getEventoSelecionado'
          ])
        },
      created(){
        this.get_dados_usuario()
      },
      methods:{
        get_dados_usuario(){
          this.$http.get( '/usuario/'+ SessionStorage.get.item("email"), {
          })
            .then(response => {
              this.usuario =  response.data.result.response.usuario
              this.listar_inscricoes()
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
        listar_inscricoes(){
          this.$http.get('/usuario/'+this.usuario.id +'/minhas-inscricoes/', {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          })
            .then(response => {
              this.inscricoes = response.data;
            })
            .catch(e=>{
              console.log(e)
            });
        },
        onDateFormat(data){
          return date.formatDate(new Date(this.$moment.prepareDate(data)), 'DD/MM/YYYY')
        },
        onHoursFormat(data){
          return date.formatDate(new Date(data), 'HH:mm')
        },
      }
    }
</script>

<style scoped>

</style>
