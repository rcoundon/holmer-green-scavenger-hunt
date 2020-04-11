<template>
  <div>
    <p class="has-text-weight-semibold is-size-4" style="margin-bottom: 1em;">
      Holmer Green, local business deliveries
    </p>
    <!-- <b-field grouped class="has-text-center">
      <b-field> -->
    <b-dropdown expanded aria-role="list" v-model="selectedCategory">
      <button class="button is-primary" slot="trigger">
        <span>Category</span>
      </button>

      <b-dropdown-item value="All" aria-role="listitem">All</b-dropdown-item>
      <b-dropdown-item value="Food & Drink" aria-role="listitem"
        >Food & Drink</b-dropdown-item
      >
      <b-dropdown-item value="Takeaway" aria-role="listitem"
        >Takeaway</b-dropdown-item
      >
    </b-dropdown>
    <!-- </b-field>
      <b-field> -->
    <p
      class="is-size-4 has-text-primary has-text-weight-semibold"
      style="margin: 1em 0em"
    >
      Selected Category: {{ selectedCategory }}
    </p>
    <!-- </b-field>
    </b-field> -->
    <b-table
      :mobile-cards="true"
      :data="filteredData"
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
        <b-table-column sortable searchable field="Email" label="Email">
          <a :href="'mailTo:' + props.row.Email">{{ props.row.Email }}</a>
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
      tableData: [],
      processedData: [],
      selectedCategory: "All"
    };
  },
  created() {
    this.tableData = data;
    this.processedData = this.tableData.map(row => {
      return {
        ...row,
        Website: this.prefixWithHttp(row.Website)
      };
    });
  },
  computed: {
    filteredData() {
      if (this.selectedCategory === "All") return this.processedData;
      return this.processedData.filter(row => {
        return row.Category === this.selectedCategory;
      });
    }
  },
  methods: {
    prefixWithHttp(address) {
      if (!address) return null;
      if (address.startsWith("https://") || address.startsWith("http://")) {
        return address;
      }
      return `https://${address}`;
    }
  }
};
</script>

<style>

</style>
