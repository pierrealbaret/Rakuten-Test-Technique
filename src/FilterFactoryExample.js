export default class FilterFactoryExample {
    constructor({name, indice, valueSelected, isDisabled, values }){
        this.name = name || '';
        this.incide = indice || 0;
        this.valueSelected = valueSelected || false;
        this.isDisabled = isDisabled || true;
        this.values = values || [];
    }
}
