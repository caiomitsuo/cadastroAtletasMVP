import { formatDate } from 'src/utils/format'
function getCategoryField(row) {
  if (row.category_id === 32) {
    return 'Adulto Masculino'
  } else if (row.category_id === 31) {
    return 'Juvenil'
  } else {
    return row.category_id
  }
}
const columnsAtletas = [
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'apelido', align: 'left', label: 'Apelido', field: 'apelido', sortable: true },
  {
    name: 'category_id',
    align: 'left',
    label: 'Categoria',
    field: getCategoryField, // Use a função getCategoryField aqui
    sortable: true
  },
  { name: 'posicao', align: 'left', label: 'Posição', field: 'posicao', sortable: true },
  { name: 'posicao_secundaria', align: 'left', label: 'Posição Secundária', field: 'posicao_secundaria', sortable: true },
  { name: 'situacao', align: 'left', label: 'Situação', field: 'situacao', sortable: true },
  { name: 'data_nascimento', align: 'left', label: 'Data de Nascimento', field: 'data_nascimento', format: (val) => formatDate(val), sortable: false },
  { name: 'actions', align: 'right', label: 'Ação', field: 'actions', sortable: false }
]

export {
  columnsAtletas
}
