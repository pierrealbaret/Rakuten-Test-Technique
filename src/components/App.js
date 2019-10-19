import React from 'react';
import Filters from './Filters/index';
import ProductList from './Products/index';
import { wsFilterBuyback, wsInitialFilterBuyback } from './../rest/wsFilterBuyback';
import { dataMerchFilters, settingFilter,Settings, topBrand } from './../utils';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: '',
      firstFiltersValues: [],
      secondFiltersValues: [],
      thirdFiltersValues: [],
      fourthFiltersValues: [],
      firstFilterIsDisable: false,
      secondFilterIsDisable: true,
      thirdFilterIsDisable: true,
      fourthFilterIsDisable: true,
      firstFilterValueSelected: '',
      secondFilterValueSelected: '',
      thirdFilterValueSelected: '',
      fourthFilterValueSelected: '',
      filtersMobIsToggleOn: false,
      products: [],
      nextToken: '',
      merchFilter: {},
      intialized: false,
      category:null,
    };

    this.updateFirstFilter = this.updateFirstFilter.bind(this);
    this.updateSecondFilter = this.updateSecondFilter.bind(this);
    this.updateThirdFilter = this.updateThirdFilter.bind(this);
    this.updateFourthFilter = this.updateFourthFilter.bind(this);
    this.executeFilters = this.executeFilters.bind(this);
    this.handleShowFiltersMob = this.handleShowFiltersMob.bind(this);
    this.clearAllFilters = this.clearAllFilters.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.initializeFilter = this.initializeFilter.bind(this);
    this.initializeFirstFilter = this.initializeFirstFilter.bind(this);
    this.initializeSecondFilter = this.initializeSecondFilter.bind(this)


  }

  updateFirstFilter(e, nameFilter) {
    const name = e ? e.target.getAttribute('name') : nameFilter;
    if (this.state.firstFilterValueSelected === name) {
      this.setState({
        firstFilterValueSelected: '',
        secondFilterValueSelected: '',
        thirdFilterValueSelected: '',
        fourthFilterValueSelected: '',
        secondFilterIsDisable: true,
        thirdFilterIsDisable: true,
        fourthFilterIsDisable: true,
        products: [],
        secondFiltersValues: [],
        thirdFiltersValues: [],
        fourthFiltersValues: [],
      });
    }
    else {
      this.setState({
        firstFilterValueSelected: name,
        secondFilterValueSelected: '',
        thirdFilterValueSelected: '',
        fourthFilterValueSelected: '',
        secondFilterIsDisable: true,
        thirdFilterIsDisable: true,
        fourthFilterIsDisable: true,
        products: [],
        secondFiltersValues: [],
        thirdFiltersValues: [],
        fourthFiltersValues: [],
      });
    }
  }

  updateSecondFilter(e, nameFilter) {
    const name = e ? e.target.getAttribute('name') : nameFilter;
    if (this.state.secondFilterValueSelected === name) {
      this.setState({
        secondFilterValueSelected: '',
        thirdFilterValueSelected: '',
        fourthFilterValueSelected: '',
        thirdFilterIsDisable: true,
        fourthFilterIsDisable: true,
        products: [],
        thirdFiltersValues: [],
        fourthFiltersValues: [],

      });
    }
    else {
      this.setState({
        secondFilterValueSelected: name,
        thirdFilterValueSelected: '',
        fourthFilterValueSelected: '',
        thirdFilterIsDisable: true,
        fourthFilterIsDisable: true,
        products: [],
        thirdFiltersValues: [],
        fourthFiltersValues: [],
      });
    }
  }

  updateThirdFilter(e) {
    const name = e.target.getAttribute('name');
    if (this.state.thirdFilterValueSelected === name) {
      this.setState({ thirdFilterValueSelected: '', products: [] });
    }
    else {
      this.setState({ thirdFilterValueSelected: name, products: [] });
    }
  }

  updateFourthFilter(e) {
    const name = e.target.getAttribute('name');
    if (this.state.fourthFilterValueSelected === name) {
      this.setState({ fourthFilterValueSelected: '', products: [] });
    }
    else {
      this.setState({ fourthFilterValueSelected: name, products: [] });
    }
  }

  initializeFirstFilter() {
    const {category} = this.state
    const data = settingFilter[category];
    const firstFilterIndex = Settings.filter[category].firstFilter.index
    wsInitialFilterBuyback(data,category).then(res => {
      const filtersValues = res.filtersValues ? res.filtersValues : {};
      if (filtersValues[firstFilterIndex]) {
        this.setState({
          firstFiltersValues: topBrand[category].concat([...filtersValues[firstFilterIndex].sort().filter(e => !topBrand[category].includes(e))])
        })
      }
    })
  }

  initializeSecondFilter(brand) {
    const {category} = this.state
    const data = settingFilter[category];
    data.category = category
    const firstFilterIndex = Settings.filter[category].firstFilter.index
    const secondFilterIndex = Settings.filter[category].secondFilter.index
    data.filter[firstFilterIndex] = brand;
    data.filterValues = [];
    wsInitialFilterBuyback(data,category).then(res => {
      const filtersValues = res.filtersValues ? res.filtersValues : {};
      this.setState({
        secondFiltersValues: filtersValues[secondFilterIndex],
        secondFilterIsDisable: false,
      });
    })
  }

  initializeFilter() {
    const data = dataMerchFilters();
    const {category} = this.state
    const firstFilterIndex = Settings.filter[category].firstFilter.index
    const secondFilterIndex = Settings.filter[category].secondFilter.index
    const thirdFilterIndex = Settings.filter[category].thirdFilter.index
    const fourthFilterIndex = Settings.filter[category].fourthFilter.index

    if (data.filter[firstFilterIndex]) {
      this.initializeFirstFilter()
      wsInitialFilterBuyback(data,category).then(res => {
        const filtersValues = res.filtersValues ? res.filtersValues : {};
        const firstFiltersValues = data.filter[firstFilterIndex] ? data.filter[firstFilterIndex] : null;
        const secondFilterValues = data.filter[secondFilterIndex] ? data.filter[secondFilterIndex] : null
        const { products } = res;
        const nextToken = res.nextToken ? res.nextToken : '';

        if (firstFiltersValues) {
          this.updateFirstFilter(null, firstFiltersValues);
        }
        if (secondFilterValues) {
          this.initializeSecondFilter(firstFiltersValues);
          this.updateSecondFilter(null, secondFilterValues);
        }

        if (!secondFilterValues && filtersValues[secondFilterIndex]) {
          this.setState({
            secondFiltersValues: filtersValues[secondFilterIndex],
            secondFilterIsDisable: false,
          });
        }
        if (filtersValues[thirdFilterIndex]) {
          this.setState({
            thirdFiltersValues: filtersValues[thirdFilterIndex],
            thirdFilterIsDisable: false,
          })
        }

        if (filtersValues[fourthFilterIndex]) {
          this.setState({
            fourthFiltersValues: filtersValues[fourthFilterIndex],
            fourthFilterIsDisable: false,
          })
        }
        this.setState({
          products,
          intialized: true,
          nextToken
        });
      })
    }
    else {
      this.executeFilters(data)
      this.setState({
        intialized: true,
      });
    }
  }
  executeFilters = (settingFilter, nextToken) => {
    const {category} = this.state
    /**
     * Constant => could be initialize in context
     * @type {string}
     */
    const firstFilterIndex = Settings.filter[category].firstFilter.index
    const secondFilterIndex = Settings.filter[category].secondFilter.index
    const thirdFilterIndex = Settings.filter[category].thirdFilter.index
    const fourthFilterIndex = Settings.filter[category].fourthFilter.index
    wsFilterBuyback(
      this.state.category,
      this.state.firstFilterValueSelected,
      this.state.secondFilterValueSelected,
      this.state.thirdFilterValueSelected,
      this.state.fourthFilterValueSelected,
      nextToken,
      settingFilter,
    )
      .then(res => {
        const { products } = this.state;
        products.push(...res.products);

        const filtersValues = res.filtersValues ? res.filtersValues : {};

        if (filtersValues[firstFilterIndex]) {
          this.setState({
            firstFiltersValues: topBrand[category].concat([...filtersValues[firstFilterIndex].sort().filter(e => !topBrand[category].includes(e))])
          })
        }
        if (filtersValues[secondFilterIndex]) {
          this.setState({
            secondFiltersValues: filtersValues[secondFilterIndex],
            secondFilterIsDisable: false,
          })
        }

        if (filtersValues[thirdFilterIndex]) {
          this.setState({
            thirdFiltersValues: filtersValues[thirdFilterIndex],
            thirdFilterIsDisable: false,
          })
        }

        if (filtersValues[fourthFilterIndex]) {
          this.setState({
            fourthFiltersValues: filtersValues[fourthFilterIndex],
            fourthFilterIsDisable: false,
          })
        }

        const nextToken = res.nextToken ? res.nextToken : '';

        this.setState({
          products,
          nextToken: nextToken
        });
      });
  }

  handleShowFiltersMob() {
    this.setState(prevState => ({
      filtersMobIsToggleOn: !prevState.filtersMobIsToggleOn
    }));
  }

  clearAllFilters() {
    this.setState({
      firstFilterValueSelected: '',
      secondFilterValueSelected: '',
      thirdFilterValueSelected: '',
      fourthFilterValueSelected: '',
      firstFilterIsDisable: false,
      secondFilterIsDisable: true,
      thirdFilterIsDisable: true,
      fourthFilterIsDisable: true,
      secondFiltersValues: [],
      thirdFiltersValues: [],
      fourthFiltersValues: [],
    })
  }

  handlePagination() {
    const {category} = this.state
    const data=settingFilter[category]
    this.executeFilters(data, this.state.nextToken);
  }
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    const data = dataMerchFilters();
    this.setState({category:data.category})
  }
  componentDidMount() {
    this.initializeFilter()

  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (this.state.firstFilterValueSelected !== prevState.firstFilterValueSelected ||
        this.state.secondFilterValueSelected !== prevState.secondFilterValueSelected ||
        this.state.thirdFilterValueSelected !== prevState.thirdFilterValueSelected ||
        this.state.fourthFilterValueSelected !== prevState.fourthFilterValueSelected) && this.state.intialized
    ) {
      const {category} = this.state
      const data=settingFilter[category]
      this.executeFilters(data)
    };
  }

  getCommonProps() {
    const commonProps = {
      ...this.state,
      updateFirstFilter: this.updateFirstFilter,
      updateSecondFilter: this.updateSecondFilter,
      updateThirdFilter: this.updateThirdFilter,
      updateFourthFilter: this.updateFourthFilter
    };
    return commonProps;
  }

  getMobProps() {
    const mobProps = {
      handleShowFiltersMob: this.handleShowFiltersMob,
      isToggleOn: this.state.filtersMobIsToggleOn,
      clearAllFilters: this.clearAllFilters
    };
    return mobProps;
  }

  render() {
    const {category} = this.state
    const commonProps = this.getCommonProps();
    const mobProps = this.getMobProps();

    return (
      <div>
        <Filters
          category={category}
          commonProps={commonProps}
          mobProps={mobProps}
        />
        {!mobProps.isToggleOn &&
          <ProductList
            className="container-ProductsList"
            products={this.state.products}
            pagination={this.handlePagination}
            nextToken={this.state.nextToken}
          />
        }
      </div>
    )
  }
}
