
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

## Proposition
### package.json
```
  "dependencies": {
    "axios": "^0.19.0",
    "react": "^16.4.2",
    "react-dom": "^16.4.2",
    "react-modal": "^3.8.1",
    "react-scripts": "1.1.4"
  }
```  
Il faudrait fixé les packages afin d'éviter les suprises en production 

### wsFilterBuyback
- [wsFilterBuyback](https://github.com/pierrealbaret/Rakuten-Test-Technique/blob/master/src/rest/wsFilterBuyback.js) 
Nous pouvons sortir la logique dans un builder, tout ce que fait la fonction c'est construire un objet avec des paramètres en entrée.
De plus en sortant la logique, celle-ci peut être ré-utilisé et testé unitairement

### App.js
- [App.js](https://github.com/pierrealbaret/Rakuten-Test-Technique/blob/master/src/components/App.js)

### Sortir la logique des filtres
La logique des filtres peut être sorties afin d'aléger le code 
[FiltersFactoryExample](https://github.com/pierrealbaret/Rakuten-Test-Technique/blob/master/src/FiltersFactoryExample.js)
[FilterFactoryExample](https://github.com/pierrealbaret/Rakuten-Test-Technique/blob/master/src/FilterFactoryExample.js)
Avec une Factory gérant les collections de filtre, et une Factory gérant les filtres, on peut simplifier le code.
La factory peut être ré-utiliser pour d'autres filtres.


### Catch l'erreur de wsInitialFilterBuyback
L'erreur throw par wsInitialFilterBuyback n'est pas catch, ajouter un catch au retour de Promess

### Sanitize, et Prototyper les retours des API
```
wsInitialFilterBuyback(data,category).then(res => {
...
const { products } = res;
...
}
```
Injection de res sans sanitize, ni validation de la donnée.
Il faudrait ajouter un schema de validation de la donnée pour s'assurer de son intégrité. [SchemaValidator](https://github.com/tdegrunt/jsonschema)
Il faudrait injecter la donnée dans une Factory (Product) afin de s'assurer que l'on manipule toujours la même signature sur ces objets.

### Sortir le code redondant
```
    const firstFilterIndex = Settings.filter[category].firstFilter.index
    const secondFilterIndex = Settings.filter[category].secondFilter.index
    const thirdFilterIndex = Settings.filter[category].thirdFilter.index
    const fourthFilterIndex = Settings.filter[category].fourthFilter.index
```
Ces variables sont instanciées à plusieurs reprises, elles peuvent être sorties des fonctions afin de les instanciées une seul fois

### Refactorer le code redondant
```
initializeFirstFilter
&
initializeSecondFilter
```
Ces 2 fonctions sont quasiment identique, elles peuvent être refacto en une seul avec une condition.

### config
- [utils/index](https://github.com/pierrealbaret/Rakuten-Test-Technique/blob/master/src/utils/index.js)

Sortir les constantes dans la config, plus simple le jour ou les routes, ou le DNS change.

```
function getUrlWs(){
  const  url = `https://fr.shopping.rakuten.com/restpublic/sel-web/buyback/offers`;
   return url;
 }
 ```

### Tests unitaires
Mieux découpé les fonctions, sortir la logique du code et ajouté des prototypages de données afin de pouvoir tester unitairement.
Afin de se prémunir des changements de contrats d'interface.
