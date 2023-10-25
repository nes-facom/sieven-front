<template>
  <div>
  <v-carousel class="grey lighten-5" style="max-width: 120.125rem; max-height: 34.25rem;">
    <v-carousel-item v-for="(event, index) in events" :key="index">
      <v-row align="center" justify="center" class="fill-height" >
        
        <v-col cols="12" md="4" class="text-center">
          <v-img :src="event.image" class="rounded-lg" max-height="300"></v-img>
        </v-col>
        <v-col cols="12" md="4" class="text-left">
          <h2 class="headline">{{ event.title }}</h2>
          <p>{{ event.description }}</p>
          <p class="caption">{{ event.date }} | {{ event.time }}</p>
          <v-btn @click="showDetails(event)" color="primary">Saiba Mais</v-btn>
        </v-col>
      </v-row>
    </v-carousel-item>
    </v-carousel>
    <component :is="componenteDinamico"></component>
    
  <v-footer app color="black">
    <v-container>
      <v-row align="center">
        <v-col cols="6">
          <v-img src="@/assets/home/nes.png" height="40" contain></v-img>
          <span class="white--text">Texto 1</span>
        </v-col>
        
      </v-row>
    </v-container>
  </v-footer>
</div>
</template>

<script>

import ComponenteFilho from './cardList.vue';
export default {
  name: "paginaInicial",
  data() {
    return {
      componenteDinamico: ComponenteFilho,
      events: [
        {
          title: 'Evento 1',
          description: 'Descrição do Evento 1.',
          date: '01/01/2023',
          time: '14:00',
          image: "https://picsum.photos/1922/548?random=$1",
        },
        {
          title: 'Evento 2',
          description: 'Descrição do Evento 2.',
          date: '02/01/2023',
          time: '15:30',
          image: "../../assets/agetic_logo.png",
        },
        // Adicione mais eventos conforme necessário
      ],
      items: [
      {
        image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
        title: 'Top western road trips 1',
        subtitle: '1,000 miles of wonder',
        showDetails: false,
        description: "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape."
      },
      {
        image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
        title: 'Top western road trips 2',
        subtitle: '1,000 miles of wonder',
        showDetails: false,
        description: "Description for the second card."
      },
      {
        image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
        title: 'Top western road trips 3',
        subtitle: '1,000 miles of wonder',
        showDetails: false,
        description: "Description for the third card."
      },
      {
        image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
        title: 'Top western road trips 4',
        subtitle: '1,000 miles of wonder',
        showDetails: false,
        description: "Description for the fourth card."
      }
    ]
    };

  },
  methods: {
    showDetails(event) {
      // Lógica para exibir mais detalhes do evento
      console.log('Detalhes do evento:', event);
    },
  },
};
</script>