
## Start the project

```
    npm i
    npm run build
    npm run start
```

## Project Specifications

We would like to filter by brand, model, capacity and color.
There is a WS accessible with a POST method taking parameters as an object

```
{
    category: string, // Mandatory: category of the selection we are going to filter on. e.g.: "Tel-PDA_Telephones-mobiles"
    filterValues: array // Mandatory: array holding the filter for which we expect receiving values. e.g.: filterValues: ['filter1'] => we anticipe that the ws response returns all values of filters associated with filter1
    nbProducts: number // Mandatory: quantity of products to receive
    filter: object // Optional: value on which we want to filter
    nextToken: number // Optional: tells the back-end how many products are displayed on the Front-End
    sort: string // Optional: tells back-end to filter by decreasing price the product if the value is "desc"
}
```

This ws returns all products related to a category + all the filters availables. The initial response returns all selectable values for the 1st filter.
Functionnally:
* as long user did not select a branch (1st filter), user can't open the 3 other filters(model, capacity, color)
* selecting a model activate the 2 other filters (capacity and color)
* when deselecting the 1st filter, other filters are not selectable anymore
* selecting a filter, refresh the products list
* for the capacity and color filter, if the ws does not return any value, this value is by default selected
* a user can display additional products
* interface is responsive and be used on several devices

## Refacto 

