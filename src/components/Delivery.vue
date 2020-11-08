<template>
  <div>
    <p class="has-text-weight-semibold is-size-4" style="margin-bottom: 1em">
      {{ title }}
    </p>
    <p class="has-text-weight-semibold is-size-5" style="margin-bottom: 1em">
      Choose a category using the Category button, and sort the list by tapping
      <wbr />a header or choosing from the dropdown (if on mobile)
    </p>
    <b-dropdown v-model="selectedCategory" expanded aria-role="list">
      <button slot="trigger" class="button is-primary">
        <span>Category</span>
      </button>

      <b-dropdown-item value="All" aria-role="listitem">All</b-dropdown-item>

      <b-dropdown-item v-for="category in categories" :key="category" :value="category" aria-role="listitem">{{
        category
      }}</b-dropdown-item>
    </b-dropdown>
    <p class="is-size-4 has-text-primary" style="margin: 1em 0em">
      Showing category:
      <span class="has-text-weight-bold">{{ selectedCategory }}</span>
    </p>
    <b-table :mobile-cards="true" :data="filteredData" default-sort="Business" :paginated="true" :per-page="10" scrollable>
      <b-table-column v-slot="props" sortable searchable field="Category" label="Category">
        {{ props.row.Category }}
      </b-table-column>
      <b-table-column v-slot="props" sortable searchable field="Type" label="Type">
        {{ props.row.Type }}
      </b-table-column>
      <b-table-column v-slot="props" sortable searchable field="Business" label="Business">
        {{ props.row.Business }}
      </b-table-column>
      <b-table-column v-slot="props" sortable searchable field="Location" label="Location">
        {{ props.row.Location }}
      </b-table-column>
      <b-table-column v-slot="props" sortable field="Phone" label="Phone">
        <a :href="'tel:' + props.row.Phone">{{ props.row.Phone }}</a>
      </b-table-column>
      <b-table-column v-slot="props" sortable searchable field="Website" label="Website">
        <a :href="props.row.Website">{{ props.row.Business }}</a>
      </b-table-column>
      <b-table-column v-slot="props" sortable searchable field="Email" label="Email">
        <a :href="'mailTo:' + props.row.Email">{{ props.row.Email }}</a>
      </b-table-column>

      <b-table-column v-slot="props" sortable searchable field="DeliveryCollection" label="Delivery/Delivery">
        {{ props.row.DeliveryCollection }}
      </b-table-column>
      <b-table-column v-slot="props" sortable searchable field="Range" label="Range">
        <span style="width: 58vw">
          {{ props.row.Range }}
        </span>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      required: true,
      default: () => [],
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      processedData: [],
      selectedCategory: 'All',
    };
  },
  computed: {
    filteredData() {
      if (this.selectedCategory === 'All') return this.processedData;
      return this.processedData.filter((row) => {
        if (!row) return false;
        return row.Category === this.selectedCategory;
      });
    },
    categories() {
      const categories = this.tableData.map((item) => {
        return item.Category;
      });
      const uniqueCategories = new Set(categories);
      return Array.from(uniqueCategories);
    },
  },
  watch: {
    tableData: {
      handler: function (newVal) {
        this.processedData = newVal.map((row) => {
          return {
            ...row,
            Website: this.prefixWithHttp(row.Website),
          };
        });
      },
      immediate: true,
    },
  },
  methods: {
    prefixWithHttp(address) {
      if (!address) return null;
      if (address.startsWith('https://') || address.startsWith('http://')) {
        return address;
      }
      return `https://${address}`;
    },
  },
};
</script>

<style></style>
