<template>
  <q-page padding>
    <div class="row">
      <q-table title="Atletas" :rows="atletas" :columns="columnsAtletas" row-key="id" class="col-12" :loading="loading" :filter="filter">
        <template v-slot:top>
          <span class="text-h6">
            Atletas
          </span>
          <q-space />
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Pesquisar" class="q-mr-sm">
            <template v-slot:append>
              <q-icon name="mdi-magnify" />
            </template>
          </q-input>
          <q-btn color="primary" label="Novo Atleta" icon="mdi-plus" :to="{ name: 'form-atletas' }" />
          <q-btn color="secondary" icon-right="archive" label="Export to csv" no-caps @click="teste"/>
        </template>
        <template v-slot:body-cell-img_url="props">
          <q-td :props="props">
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
import { columnsAtletas } from './table'
function wrapCsvValue (val, formatFn, row) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}
export default defineComponent({
  name: 'ListaAtletas',
  setup() {
    const atletas = ref([])
    const loading = ref(true)
    const filter = ref('')
    const { listPublic, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const { user } = useAuthUser()
    const router = useRouter()
    const $q = useQuasar()
    const table = 'atletas'
    const handleListAtletas = async () => {
      try {
        loading.value = true
        atletas.value = await listPublic(table, user.value.id)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (atletas) => {
      router.push({ name: 'form-atletas', params: { id: atletas.id } })
    }
    const teste = () => {
      console.log('teste')
      notifyError('feature em desenvolvimento')
    }

    const handleRemoveAtletas = async (atletas) => {
      try {
        $q.dialog({
          title: 'Confirmar',
          message: `Você tem certeza que deseja excluir ${atletas.name} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, atletas.id)
          notifySuccess('Atleta excluido com sucesso!')
          handleListAtletas()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }
    onMounted(() => {
      handleListAtletas()
    })

    return {
      columnsAtletas,
      atletas,
      loading,
      filter,
      handleEdit,
      teste,
      handleRemoveAtletas,
      exportTable () {
        const content = [columnsAtletas.map(col => wrapCsvValue(col.label))].concat(
          atletas.value.map(row => columnsAtletas.map(col => wrapCsvValue(
            typeof col.field === 'function'
              ? col.field(row)
              : row[col.field === void 0 ? col.name : col.field],
            col.format,
            row
          )).join(','))
        ).join('\r\n')

        const status = exportFile(
          'table-export.csv',
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
