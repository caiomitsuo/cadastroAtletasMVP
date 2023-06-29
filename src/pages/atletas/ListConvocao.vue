<template>
  <q-page padding>
    <div class="row">
      <q-table
      title="Atletas"
      :rows="atletas"
      :columns="columnsAtletasConvocados"
      row-key="id"
      class="col-12"
      :loading="loading"
      selection="multiple"
      v-model:selected="selected"
      :filter="filter"
      ref="tableRef"
      >
        <template v-slot:top>
          <span class="text-h6">
            Convocação de Atletas
          </span>
          <q-space />
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Pesquisar" class="q-mr-sm">
            <template v-slot:append>
              <q-icon name="mdi-magnify" />
            </template>
          </q-input>
          <q-btn color="secondary" icon-right="archive" label="Gerar Excel" no-caps @click="exportTable"/>
        </template>
        <template v-slot:body-cell-img_url="props">
          <q-td :props="props">
            <q-avatar v-if="props.row.img_url">
              <img :src="props.row.img_url" />
            </q-avatar>
            <q-avatar v-else color="grey" text-color="white" icon="mdi-image-off"/>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="handleEdit(props.row)">
              <q-tooltip>
                Editar
              </q-tooltip>
            </q-btn>
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemoveAtletas(props.row)">
              <q-tooltip>
                Deletar
              </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'
import { exportFile, useQuasar } from 'quasar'
import { columnsAtletasConvocados } from './tableConvocacao'
function wrapCsvValue (val, formatFn, row) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  return `"${formatted}"`
}
export default defineComponent({
  name: 'listaConvocacao',
  setup() {
    const atletas = ref([])
    const loading = ref(true)
    const filter = ref('')
    const selected = ref([])
    const tableRef = ref(null)
    const { listAtletasConvocacao } = useApi()
    const { notifyError } = useNotify()
    const { user } = useAuthUser()
    const router = useRouter()
    const $q = useQuasar()
    const table = 'atletas'
    const handleListAtletas = async () => {
      try {
        loading.value = true
        atletas.value = await listAtletasConvocacao(table, user.value.id)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (atletas) => {
      router.push({ name: 'form-atletas', params: { id: atletas.id } })
    }

    onMounted(() => {
      handleListAtletas()
    })

    return {
      columnsAtletasConvocados,
      atletas,
      loading,
      filter,
      handleEdit,
      selected,
      tableRef,
      exportTable () {
        const selectedRows = selected.value
        const filteredRows = atletas.value.filter(row => selectedRows.includes(row))
        const content = [columnsAtletasConvocados.map(col => wrapCsvValue(col.label))].concat(
          filteredRows.map(row => columnsAtletasConvocados.map(col => wrapCsvValue(
            typeof col.field === 'function'
              ? col.field(row)
              : row[col.field === void 0 ? col.name : col.field],
            col.format,
            row
          )).join(','))
        ).join('\r\n')

        const status = exportFile(
          'ListaConvocados.csv',
          content,
          'text/csv'
        )

        if (status !== true) {
          $q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning'
          })
        }
      }
    }
  }
})
</script>
