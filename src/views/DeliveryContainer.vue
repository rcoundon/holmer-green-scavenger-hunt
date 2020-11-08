<template>
  <div class="container is-fluid box">
    <delivery :table-data="deliveryData" :title="title"></delivery>
  </div>
</template>

<script>
import Delivery from '../components/Delivery';
import hgCsvConverter from '../lib/hgCsvConverter';
import pwCsvConverter from '../lib/pwCsvConverter';

export default {
  name: 'DeliveryContainer',
  components: {
    Delivery,
  },
  data() {
    return {
      deliveryData: [],
      locality: '',
    };
  },
  computed: {
    title() {
      if (this.locality === 'hg') return 'Holmer Green Local Businesses and Deliveries';
      if (this.locality === 'pw') return 'Prestwood & Missenden Local Businesses and Deliveries';
      return '';
    },
  },
  watch: {
    '$route.path': {
      handler: function (newVal) {
        console.log(newVal);
        if (newVal === '/delivery') {
          this.locality = 'hg';
          this.deliveryData = hgCsvConverter;
        }
        if (newVal === '/pwDelivery') {
          this.locality = 'pw';
          this.deliveryData = pwCsvConverter;
        }
        this.$forceUpdate();
      },
      immediate: true,
    },
  },
};
</script>

<style></style>
