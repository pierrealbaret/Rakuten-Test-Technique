import {getUrlWs, Settings} from "../utils"

/** TODO : can be replace by a factory */
const wsFilterBuyback = (category,brand, model, capacity, color, nextTk, settingFilter) => {
  const filterBrand = brand ? brand : '';
  const filterModel = model ? model : '';
  const filterCapacity = capacity ? capacity : '';
  const filterColor = color ? color : '';
  const nextToken = nextTk ? nextTk : '';
  const firstFilterIndex = Settings.filter[category].firstFilter.index
  const secondFilterIndex = Settings.filter[category].secondFilter.index
  const thirdFilterIndex = Settings.filter[category].thirdFilter.index ? Settings.filter[category].thirdFilter.index :null
  const fourthFilterIndex = Settings.filter[category].fourthFilter.index ? Settings.filter[category].fourthFilter.index :null

  const data = settingFilter ? settingFilter : {};

  data.nextToken = nextToken;
  data.category = category;

  if (filterBrand) {
    data.filter = {};
    data.filter[firstFilterIndex] = filterBrand;
    data.filterValues = [];
    data.filterValues.push(secondFilterIndex);
  }
  else {
    data.filter = {};
    data.filterValues = [];
    data.filterValues.push(firstFilterIndex);
  }

  if (filterModel) {
    data.filter = {};
    data.filter[secondFilterIndex] = filterModel;
    data.filterValues = [];
    if(thirdFilterIndex)
    data.filterValues.push(thirdFilterIndex);
    if(fourthFilterIndex)
    data.filterValues.push(fourthFilterIndex);
  }

  if (filterCapacity )  {
    data.filter[thirdFilterIndex] = filterCapacity;
    data.filterValues = [];
    if(fourthFilterIndex)
    data.filterValues.push(fourthFilterIndex);
  }

  if (filterColor) {
    data.filter[fourthFilterIndex] = filterColor;
    data.filterValues = [];
    if(thirdFilterIndex)
    data.filterValues.push(thirdFilterIndex);
  }

  return new Promise(function (resolve, reject) {
    const req = new XMLHttpRequest();
    const URL =  getUrlWs();
    req.open("POST", URL);
    req.setRequestHeader("Content-Type", "application/json");
    req.onload = function () {
      try {
        if (req.status === 200) {
          resolve(JSON.parse(req.responseText));
        }
      } catch (error) {
        reject(Error(error));
      }
    };
    req.send(JSON.stringify(data));
  });
};

const wsInitialFilterBuyback = (settingFilter, category) => {
  const firstFilterIndex = Settings.filter[category].firstFilter.index
  const secondFilterIndex = Settings.filter[category].secondFilter.index
  const thirdFilterIndex = Settings.filter[category].thirdFilter.index ? Settings.filter[category].thirdFilter.index :null
  const fourthFilterIndex = Settings.filter[category].fourthFilter.index ? Settings.filter[category].fourthFilter.index :null

  settingFilter.filterValues.push(firstFilterIndex)
  if (settingFilter.filter[firstFilterIndex]) {
    settingFilter.filterValues.push(secondFilterIndex)
  }
  if (settingFilter.filter[secondFilterIndex]) {
    if(thirdFilterIndex)
    settingFilter.filterValues.push(thirdFilterIndex)
    if(fourthFilterIndex)
    settingFilter.filterValues.push(fourthFilterIndex)
  }

  return new Promise(function (resolve, reject) {
    const req = new XMLHttpRequest();
    const URL =  getUrlWs();
    req.open("POST", URL);
    req.setRequestHeader("Content-Type", "application/json");
    req.onload = function () {
      try {
        if (req.status === 200) {
          resolve(JSON.parse(req.responseText));
        }
      } catch (error) {
        reject(Error(error));
      }
    };
    req.send(JSON.stringify(settingFilter));
  });
}

export { wsFilterBuyback, wsInitialFilterBuyback };




