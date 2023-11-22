<template>
  <div id="pgBarraLateral">
    <v-navigation-drawer class="mt-16"
                         :width="larguraBarraPorDispositivo()"
                         fixed
                         permanent
                         color="#0088B7">

      <v-list color="transparent"
              class="text-white">
        <v-list-item v-for="item in barraLateral"
                     :key="item.id"
                     link
                     @click="redirecionar(item.link)">
          <v-list-item-icon>
            <v-icon class="ml-3"
                    color="white"
                    size="30">
              {{ item.icone }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-subtitle-1 font-weight-bold"
                               style="color: white">
              {{ item.titulo }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "pgBarraLateralIndex",
  data() {
    return {
      barraLateral: [
        { id: 1, titulo: 'Eventos', icone: 'mdi-ticket-confirmation-outline', link: 'eventos' },
        { id: 2, titulo: 'Check-In', icone: 'mdi-qrcode-scan', link: 'checkin' },
        { id: 3, titulo: 'Relatório', icone: 'mdi-shield-crown-outline', link: 'registro' },
      ]
    }
  },
  methods: {
    redirecionar(nomeRota) {
      if (this.$route.name != nomeRota) {
        this.$router.push({ name: nomeRota })
      }
    },
    verificarDispositivoMovel() {
      var agentesUsuarioMovel = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      return agentesUsuarioMovel.test(navigator.userAgent)
    },
    larguraBarraPorDispositivo() {
      if (this.verificarDispositivoMovel()) {
        return 80
      } else {
        if (this.$vuetify.breakpoint.xl) {
          return 285
        } else if (this.$vuetify.breakpoint.lg) {
          return 210
        }
      }
    }
  }

}
</script>

<style>

</style>