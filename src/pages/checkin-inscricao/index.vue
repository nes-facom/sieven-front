<template>
  <div id="pgCheckinInscricao">
    <v-container fluid>
      <v-row justify="center" align="center" class="mt-md-8">
        <v-col cols="12" xs="12" sm="10" md="4">
          <v-divider class="mb-2 mt-md-8"></v-divider>
          <v-row justify="center" align="center" class="mb-2">
            <v-col>
              <p class="mb-2">{{ nomeDoEvento }} : {{ nomeDaAtividade }}</p>
              <v-divider class="mb-2"></v-divider>
              <p class="mb-2">Data: {{ dataDaAtividade }}</p>
              <p class="mb-2">Horário: {{ horarioDaAtividade }}</p>
              <p class="mb-2">Local: {{ localDaAtividade }}</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row justify="center" align="center">
        <v-col cols="12" xs="12" sm="6" md="4" style="border-style: dashed; height: 500px">
          <div class="qrcode-card">
            <qrcode-stream width="100%" height="100%"
                          @init="inicializar"
                          @decode="salvar">
            </qrcode-stream>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader/src'

export default {
  name: "pgCheckinInscricaoIndex",
  components: { QrcodeStream },
  data() {
    return {
      nomeDoEvento: "Meu Evento",
      nomeDaAtividade: "Minha Atividade",
      dataDaAtividade: "01/01/2023",
      horarioDaAtividade: "14:00 - 16:00",
      localDaAtividade: "Local X",
      valor: null
    };
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
};
</script>

<style scoped>


</style>




