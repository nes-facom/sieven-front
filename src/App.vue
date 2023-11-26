<template>
  <v-app>
    <div id="app">
      <v-row>
        <v-col>
          <barra-superior></barra-superior>
        </v-col>
      </v-row>
      <template>
        <v-layout v-if="$store.getters.isAdmin">
          <v-row>
            <v-col class="d-flex" cols="12" md="2"> 
              <barra-lateral></barra-lateral>
            </v-col>
            <v-col class="d-flex" cols="12" md="10">
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
      </template>
    </div>
  </v-app>
</template>

<script>
import barraSuperior from "@/layout/barraSuperior.vue";
import barraLateral from "@/layout/barraLateral.vue";

export default {
  name: "App",
  components: { barraSuperior, barraLateral },
};
</script>

<style></style>
