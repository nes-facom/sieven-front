<template>
  <v-app>
    <div id="app">
        <v-row>
          <v-col>
            <barra-superior></barra-superior>
          </v-col>
        </v-row>

        <v-layout v-if="this.$store.getters.getLogado">
          <v-row>
            <v-col cols="2">
              <barra-lateral v-if="this.$store.getters.getLogado">
              </barra-lateral>
            </v-col>
            <v-col>
              <v-main>
                <router-view></router-view>
              </v-main>
            </v-col>
          </v-row>
        </v-layout>

        <v-layout v-else>
          <v-row class="mt-1">
            <v-col>
              <v-main>
                <router-view></router-view>
              </v-main>
            </v-col>
          </v-row>
        </v-layout>
    </div>
  </v-app>
</template>

<script>
import barraSuperior from '@/layout/barraSuperior.vue'
import barraLateral from '@/layout/barraLateral.vue'
export default {
  name: 'App',
  components: { barraSuperior, barraLateral },
  beforeCreate() {
    if (this.$store.getters.getLogado != true) {
      this.$router.push({ name: 'paginaInicial' })
    }
  }
}
</script>

<style>

</style>
