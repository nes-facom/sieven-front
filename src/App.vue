<template>
  <v-app>
    <div id="app">
        <v-row>
          <v-col>
            <barra-superior></barra-superior>
          </v-col>
        </v-row>
        
      <RouterView />
        
    </div>
  </v-app>
</template>

<script>
import barraSuperior from '@/layout/barraSuperior.vue'
//import barraLateral from '@/layout/barraLateral.vue'
export default {
  name: 'App',
  components: { barraSuperior },
}
</script>

<style>

</style>
