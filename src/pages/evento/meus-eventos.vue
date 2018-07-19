<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <q-timeline color="secondary">
          <q-timeline-entry heading>
            Meus Eventos
          </q-timeline-entry>

          <slot v-for="evento in eventos">
              <q-timeline-entry   @click="detalhe"
                                  :title="evento.descricao"
                                  :subtitle="evento.data"
                                  icon="check"
                                  color="light"
                                  :atualiza="getSide()"
                                  :side="side.label"
              >
            <q-btn push label="Detalhes" color="green-6" dense icon="add" />&nbsp;
            <q-btn push label="Editar" color="green-6" dense icon="edit" />&nbsp;
            <q-btn push label="Arquivar" color="yellow-10" dense icon="archive" />
          </q-timeline-entry>
          </slot>

        </q-timeline>

      </q-page>
    </q-page-container>
  </q-layout>

</template>

<script>
  import { Dialog } from 'quasar'
    export default {
        name: "meus-eventos",
        data(){
          return {
            model: null,
            eventos: [
              {
                descricao: "EVENTO 3",
                status: 0,
                data: "2018-08-15"
              },
              {
                descricao: "EVENTO 2",
                status: 0,
                data: "2018-07-15"
              },
              {
                descricao: "EVENTO 1",
                status: 0,
                data: "2018-07-10"
              },

            ],
            side: {
              label: "right",
              value: 1
            }
          }
        },
      methods: {
        getSide(){
           this.side.value = this.side.value == 0 ? 1 : 0
           this.side.label = this.side.value == 0 ? 'left' : 'right'
        }

      }
    }
</script>

<style scoped>

</style>
