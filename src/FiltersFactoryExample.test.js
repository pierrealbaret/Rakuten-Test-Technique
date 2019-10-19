import FilterFactoryExample from "./FilterFactoryExample";

const filterTest = {
    indice: 1,
    name: 'filtre 1',
    valueSelected: 'Iphone',
    isDisabled: true,
    values: [1, 2, 3]
};

const defaultFilter = {
    indice: 0,
    name: '',
    valueSelected: '',
    isDisabled: false,
    values: []
};

describe('factory/Filter', () => {
    it('should return default values', () => {
       const Filter = new FilterFactoryExample( {});
       expect(Filter).toMatchObject(defaultFilter);
    });

    it('should return the given values', () => {
        const Filter = new FilterFactoryExample(filterTest);
        expect(Filter).toMatchObject(filterTest);
    })
});
