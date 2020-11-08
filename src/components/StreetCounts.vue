<template>
  <b-table sticky-header :data="streetCounts" :columns="columns"> </b-table>
</template>

<script>
export default {
  props: {
    streetCounts: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
