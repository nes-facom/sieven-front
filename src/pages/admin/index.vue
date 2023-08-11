<template>
  <div id="pgAdmin">
    <div id="qrCamera">
      <qrcode-stream @init="inicializar"
                     @decode="salvar">
      </qrcode-stream>
    </div>
    <h1>Resultado: {{ this.valor }}</h1>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader/src'
export default {
  name: "pgAdminIndex",
  components: { QrcodeStream },
  data() {
    return {
      valor: null
    }
  },
  methods: {
    salvar(resultado) {
      this.valor = resultado
    },
    async inicializar(promise) {
      try {
        // eslint-disable-next-line no-unused-vars
        const { capabilities } = await promise

      } catch (error) {
        if (error.name === 'NotAllowedError') {
          alert('Você precisa autorizar o uso da câmera')
        } else if (error.name === 'NotFoundError') {
          alert('Nenhuma câmera detectada no dispositivo')
        } else if (error.name === 'NotSupportedError') {
          alert('Navegador não suportou a requisição')
        } else if (error.name === 'NotReadableError') {
          alert('Câmera ja em uso')
        } else if (error.name === 'OverconstrainedError') {
          alert('Não há camera frontal')
        } else if (error.name === 'StreamApiNotSupportedError') {
          alert('Navegador não tem os recursos necessários')
        }
      } finally {
        // Usar para remover o loader
      }
    }
  }
}
</script>

<style scoped>
#qrCamera {
  width: 50%;
  height: 50%;
}
</style>