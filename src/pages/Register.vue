<template>
  <q-page padding>
    <p class="text-h6">
      <q-form class="row justify-center" @submit.prevent="handleRegister">
        <p class="col-12 text-h6 text-center">Registrar</p>
        <div class="col-md4 col-sm-6 col-xs-10 q-gutter-y-md">
          <q-input
          label="Name"
          outlined
          v-model="form.name"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Ops! Parece que falta algo.Nome requerido']"
          />
          <q-input
          label="Email"
          outlined
          v-model="form.email"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Ops! Parece que falta algo.Email requerido']"
          type="Email"
          />
          <q-input
          label="Password"
          outlined
          v-model="form.password"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Ops! Parece que falta algo.Senha requerida']"
          type="password"
          />
          <div class="full-width q-pt-md q-gutter-y-sm">
            <q-btn label="Cadastrar" color="primary" class="full-width" outlined rounded size="lg" type="submit" />
            <q-btn label="Voltar" color="dark" class="full-width" outlined rounded size="lg" :to="{ name: 'login' }" />
          </div>
        </div>
      </q-form>
    </p>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageRegister',
  setup() {
    const router = useRouter()
    const { register } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()
    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    const handleRegister = async () => {
      try {
        await register(form.value)
        notifySuccess()
        router.push({ name: 'email-confirmation', query: { email: form.value.email } })
      } catch (error) {
        notifyError(error.message)
      }
    }
    return {
      form,
      handleRegister
    }
  }
})
</script>
