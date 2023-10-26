<template>
  <v-container class="no-border" align="center" style="width: 120.125rem; height: 45rem;">
    <v-container style="width: 83.5rem; height: 20rem;">
      <v-row>
        <v-col
          v-for="(item, index) in items"
          :key="index"
          cols="12"
          sm="6"
          md="3">
          <v-card class="elevation-0" width="16.375rem">
            <v-img :src="item.image" height="8.188rem" cover></v-img> 
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-subtitle>{{ item.title }}</v-card-subtitle>
            <v-card-text>
              <v-icon>mdi-map-marker</v-icon>
              <span class="text-subtitle-1" style="color: #4C576C">{{ item.text }}</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>





<style>
.no-border .v-card {
  border: none;
}
</style>


<script>
export default {
  
  data: () => ({
    name: "middleCards",
    items: [
      {
        image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
        title: '29 SET',
        text: 'FACOM', 
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
  }),
  methods: {
    toggleDetails(item) {
      item.showDetails = !item.showDetails;
    }
  }
};
</script>
