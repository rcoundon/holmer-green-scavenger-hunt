<template>
  <div class="container is-fluid box">
    <delivery :tableData="deliveryData" :title="title"></delivery>
  </div>
</template>

<script>
import Delivery from "../components/Delivery";
import hgCsvConverter from "../lib/hgCsvConverter";
import pwCsvConverter from "../lib/pwCsvConverter";

export default {
  name: "deliveryContainer",
  data() {
    return {
      deliveryData: [],
      locality: ""
    };
  },
  components: {
    Delivery
  },
  watch: {
    "$route.path": {
      handler: function(newVal) {
        console.log(newVal);
        if (newVal === "/delivery") {
          this.locality = "hg";
          this.deliveryData = hgCsvConverter;
        }
        if (newVal === "/pwDelivery") {
          this.locality = "pw";
          this.deliveryData = pwCsvConverter;
        }
        this.$forceUpdate();
      },
      immediate: true
    }
  },
  computed: {
    title() {
      if (this.locality === "hg")
        return "Holmer Green Local Businesses and Deliveries";
      if (this.locality === "pw")
        return "Prestwood & Missenden Local Businesses and Deliveries";
      return "";
    }
  }
};
</script>

<style>

</style>
