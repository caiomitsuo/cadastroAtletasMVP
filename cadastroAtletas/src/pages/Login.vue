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
          <div class="full-width q-pt-md">
            <q-btn label="Esqueceu a Senha?" color="primary" class="full-width" outlined rounded size="lg"
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

export default defineComponent({
  name: 'PageLogin',
  setup() {
    const router = useRouter()
    const { login, isLoggedIn } = useAuthUser()
    const form = ref({
      email: '',
      password: ''
    })

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: 'me' })
      }
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        router.push({ name: 'me' })
        console.log('cliqei')
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
