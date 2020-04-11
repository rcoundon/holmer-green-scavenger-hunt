<template>
  <div class="container">
    <p class="has-text-weight-semibold is-size-4" style="margin-bottom: 1em;">
      Holmer Green, local business deliveries
    </p>
    <b-table
      :mobile-cards="true"
      :data="tableData"
      default-sort="Category"
      :paginated="true"
      :per-page="10"
      sticky-header
      height="600px"
    >
      <template slot-scope="props">
        <b-table-column sortable searchable field="Business" label="Business">
          {{ props.row.Business }}
        </b-table-column>
        <b-table-column sortable searchable field="Category" label="Category">
          {{ props.row.Category }}
        </b-table-column>
        <b-table-column sortable field="Phone" label="Phone">
          <a :href="'tel:' + props.row.Phone">{{ props.row.Phone }}</a>
        </b-table-column>
        <b-table-column sortable searchable field="Website" label="Website">
          <a :href="props.row.Website">{{ props.row.Business }}</a>
        </b-table-column>
        <b-table-column
          sortable
          searchable
          field="Home delivery"
          label="Home Delivery"
        >
          {{ props.row["Home delivery"] }}
        </b-table-column>
        <b-table-column sortable searchable field="Range" label="Range">
          {{ props.row.Range }}
        </b-table-column>
        <b-table-column sortable searchable field="Comments" label="Comments">
          {{ props.row.Comments }}
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import data from "../lib/csvConverter";

export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.tableData = data;
  }
};
</script>

<style>

</style>
