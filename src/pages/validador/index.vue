<template>
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
      identificador: 'Informacao em codigo'
    }
  }
}
</script>

<style>

</style>