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
              append-icon="mdi-magnify" @input="buscarAtividades"></v-text-field>
          </v-col>
          <v-col cols="6" sm="2">
            <v-text-field v-model="dateFilter" label="Data" outlined append-icon="mdi-calendar"
              @input="buscarAtividades"></v-text-field>
          </v-col>
          <v-col cols="6" sm="2">
            <v-text-field v-model="timeFilter" label=" Horário" outlined append-icon="mdi-clock"
              @input="buscarAtividades"></v-text-field>
          </v-col>
          <v-col cols="6" sm="2">
            <v-btn style="width: 100%; height:63%" @click="buscarAtividades">Buscar</v-btn>
          </v-col>
        </v-row>
      </div>
      <div class="activity-cards">
        <v-row>
          <v-col cols="12">
            <div v-for="(activity, id) in filteredActivities" :key="id" class="activity-card mb-4">
              <v-card>
                <v-card-title class="text-h6">{{ activity.nome }}</v-card-title>
                <v-card-text>
                  <div><strong>Nome do Evento:</strong> {{ activity.nome }}</div>
                  <div><strong>Local:</strong> {{ activity.local }}</div>
                  <div><strong>Data:</strong> {{ (activity.horario_inicio) }}</div>
                  <div><strong>Horário:</strong> {{ activity.horario_inicio }}</div>
                  <v-card-actions class="justify-end">
                    <div align="center"><v-btn class="mr-3" color="primary" @click="gerarRelatorio(activity.id)">Emitir Relatorio</v-btn></div>
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
import { saveAs } from 'file-saver';

export default {
  name: "CheckInpage",
  data() {
    return {
      activities: [],
      searchTerm: '',
      dateFilter: '',
      timeFilter: '',
    };
  },
  computed: {
    filteredActivities() {
      return this.activities.filter(activity => {
        const nomeMatch = activity.nome && activity.nome.toLowerCase().includes(this.searchTerm.toLowerCase());
        const dataMatch = activity.horario_inicio && activity.horario_inicio.includes(this.dateFilter);
        const horarioMatch = activity.horario_inicio && activity.horario_inicio.includes(this.timeFilter);

        return nomeMatch && dataMatch && horarioMatch;
      });
    },
  },
  methods: {
    carregaAtividades() {
      apiAtividades.listarAtividadesCheckin(middleware.recuperarToken('token').access_token).then((response) => {
        this.activities = response;
      });
    },
    gerarRelatorio(atividadeId){
      apiAtividades.gerarRelatorio(middleware.recuperarToken('token').access_token, atividadeId).then((response) => {
        if (response && response.data) {
        const blob = new Blob([response.data], { type: 'text/csv' });
        saveAs(blob, `relatorio_atividade_${atividadeId}.csv`);
      } else {
        console.error('Erro ao gerar o relatório: resposta vazia ou sem dados');
      }
        })
        .catch((error) => {
          console.error('Erro ao gerar o relatório:', error);
      });

    },

  },
  watch: {
    // Assista a mudanças nos campos de pesquisa e carregue atividades filtradas
    searchTerm: 'carregaAtividades',
    dateFilter: 'carregaAtividades',
    timeFilter: 'carregaAtividades',
  },
  mounted() {
    // Carregue as atividades ao iniciar o componente
    this.carregaAtividades();
  },
};

</script>
