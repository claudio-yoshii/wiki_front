<template>
  <GmapMap
    :center="{ lat: 10, lng: 10 }"
    :zoom="7"
    map-type-id="roadmap"
    style="width: 100%; height: 100%"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="false"
      :title="m.veiculo"
      @click="center = m.position"
    />
  </GmapMap>
</template>

<script>
export default {
  computed: {
    markers() {
      const markers = [];
      _.forEach(
        this.$store.state.veiculos.veiculos,
        (item) => {
          const status = JSON.parse(item.status);
          if (status.gps.latitude && status.gps.longitude) {
            markers.push({
              position: { lat: status.gps.latitude, lng: status.gps.longitude },
              veiculo: item.descricao,
            });
          }
        }
      );
      return markers;
    },
  },
};
</script>

<style>
</style>