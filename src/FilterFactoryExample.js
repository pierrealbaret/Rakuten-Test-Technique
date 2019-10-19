export default class FilterFactoryExample {
    constructor({name, indice, valueSelected, isDisabled, values }){
        this.name = name || '';
        this.indice = indice || 0;
        this.valueSelected = valueSelected || '';
        this.isDisabled = isDisabled || false;
        this.values = values || [];
    }

    toObject() {
        return {
            name: this.name,
            indice: this.indice,
            valueSelected: this.valueSelected,
            isDisabled: this.isDisabled,
            values: this.values,
        }
    }
}
