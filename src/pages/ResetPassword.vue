<template>
  <q-page padding>
    <p class="text-h6">
      <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
        <p class="col-12 text-h6 text-center">Recuperar Senha</p>
        <div class="col-md4 col-sm-6 col-xs-10 q-gutter-y-md">
          <q-input
          label="Nova senha"
          outlined
          v-model="password"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Ops! Parece que falta algo.Senha requerida']"
          type="password"
          />
          <div class="full-width q-pt-md q-gutter-y-sm">
            <q-btn label="Recuperar Senha " color="primary" class="full-width" outlined rounded size="lg" type="submit" />
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
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  name: 'ResetPassword',
  setup() {
    const { resetPassword } = useAuthUser()
    const route = useRoute()
    const router = useRouter()
    const token = route.query.token
    const { notifyError, notifySuccess } = useNotify()
    const password = ref('')

    const handlePasswordReset = async () => {
      try {
        await resetPassword(token, password.value)
        notifySuccess('Senha alterada com sucesso!')
        router.push({ name: 'login' })
      } catch (error) {
        notifyError(error.message)
      }
    }
    return {
      password,
      handlePasswordReset
    }
  }
})
</script>
