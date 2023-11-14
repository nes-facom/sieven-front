<!-- <template>
  <div id="pgValidador">
    <qrcode-vue :value="identificador"
                size="500">
    </qrcode-vue>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
export default {
  name: "pgValidadorIndex",
  components: { QrcodeVue },
  data() {
    return {
      identificador: 'error'
    }
  }
}
</script>

<style>

</style> -->

<template>
  <div>
    <v-container>
      <div class="search-section">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="searchTerm" label="Pesquisar por evento, atividade ou local" outlined
              append-icon="mdi-magnify" @input="filterActivities"></v-text-field>
          </v-col>
          <v-col cols="6" sm="2">
            <v-text-field v-model="dateFilter" label="Data" outlined append-icon="mdi-calendar"
              @input="filterActivities"></v-text-field>
          </v-col>
          <v-col cols="6" sm="2">
            <v-text-field v-model="timeFilter" label=" Horário" outlined append-icon="mdi-clock"
              @input="filterActivities"></v-text-field>
          </v-col>
          <v-col cols="6" sm="2">
            <v-btn style="width: 100%; height:63%">Buscar</v-btn>
          </v-col>
        </v-row>
      </div>
      <div class="activity-cards">
        <v-row>
          <v-col cols="12">
            <div v-for="(activity, id) in activities" :key="id" class="activity-card mb-4">
              <v-card>
                <v-card-title class="text-h6">{{ activity.nome }}</v-card-title>
                <v-card-text>
                  <div><strong>Nome do Evento:</strong> {{ activity.nome }}</div>
                  <div><strong>Local:</strong> {{ activity.local }}</div>
                  <div><strong>Data:</strong> {{ (activity.horario_inicio) }}</div>
                  <div><strong>Horário:</strong> {{ activity.horario_inicio }}</div>
                  <v-card-actions class="justify-end">
                    <div align="center"><v-btn class="mr-3" color="primary" @click="redirecionaCheckin(activity.id)">Realizar Check-In</v-btn></div>
                    <div align="center"><v-btn class="mr-3" color="error" @click="buttonClicked">Finalizar Check-In</v-btn></div>
                  </v-card-actions>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>


<script>
import apiAtividades from '@/api/resources/atividade.js'
import middleware from '@/middleware/localStorage.js'
export default {
  name: "CheckInpage",
  data() {
    return {
      activities: [],
    };
  },
  methods: {
    carregaAtividades() {
      apiAtividades.listarAtividadesCheckin(middleware.recuperarToken('token').access_token).then( (response) => {
        this.activities = response
        console.log(this.activities)
      })
    },
    redirecionaCheckin(idAtividade) {
      this.$router.push({ name: 'checkin-atividade', params: { id: idAtividade } })
    }
  },

  mounted() {
    this.carregaAtividades()
  }
};
</script>
