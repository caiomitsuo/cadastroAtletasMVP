<template>
  <q-page padding>
    <p class="text-h6">
      <q-form class="row justify-center" @submit.prevent="handleLogin">
        <p class="col-12 text-h5 text-center">Login</p>
        <div class="col-md4 col-sm-4 col-xs-10 q-gutter-y-m">
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
          <div class="full-width q-pt-md col-4">
            <div class="q-pb-md">
              <q-btn label="Login" color="primary" class="full-width" outlined size="lg" rounded type="submit" />
            </div>
            <q-btn
            label="Cadastro"
            class="full-width"
            flat
            size="md"
            to="/register"
             />
            <q-btn
            label="Esqueceu a Senha?"
            class="full-width"
            flat
            size="md"
            :to="{ name: 'forgot-password' }" />
          </div>
        </div>
      </q-form>
    </p>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'
export default defineComponent({
  name: 'PageLogin',
  setup() {
    const router = useRouter()
    const { login, isLoggedIn } = useAuthUser()
    const form = ref({
      email: '',
      password: ''
    })
    const { notifyError, notifySuccess } = useNotify()
    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: 'me' })
      }
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        notifySuccess('Login realizado com sucesso!')
        router.push({ name: 'atletas' })
      } catch (error) {
        notifyError(error.message)
      }
    }
    return {
      form,
      handleLogin
    }
  }
})
</script>
<style>
.teste{
  display: flex;
}
</style>
