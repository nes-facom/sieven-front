
<template>
  <v-sheet>
    <v-carousel
      style="
        max-height: 34.25em;
        max-width: 120.125em;
        background-color: #fafafa;
      "
    >
      <v-carousel-item v-for="event in events" :key="event.id">
        <v-row>
          <v-col cols="6">
            <v-img
              class="justify-end text-white"
              height="100%"
              max-width="43em"
              :src="event.image"
              contain
            ></v-img>
          </v-col>
          <v-col cols="6">
            <!-- Card -->
            <v-card max-width="43em" height="100%" position="relative" style="background-color: #fafafa">
              <v-card-subtitle class="pt-3">{{ event.title }}</v-card-subtitle>
              <v-card-text>
                <div>{{ event.description }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="blue" depressed elevation="6"> SAIBA MAIS </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    MAIS EVENTOS
    <v-footer color="black" app>
      <v-container>
        <v-layout align-center justify-center>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <img
                src="@/assets/home/nes.png"
                alt="NES - Núcleo de Práticas de Software"
                style="width: 39px; height: 45px;"
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <span>Texto flutuante</span>
          </v-tooltip>
          <img src="@/assets/home/nes.png" alt="Imagem Aleatória" style="width: 39px; height: 45px;" />
        </v-layout>
        NES
      </v-container>
    </v-footer>
  </v-sheet>
</template>


<script>
export default {
  name: "randomResponse",
  data() {
    return {
      events: [],
    };
  },
  created() {
    this.fetchRandomData();
  },
  methods: {
    fetchRandomData() {
      for (let i = 1; i <= 5; i++) {
        this.events.push({
          id: i,
          title: "Evento Aleatório " + i,
          description: "Descrição aleatória do evento " + i,
          image: `https://picsum.photos/1922/548?random=${i}`,
        });
      }
    },
  },
};
</script>
