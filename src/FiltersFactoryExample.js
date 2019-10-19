import FilterFactoryExample from "./FilterFactoryExample";
export default class FiltersFactoryExample {
    constructor({
                    filters,
                }) {
        this.filters = filters || {};
    }

    addFilters(indice, value) {
        this.filters[indice] = new FilterFactoryExample(value);
    }

    setFilters(indice, value) {
        this.filters[indice] = new FilterFactoryExample(value);
    }

    setValueSelected(indice, value) {
        this.filters[indice].valueSelected = value;
    }
}
