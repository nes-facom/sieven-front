
<template>
  <v-sheet class="mx-auto">
    <v-carousel
      style="
        max-height: 548px;
        max-width: 1922px;
        width: 100%;
        height: 100%;
        background-color: #fafafa;
      "
    >
      <v-carousel-item v-for="event in events" :key="event.id">
        <v-row>
          <v-col cols="12" md="6">
            <v-img
              class="justify-end text-white"
              height="548"
              width="781"
              :src="event.image"
              contain
            ></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="mx-auto" max-width="50vh" height="75%">
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
