<template>
  <q-page padding>
    <p class="text-body1">
      Obrigado por se cadastrar graças a você o projeto tcc está saindo!
    </p>
    <p class="text-body1">
      Um email de confirmação foi enviado para você finalizar seu cadastro <strong> {{ $route.query.email }} </strong>
    </p>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailConfirmation'
})
</script>
