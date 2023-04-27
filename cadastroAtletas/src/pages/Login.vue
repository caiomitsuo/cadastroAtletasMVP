<template>
  <q-page padding>
    <p class="text-h6">
      <q-form class="row justify-center" @submit.prevent="handleLogin">
        <p class="col-12 text-h6 text-center">Login</p>
        <div class="col-md4 col-sm-6 col-xs-10 q-gutter-y-md">
          <q-input label="Email" outlined v-model="form.email" />
          <q-input label="Password" outlined v-model="form.password" />
          <div class="full-width q-pt-md">
            <q-btn label="Login" color="primary" class="full-width" outlined rounded size="lg" type="submit" />
          </div>
          <div class="full-width q-pt-md">
            <q-btn label="Cadastro" color="primary" class="full-width" outlined rounded size="lg" to="/register" />
          </div>
        </div>
      </q-form>
    </p>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageLogin',
  setup() {
    const router = useRouter()
    const { login } = useAuthUser()
    const form = ref({
      email: '',
      password: ''
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        router.push({ name: 'me' })
      } catch (error) {
        alert(error.message)
      }
    }
    return {
      form,
      handleLogin
    }
  }
})
</script>
