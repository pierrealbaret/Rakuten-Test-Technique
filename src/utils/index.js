const dataMerchFilters = () => {
  if (!window.merchFilters) {
    console.error("Missing window.merchFilters data 🚨");
  } else {
    return window.merchFilters
  }
};
/**
 * TODO :
 * Devrait être dans la configuration
 */
const settingFilter = {
  "Tel-PDA_Telephones-mobiles":{
    category:"Tel-PDA_Telephones-mobiles",
    filter: {},
    filterValues: [],
    nbProducts: 18,
    nextToken: '',
    sort : "desc"
  },
  "Informatique_Ordinateur-portable":{
    category:"Informatique_Ordinateur-portable",
    filter: {
      filter1 :"Apple",
    },
    filterValues: [],
    nbProducts: 18,
    nextToken: '',
    sort : "desc"
  },
  "Informatique_tablette":{
    category:"Informatique_tablette",
    filter: {},
    filterValues: [],
    nbProducts: 18,
    nextToken: '',
    sort : "desc"
  }
}

const Settings = {
  filter: {
    "Tel-PDA_Telephones-mobiles":{
      firstFilter: {
        index: "filter1",
        name: "Marque"
      },
      secondFilter: {
        index: "filter10",
        name: "Modèle"
      },
      thirdFilter: {
        index: "filter6",
        name: "Capacité"
      },
      fourthFilter: {
        index: "filter11",
        name: "Couleur"
      }
    },
    "Informatique_Ordinateur-portable":{
      firstFilter: {
        index: "filter1",
        name: "Marque"
      },
      secondFilter: {
        index: "filter5",
        name: "Gamme"
      },
      thirdFilter: {
        index: "filter6",
        name: "Capacité du disque dur "
      },
      fourthFilter: {
        name: "Couleur"
      }
    },
    "Informatique_tablette":{
      firstFilter: {
        index: "filter1",
        name: "Marque"
      },
      secondFilter: {
        index: "filter10",
        name: "Modèle"
      },
      thirdFilter: {
        index: "filter13",
        name: "Capacité de stockage"
      },
      fourthFilter: {
        name: "Couleur"
      }
    },
  }
};

const isMobile = () => {
  if (window.innerWidth < 576) {
    return true;
  }
  else {
    return false;
  }
};

const sortNumbers = (numbers) => {
  function compare(x, y) {
    return x - y;
  }
  return numbers.sort(compare);
}

function getUrlWs(){
  // const nameDomain = window.location.hostname;
  /**
   * Should be in config
   * @type {string}
   */
  const  url = `https://fr.shopping.rakuten.com/restpublic/sel-web/buyback/offers`;
   return url;
 }

const topBrand = {
  "Tel-PDA_Telephones-mobiles": ['Apple', 'Samsung', 'Huawei', 'Sony Ericsson', 'Xiaomi'],
  "Informatique_Ordinateur-portable":['Apple'],
  "Informatique_tablette":['Apple', 'Samsung','Asus','Acer']
};


export { dataMerchFilters, Settings, isMobile, sortNumbers, topBrand, settingFilter,getUrlWs };
