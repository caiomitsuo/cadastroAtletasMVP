<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p>
          Cadastro de Atletas
        </p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
        <q-input label="Name" v-model="form.name"
          :rules="[val => (val && val.length > 0) || 'Ops! Parece que falta algo.Nome requerido']" />
          <q-input label="Rg" v-model="form.rg"/>
          <q-input label="Cpf" v-model="form.cpf"/>
          <q-select v-model="form.category.id"
          :options="optionsCategory"
          label="Category"
          option-value="id"
          option-label="name"/>
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
    const { post, getById, update } = userApi()
    const { notifyError, notifySuccess } = useNotify()
    const isUpdate = computed(() => route.params.id)
    let category = {}
    const form = ref({
      name: '',
      rg: '',
      cpf: ''
    })

    onMounted(() => {
      if (isUpdate.value) {
        handleGetCategory(isUpdate.value)
      }
    })
    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          await update(table, form.value)
          notifySuccess('Categoria atualizada com sucesso!')
        } else {
          await post(table, form.value)
          notifySuccess('Categoria cadastrada com sucesso!')
          router.push({ name: 'category' })
        }
        router.push({ name: 'atletas' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetCategory = async (id) => {
      try {
        category = await getById(table, id)
        form.value = category
      } catch (error) {

      }
    }
    return {
      form,
      handleSubmit,
      isUpdate
    }
  }
})
</script>
