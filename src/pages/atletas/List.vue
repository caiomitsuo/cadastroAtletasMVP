<template>
  <q-page padding>
    <div class="row">
      <q-table title="Atletas" :rows="atletas" :columns="columnsAtletas" row-key="id" class="col-12" :loading="loading">
        <template v-slot:top>
          <span class="text-h6">
            Atletas
          </span>
          <q-space />
          <q-btn color="primary" label="Novo Atleta" icon="mdi-plus" :to="{ name: 'form-atletas' }" />
        </template>
        <template v-slot:body-cell-img_url="props">
          <q-td :props="props">
            <q-avatar :src="props.row.img_url" />
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
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { columnsAtletas } from './table'
export default defineComponent({
  name: 'ListaAtletas',
  setup() {
    const atletas = ref([])
    const loading = ref(true)
    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const router = useRouter()
    const $q = useQuasar()
    const table = 'atletas'
    const handleListAtletas = async () => {
      try {
        loading.value = true
        atletas.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (atletas) => {
      router.push({ name: 'form-atletas', params: { id: atletas.id } })
    }

    const handleRemoveAtletas = async (atletas) => {
      try {
        $q.dialog({
          title: 'Confirmar',
          message: `Você tem certeza que deseja deletar ${atletas.name} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, atletas.id)
          notifySuccess('Categoria deletada com sucesso!')
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
      handleEdit,
      handleRemoveAtletas
    }
  }
})
</script>
