<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p>
          Cadastro de Atletas
        </p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
        <q-input
          label="Image"
          type="file"
          stack-label
          v-model="img"
        />
        <q-input
          label="Name"
          v-model="form.name"
          :rules="[val => (val && val.length > 0) || 'Ops! Parece que falta algo.Nome requerido']"
          />
          <q-input
          label="Apelido"
          v-model="form.apelido"
          />
          <q-select v-model="form.posicao"
          :options="options"
          label="Posição"
          :rules="[val => (val && val.length > 0) || 'Ops! Parece que falta algo.Nome requerido']" />
          <q-input
            label="Rg"
            mask="##.###.###-#"
            v-model="form.rg"
            :rules="[val => !!val || 'Necessário Preencher o Rg']"
            />
          <q-input
            label="Cpf"
            mask="###.###.###-##"
            v-model="form.cpf"
            :rules="[val => !!val || 'Necessário Preencher o CPF']"
            />
          <q-input
            v-model="form.data_nascimento"
            type="date"
            label="Data de Nascimento"
            stack-label
            :rules="[val => !!val || 'Necessário Preencher a Data de Nascimento']"
            />
          <q-select v-model="form.category_id"
            :options="optionsCategory"
            label="Categoria"
            option-value="id"
            option-label="name"
            map-options
            emit-value/>
        <q-btn :label="isUpdate ? 'Atualizar' : 'Salvar' " color="primary" class="full-width" rounded type="submit" />
        <q-btn label="Cancelar" color="primary" class="full-width" rounded :to="{ name: 'atletas' }" />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import userApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'FormCategory',
  setup() {
    const table = 'atletas'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update, list, uploadImg } = userApi()
    const { notifyError, notifySuccess } = useNotify()
    const isUpdate = computed(() => route.params.id)
    let atletas = {}
    const optionsCategory = ref([])
    const form = ref({
      name: '',
      apelido: '',
      posicao: '',
      rg: '',
      cpf: '',
      data_nascimento: '',
      category_id: '',
      img_url: ''
    })
    const img = ref([])
    const model = ref([])

    onMounted(() => {
      handleGetListCategories()
      if (isUpdate.value) {
        handleGetAtletas(isUpdate.value)
      }
    })

    const handleGetListCategories = async () => {
      optionsCategory.value = await list('category')
    }
    const handleSubmit = async () => {
      try {
        if (img.value.length > 0) {
          const imgUrl = await uploadImg(img.value[0], 'Atletas')
          form.value.img_url = imgUrl
        }
        if (isUpdate.value) {
          await update(table, form.value)
          notifySuccess('Atleta atualizada com sucesso!')
        } else {
          await post(table, form.value)
          notifySuccess('Atleta cadastrada com sucesso!')
        }
        router.push({ name: 'atletas' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetAtletas = async (id) => {
      try {
        atletas = await getById(table, id)
        form.value = atletas
      } catch (error) {

      }
    }
    return {
      form,
      handleSubmit,
      isUpdate,
      optionsCategory,
      img,
      model,
      options: [
        'Pilar', 'Hooker', 'Segunda Linha', 'Asa', 'Oitavo', 'Half', 'Abertura', 'Ponta', 'Centro', 'Fullback'
      ]
    }
  }
})
</script>
