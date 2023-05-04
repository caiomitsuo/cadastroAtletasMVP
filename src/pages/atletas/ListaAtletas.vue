<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Atletas"
        :rows="rows"
        :columns="columns"
        row-key="id"
        class="col-12"
      >
      <template v-slot:top>
        <span class="text-h6">
          Categorias dos Atletas
        </span>
        <q-space/>
        <q-btn color="primary" label="Nova Categoria" icon="mdi-plus" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-x-sm">
          <q-btn icon="mdi-pencil-outline" color="info" dense size="sm">
            <q-tooltip>
              Editar
            </q-tooltip>
          </q-btn>
          <q-btn icon="mdi-delete-outline" color="negative" dense size="sm">
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
const columns = [
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'actions', align: 'right', label: 'Ação', field: 'actions', sortable: true }
]

const rows = [
  {
    id: '1',
    name: 'Teste'
  }
]
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ListaAtletas',
  setup () {
    return {
      columns,
      rows
    }
  }
})
</script>
