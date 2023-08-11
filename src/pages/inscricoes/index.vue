<template>
  <div id="pgInscricoes">
    <v-row class="mt-4">
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="(evento, index) in eventos"
                           :key="index">
          <v-expansion-panel-header>
            <v-icon class="mr-3"
                    :color="estaNoHorario(evento) ? '#097FA8' : 'grey'">
              mdi-circle
            </v-icon>
            <v-card-text class="pa-0">
              {{ evento.nome }}
            </v-card-text>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-card v-for="atividade in evento.atividades"
                      :key="atividade.id"
                      width="280"
                      height="225"
                      class="ma-2"
                      :style="'border: 1px solid ' + qualCorAtividadeStatus(atividade.status)"
                      outlined>
                <div class="pa-2 px-2 font-weight-medium"
                     :style="'color: white; background-color: ' + qualCorAtividadeStatus(atividade.status)">
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
                        <span>{{ formatarPrimeiraLetraMaiusculo(atividade.modalidade) }}</span>
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
                           :style="'border-color: ' + qualCorAtividadeStatus(atividade.status)">
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
                             :style="'border-color: ' + qualCorAtividadeStatus(atividade.status)"
                             vertical>
                  </v-divider>
                  <v-tooltip bottom
                             v-if="!estaNoHorario(atividade)">
                    <template v-slot:activator="{ on, attrs }">
                      <v-col v-if="ehDistancia(atividade.modalidade)"
                             v-bind="attrs"
                             v-on="on"
                             class="mt-2 pl-0 pt-1 pb-0 d-flex justify-center">
                        <v-btn width="100%"
                               plain
                               disabled
                               :color="qualCorAtividadeStatus(atividade.status)">
                          Entrar
                        </v-btn>
                      </v-col>
                    </template>
                    <span>
                        Aguarde o horario da atividade para entrar na sala
                      </span>
                  </v-tooltip>
                  <v-col v-else-if="ehDistancia(atividade.modalidade)"
                         v-bind="attrs"
                         v-on="on"
                         class="mt-2 pl-0 pt-1 pb-0 d-flex justify-center">
                    <v-btn width="100%"
                           plain
                           :disabled="!estaNoHorario(atividade)"
                           :color="qualCorAtividadeStatus(atividade.status)"
                           @click="entrarNaAtividade(atividade)">
                      Entrar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "pgInscricoesIndex",
  data() {
    return {
      eventos: [
        {
          id: 1,
          status: 'inscrito',
          nome: 'XV Congresso de Software da America Latina',
          dataInicio: '21/05/2023',
          dataFim: '21/05/2023',
          horaInicio: '13:00',
          horaFim: '17:00',
          atividades: [
            { id: 1, status: 'inscrito', nome: 'Palestra sobre DevOps', descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano. Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.', local: 'Auditório 1 - Facom', modalidade: 'presencial', dataInicio: '21/05/2023', dataFim: '21/05/2023', horaInicio: '13:00', horaFim: '17:00', palestrante: 'Dr.Awdren Fontão', acessibilidade: 'O auditório conta com piso tátil e a palestra possui intrérprete de Libras', sala: null, dialog: false },
            { id: 2, status: 'inscrito', nome: 'Palestra sobre DevOps', descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano. Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.', local: 'Auditório 1 - Facom', modalidade: 'distancia', dataInicio: '06/06/2023', horaInicio: '13:00', dataFim: '06/06/2023', horaFim: '18:00', palestrante: 'Dr.Awdren Fontão', acessibilidade: 'O auditório conta com piso tátil e a palestra possui intrérprete de Libras', sala: 'https://meet.google.com/iwu-sdbo-szs', dialog: false },
            { id: 3, status: 'presente', nome: 'Palestra sobre DevOps', descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano. Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.', local: 'Auditório 1 - Facom', modalidade: 'presencial', dataInicio: '21/05/2023', horaInicio: '13:00', dataFim: '21/05/2023', horaFim: '17:00', palestrante: 'Dr.Awdren Fontão', acessibilidade: 'O auditório conta com piso tátil e a palestra possui intrérprete de Libras', sala: null, dialog: false },
            { id: 4, status: 'presente', nome: 'Palestra sobre DevOps', descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano. Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.', local: 'Auditório 1 - Facom', modalidade: 'distancia', dataInicio: '26/06/2023', horaInicio: '13:00', dataFim: '27/06/2023', horaFim: '17:00', palestrante: 'Dr.Awdren Fontão', acessibilidade: 'O auditório conta com piso tátil e a palestra possui intrérprete de Libras', sala: 'https://meet.google.com/iwu-sdbo-szs', dialog: false },
            { id: 5, status: 'ausente', nome: 'Palestra sobre DevOps', descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano. Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.', local: 'Auditório 1 - Facom', modalidade: 'presencial', dataInicio: '21/05/2023', horaInicio: '13:00', dataFim: '21/05/2023', horaFim: '17:00', palestrante: 'Dr.Awdren Fontão', acessibilidade: 'O auditório conta com piso tátil e a palestra possui intrérprete de Libras', sala: null, dialog: false }
          ]
        },
        {
          id: 2,
          status: 'inscrito',
          nome: 'Primeiro Encontro de Empreendedores de Campo Grande - MS',
          dataInicio: '05/06/2023',
          dataFim: '20/06/2023',
          horaInicio: '13:00',
          horaFim: '17:00',
          atividades: [
            { id: 1, status: 'inscrito', nome: 'Palestra sobre DevOps', descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano. Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.', local: 'Auditório 1 - Facom', modalidade: 'presencial', dataInicio: '21/05/2023', horaInicio: '13:00', dataFim: '21/05/2023', horaFim: '17:00', palestrante: 'Dr.Awdren Fontão', acessibilidade: 'O auditório conta com piso tátil e a palestra possui intrérprete de Libras', dialog: false },
            { id: 2, status: 'presente', nome: 'Palestra sobre DevOps', descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano. Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.', local: 'Auditório 1 - Facom', modalidade: 'presencial', dataInicio: '21/05/2023', horaInicio: '13:00', dataFim: '21/05/2023',horaFim: '17:00', palestrante: 'Dr.Awdren Fontão', acessibilidade: 'O auditório conta com piso tátil e a palestra possui intrérprete de Libras', dialog: false },
            { id: 3, status: 'ausente', nome: 'Palestra sobre DevOps', descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano. Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.', local: 'Auditório 1 - Facom', modalidade: 'distancia', dataInicio: '21/05/2023', horaInicio: '13:00', dataFim: '21/05/2023', horaFim: '17:00', palestrante: 'Dr.Awdren Fontão', acessibilidade: 'O auditório conta com piso tátil e a palestra possui intrérprete de Libras', dialog: false },
          ]
        },
        {
          id: 3,
          status: 'inscrito',
          nome: 'XVIII - ECOPET Região Norte',
          dataInicio: '30/06/2023',
          dataFim: '20/07/2023',
          horaInicio: '13:00',
          horaFim: '17:00',
          atividades: [
            { id: 1, status: 'inscrito', nome: 'Palestra sobre DevOps', descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano. Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.', local: 'Auditório 1 - Facom', modalidade: 'presencial', dataInicio: '21/05/2023', horaInicio: '13:00', dataFim: '21/05/2023', horaFim: '17:00', palestrante: 'Dr.Awdren Fontão', acessibilidade: 'O auditório conta com piso tátil e a palestra possui intrérprete de Libras', dialog: false },
            { id: 2, status: 'presente', nome: 'Palestra sobre DevOps', descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano. Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.', local: 'Auditório 1 - Facom', modalidade: 'presencial', dataInicio: '21/05/2023', horaInicio: '13:00', dataFim: '21/05/2023',horaFim: '17:00', palestrante: 'Dr.Awdren Fontão', acessibilidade: 'O auditório conta com piso tátil e a palestra possui intrérprete de Libras', dialog: false },
            { id: 3, status: 'ausente', nome: 'Palestra sobre DevOps', descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano. Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.', local: 'Auditório 1 - Facom', modalidade: 'distancia', dataInicio: '21/05/2023', horaInicio: '13:00', dataFim: '21/05/2023', horaFim: '17:00', palestrante: 'Dr.Awdren Fontão', acessibilidade: 'O auditório conta com piso tátil e a palestra possui intrérprete de Libras', dialog: false },
          ]
        }
      ]
    }
  },
  methods: {
    qualCorAtividadeStatus(status) {
      if (status == 'inscrito') {
        return '#097FA8'
      } else if (status == 'presente') {
        return '#29A809'
      } else if (status == 'ausente') {
        return '#D20000'
      }
    },
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
    },
    formatarDataHoraTimezone(atividade, modo) {
      var strDataDividida = null
      var strHora = null

      if (modo == 'inicio'){
        strDataDividida = atividade.dataInicio.split('/')
        strHora = atividade.horaInicio + ':00'
      } else if (modo == 'fim') {
        strDataDividida = atividade.dataFim.split('/')
        strHora = atividade.horaFim + ':00'
      }
      var strData = strDataDividida[2] + '-' + strDataDividida[1] + '-' + strDataDividida[0]

      return strData + 'T' + strHora
    },
    estaNoHorario(atividade) {
      var dataAtual = new Date()
      var dataHoraInicio = new Date(this.formatarDataHoraTimezone(atividade, 'inicio'))
      var dataHoraInicioMargem = new Date(dataHoraInicio.getTime() - (10 * 60 * 1000))
      var dataHoraFim = new Date(this.formatarDataHoraTimezone(atividade, 'fim'))

      return dataAtual >= dataHoraInicioMargem && dataAtual <= dataHoraFim
    },
    registrarPresencaAtividade(atividade) {
      console.log(atividade)
    },
    entrarNaAtividade(atividade) {
      this.registrarPresencaAtividade(atividade)
      window.open(atividade.sala, '_blank');
    }
  }
}
</script>

<style>

</style>