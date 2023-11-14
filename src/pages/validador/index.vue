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
            <div v-for="(activity, index) in activities" :key="index" class="activity-card mb-4">
              <v-card>
                <v-card-title class="text-h6">{{ activity.title }}</v-card-title>
                <v-card-text>
                  <div><strong>Nome do Evento:</strong> {{ activity.eventName }}</div>
                  <div><strong>Local:</strong> {{ activity.location }}</div>
                  <div><strong>Data:</strong> {{ (activity.date) }}</div>
                  <div><strong>Horário:</strong> {{ activity.time }}</div>
                  <v-card-actions class="justify-end">
                    <div align="center"><v-btn color="primary" @click="buttonClicked">Botão</v-btn></div>
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
export default {
  name: "CheckInpage",
  data() {
    return {
      activities: [
        {
          title: 'Atividade 1',
          eventName: 'Evento 1',
          location: 'Local 1',
          date: '2023-11-15',
          time: '10:00 AM',
        },
        {
          title: 'Atividade 2',
          eventName: 'Evento 2',
          location: 'Local 2',
          date: '2023-11-16',
          time: '2:00 PM',
        },
        {
          title: 'Atividade 3',
          eventName: 'Evento 3',
          location: 'Local 3',
          date: '2023-11-17',
          time: '4:30 PM',
        },
      ],
    };
  },
};
</script>
