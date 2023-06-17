import { formatDate } from 'src/utils/format'

const columnsAtletas = [
  { name: 'img_url', align: 'left', label: 'Foto', field: 'img_url', sortable: false },
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'posicao', align: 'left', label: 'Posição', field: 'posicao', sortable: true },
  { name: 'cpf', align: 'left', label: 'CPF', field: 'cpf', sortable: true },
  { name: 'rg', align: 'left', label: 'RG', field: 'rg', sortable: true },
  { name: 'data_nascimento', align: 'left', label: 'Data de Nascimento', field: 'data_nascimento', format: (val) => formatDate(val), sortable: false },
  { name: 'actions', align: 'right', label: 'Ação', field: 'actions', sortable: false }
]

export {
  columnsAtletas
}
