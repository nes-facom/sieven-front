<template>
  <div id="pgDadosEvento">
    <v-row class="d-flex justify-center">
      <div>
        <v-row class="py-1">
          <v-col class="py-0">
            <v-icon class="mr-1" size="26">mdi-clock-outline</v-icon>
            {{ horaInicio }} às {{ horaFim }}
          </v-col>
        </v-row>
        <v-row class="py-1">
          <v-col class="py-0">
            <v-icon class="mr-1"
                    size="26">
              mdi-calendar-month-outline
            </v-icon>
            {{ dataInicio }} - {{ dataFim }}
          </v-col>
        </v-row>
        <v-row class="py-1">
          <v-col class="py-0">
            <v-icon class="mr-1"
                    size="26">
              mdi-map-marker-outline
            </v-icon>
            {{ local }}
          </v-col>
        </v-row>
      </div>
    </v-row>
  </div>
</template>

<script>

export default {
  name: "pgDadosEventoIndex",
  props: {
    local: {
      required: true
    },
    dataInicio: {
      required: true
    },
    dataFim: {
      required: true
    },
    horaInicio: {
      required: true
    },
    horaFim: {
      required: true
    },
  }
}
</script>

<style>

#pgDadosEvento{
  position: relative;
  margin-top: 40px;
  margin-bottom: 70px;
  margin-right: 74%;
  

}

</style>