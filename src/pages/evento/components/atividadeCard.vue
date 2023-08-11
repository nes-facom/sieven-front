<template>
  <div id="pgAtividadeCard">
    <v-card width="280"
            height="225"
            class="ma-2"
            style="border: 1px solid #097FA8;"
            outlined>
      <div class="pa-2 px-2 font-weight-medium"
           style="color: white; background-color: #097FA8;">
        <v-row>
          <v-col>
            {{ atividade.nome }}
          </v-col>
          <v-col cols="auto">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="white"
                        v-bind="attrs"
                        v-on="on">
                  {{ qualIconeModalidade(atividade.modalidade) }}
                </v-icon>
              </template>
              <span>
                {{ formatarPrimeiraLetraMaiusculo(atividade.modalidade) }}
              </span>
            </v-tooltip>
          </v-col>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-row>
        <v-col class="mt-3 ml-2 pb-0 d-flex align-center">
          <v-icon class="ml-1">
            mdi-map-marker-outline
          </v-icon>
          <span class="ml-2">
            {{ atividade.local }}
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="ml-2 py-0 pt-2 d-flex align-center">
          <v-icon class="ml-1">
            mdi-human-male-board
          </v-icon>
          <span class="ml-2">
            {{ atividade.palestrante }}
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="ml-2 pt-2 py-0 d-flex align-center">
          <v-icon class="ml-1">
            mdi-calendar-month-outline
          </v-icon>
          <span v-if="atividade.dataInicio == atividade.dataFim"
                class="ml-2">
                    {{ atividade.dataInicio }}
                    </span>
          <span v-else
                class="ml-2">
                    {{ atividade.dataInicio }} - {{ atividade.dataFim }}
                    </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="ml-2 pt-2 py-0 d-flex align-center">
          <v-icon class="ml-1">
            mdi-clock-time-four-outline
          </v-icon>
          <span class="ml-2">
                    {{ atividade.horaInicio }} - {{ atividade.horaFim }}
                    </span>
        </v-col>
      </v-row>
      <v-divider class="mt-6"
                 :style="'border-color: #097FA8;'">
      </v-divider>
      <v-row>
        <v-col :class="'mt-2 pr-0 pt-1 pb-0 ' + (!ehDistancia(atividade.modalidade) ? 'pl-0' : '') + ' d-flex justify-center'">
          <v-btn width="100%"
                 plain
                 disabled
                 style="color: black !important;">
            {{ textoStatus(atividade.status) }}
          </v-btn>
        </v-col>
        <v-divider v-if="ehDistancia(atividade.modalidade)"
                   class="mt-3"
                   :style="'border-color: #097FA8;'"
                   vertical>
        </v-divider>
        <v-col class="mt-2 pl-0 pt-1 pb-0 d-flex justify-center">
          <v-btn width="100%"
                 plain
                 @click="alert('oi')">
            Entrar
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "pgAtividadeCardIndex",
  methods: {
    textoStatus(status) {
      if (status == 'inscrito') {
        return 'Inscrito'
      } else if (status == 'presente') {
        return 'Presente'
      } else if (status == 'ausente') {
        return 'Ausente'
      }
    },
    qualIconeModalidade(modalidade) {
      if (modalidade == 'presencial') {
        return 'mdi-human-greeting'
      } else if (modalidade == 'distancia') {
        return 'mdi-laptop-account'
      }
    },
    formatarPrimeiraLetraMaiusculo(palavra) {
      return palavra.charAt(0).toUpperCase() + palavra.slice(1)
    },
    ehDistancia(modalidade) {
      return modalidade != 'presencial'
    }
  },
  props: {
    atividade: {
      required: true
    }
  }
}
</script>

<style>

</style>