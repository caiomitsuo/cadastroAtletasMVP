<template>
  <q-page padding>
    <p class="text-h6">
      <q-form class="row justify-center" @submit.prevent="handleForgotPassowrd">
        <p class="col-12 text-h6 text-center">Recuperar Senha</p>
        <div class="col-md4 col-sm-6 col-xs-10 q-gutter-y-md">
          <q-input
          label="Email"
          outlined
          v-model="email"
          lazy-rules
            :rules="[val => (val && val.length > 0) || 'Ops! Parece que falta algo.Email requerido']"
          type="Email"
          />
          <div class="full-width q-pt-md q-gutter-y-sm">
            <q-btn label="Enviar email " color="primary" class="full-width" outlined rounded size="lg" type="submit" />
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
export default defineComponent({
  name: 'ForgotPassword',
  setup() {
    const { sendPasswordResetEmail } = useAuthUser()
    const email = ref('')
    const { notifyError, notifySuccess } = useNotify()

    const handleForgotPassowrd = async () => {
      try {
        await sendPasswordResetEmail(email.value)
        notifySuccess(`Link para recuperação de senha enviado para: ${email.value}`)
      } catch (error) {
        notifyError(error.message)
      }
    }
    return {
      email,
      handleForgotPassowrd
    }
  }
})
</script>
