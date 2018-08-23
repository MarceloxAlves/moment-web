<template>
  <q-page-container style="padding: 10px;">
      <div class="container">
        <q-btn
          round
          color="primary"
          @click="novo = !novo"
          class="fixed"
          icon="add"
          style="right: 18px; bottom: 18px; width: 50px; height: 50px; z-index: 1000 "
        />
        <q-breadcrumbs
          separator="/"
          active-color="secondary"
          color="light"
        >
          <q-breadcrumbs-el label="Home" to="/" />
          <q-breadcrumbs-el label="Eventos" to="/painel" />
          <q-breadcrumbs-el label="Cupons" />
        </q-breadcrumbs>

        <q-card>
          <q-card-title>
            {{evento.descricao}}
          </q-card-title>

          <q-card-separator />
        </q-card>

        <cupom-form v-if="novo" :evento="evento"  @get-cupons="listar_cupons" @cancelar="novo = false"></cupom-form>
        <q-table v-else
          title="Lista de cupons"
          :data="cupons"
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
            <q-btn-dropdown push color="blue-7" dense icon="share">
              <q-list link>
                <q-item v-close-overlay>
                  <q-item-side icon="share" inverted color="blue" />
                  <q-item-main>
                    <q-item-tile label>Facebook</q-item-tile>
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
  import CupomForm from "./cupom-form";
    export default {
      name: "atividade-evento",
      components: {CupomForm},
      data(){
        return {
          evento: {
            descricao: ''
          },
          cupons: [],
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
          this.evento  = this.$store.state.evento.eventoSelecionado
        if (this.evento == null){
          this.$router.push('/painel')
        }
       this.listar_cupons()
      },
      methods:{
        listar_cupons(){
          this.$http.get('/cupom/'+this.evento.id+'/cupons', {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          })
            .then(response => {
              this.cupons = response.data;
            })
            .catch(e=>{
              console.log(e)
            });
        },
        gerar_cupom(evento){
          this.novo = true;
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
