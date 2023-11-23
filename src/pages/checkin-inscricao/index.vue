<template>
  <div id="pgCheckinInscricao">
    <v-container fluid>
      <v-row justify="center" align="center" class="mt-8">
        <v-col cols="12" sm="10" md="8">
          <v-divider class="mb-2 mt-8"></v-divider>
          <v-row justify="center" align="center" class="mb-2">
            <v-col>
              <p class="mb-2">{{ nomeDoEvento }}: {{ nomeDaAtividade }}</p>
              <v-divider class="mb-2"></v-divider>
              <p class="mb-2">Data: {{ dataDaAtividade }}</p>
              <p class="mb-2">Horário: {{ horarioDaAtividade }}</p>
              <p class="mb-2">Local: {{ localDaAtividade }}</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row justify="center" align="center">
        <v-col cols="12" sm="10" md="6">
          <div class="qrcode-card">
            <qrcode-stream width="100%" height="100%"
                          @init="inicializar"
                          @decode="salvar"
                          @detect="onDetect">
            </qrcode-stream>
          </div>
        </v-col>
      </v-row>

      <!-- Snackbar para mensagens de sucesso -->
      <v-snackbar v-model="snackbar.success" color="success">
        Check-in realizado com sucesso!
      </v-snackbar>

      <!-- Snackbar para mensagens de erro -->
      <v-snackbar v-model="snackbar.error" color="error">
        Não foi possível realizar seu check-in.
      </v-snackbar>

    </v-container>
  </div>
</template>




<script>
import { QrcodeStream } from 'vue-qrcode-reader/src'
import apiInscricao from '@/api/resources/inscricao.js'
import middleware from '@/middleware/localStorage.js'

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
      valor: null,
      snackbar: {
        success: false,
        error: false,
        info: false
      },
    };
  },
  methods: {
    salvar(resultado) {
      this.valor = resultado
    },
    onDetect(detectedCodes) {
      detectedCodes.then((result) => {
        const content = result.content;
        apiInscricao.checkin(content, middleware.recuperarToken('token').access_token).then((res) => {
          if(res.status === 200) {
            this.snackbar.success = true;
          } else if (res.status === 404) {
            this.snackbar.error = true;
          } else if (res.status === 400) {
            console.log('info')
            this.snackbar.info
          }
      
          this.snackbar.success = true;
        }).catch(() => {
          this.snackbar.error = true;
        });
      })
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




