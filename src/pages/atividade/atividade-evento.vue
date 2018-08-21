<template>
  <q-page-container style="padding: 10px;">
      <div class="container">
        <q-btn
          round
          color="primary"
          @click="novo = !novo; atividade = null"
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
          <q-breadcrumbs-el label="Atividades" />
        </q-breadcrumbs>

        <q-card>
          <q-card-title>
            {{evento.descricao}}
          </q-card-title>

          <q-card-separator />
        </q-card>

        <atividade-form v-if="novo" :evento="evento" :atividadebind="atividade" @get-atividades="onLoad" @cancelar="novo = false"></atividade-form>
        <q-table v-else
          title="Lista das atividades"
          :data="atividades"
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
            <q-td slot="body-cell-dataTermino" slot-scope="props" :props="props">
            {{onDateFormat(props.row.termino)}}
            </q-td>
            <q-td slot="body-cell-dataInicio" slot-scope="props" :props="props">
            {{onDateFormat(props.row.inicio)}}
            </q-td>

            <q-td slot="body-cell-HoraInicio" slot-scope="props" :props="props">
              {{onHoursFormat(props.row.inicio)}}
            </q-td>

            <q-td slot="body-cell-HoraTermino" slot-scope="props" :props="props">
              {{onHoursFormat(props.row.termino)}}
            </q-td>

          <q-td slot="body-cell-id" slot-scope="props" :props="props">
            <q-btn push color="blue-14" dense icon="edit"  @click="onEdit(props.row)"/>&nbsp;
            <q-btn push color="red-14" dense icon="remove" @click="" />
          </q-td>

        </q-table>


      </div>
  </q-page-container>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import AtividadeForm from "./atividade-form";
  import { date } from 'quasar'
    export default {
      name: "atividade-evento",
      components: {AtividadeForm},
      data(){
        return {
          evento: {
            descricao: ''
          },
          atividades: [],
          atividade: null,
          novo: false,
          columns: [
            { name: 'desc', required: true, label: 'Descrição', align: 'left', field: 'nome', sortable: true},
            { name: 'dataInicio', label: 'Data Início', align: 'left', field: 'inicio', sortable: true},
            { name: 'HoraInicio', label: 'Hora Início', align: 'left', field: 'inicio', sortable: true },
            { name: 'dataTermino', label: 'Data Término', align: 'left', field: 'termino', sortable: true},
            { name: 'HoraTermino', label: 'Hora Término', align: 'left', field: 'termino',sortable: true},
            { name: 'valor', label: 'Valor R$', align: 'right', field: 'valor'},
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
        this.atividades = this.evento.atividades
      },
      methods:{
        onLoad(){

        },
        onEdit(atividade){
          console.log(atividade)
          this.atividade =  atividade
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
