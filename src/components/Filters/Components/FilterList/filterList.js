import React from 'react';
import FilterItem from './../FilterItem/index';
import { Settings, sortNumbers} from './../../../../utils/index';
import './../../filters.css';

export default class FilterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstFilterSelected: false,
      isSecondFilterSelected: false,
      isThirdFilterSelected: false,
      isFourthFilterSelected: false,
      valueSelected: ''
    };

    this.checkFirstFilterIsSelected = this.checkFirstFilterIsSelected.bind(this);
    this.checkSecondFilterIsSelected = this.checkSecondFilterIsSelected.bind(this);
    this.checkThirdFilterIsSelected = this.checkThirdFilterIsSelected.bind(this);
    this.checkFourthFilterIsSelected = this.checkFourthFilterIsSelected.bind(this);
    this.handleCloseFilterChoiceBox = this.handleCloseFilterChoiceBox.bind(this);
  }

  checkFirstFilterIsSelected() {
    this.setState(prevState => ({
      isFirstFilterSelected: !prevState.isFirstFilterSelected
    }));
    this.setState({
      isSecondFilterSelected: false,
      isThirdFilterSelected: false,
      isFourthFilterSelected: false
    })
  }

  checkSecondFilterIsSelected() {
    this.setState(prevState => ({
      isSecondFilterSelected: !prevState.isSecondFilterSelected
    }));
    this.setState({
      isFirstFilterSelected: false,
      isThirdFilterSelected: false,
      isFourthFilterSelected: false
    })
  }

  checkThirdFilterIsSelected() {
    this.setState(prevState => ({
      isThirdFilterSelected: !prevState.isThirdFilterSelected
    }));
    this.setState({
      isFirstFilterSelected: false,
      isSecondFilterSelected: false,
      isFourthFilterSelected: false
    })
  }

  checkFourthFilterIsSelected() {
    this.setState(prevState => ({
      isFourthFilterSelected: !prevState.isFourthFilterSelected
    }));
    this.setState({
      isFirstFilterSelected: false,
      isSecondFilterSelected: false,
      isThirdFilterSelected: false
    })
  }

  handleCloseFilterChoiceBox(valueSelected, e) {
    //close box when a value is selected
    const name = e.target.getAttribute('name');
    if (valueSelected === '' || valueSelected !== name) {
      this.setState({ valueSelected: name });
      this.setState({
        isFirstFilterSelected: false,
        isSecondFilterSelected: false,
        isThirdFilterSelected: false,
        isFourthFilterSelected: false
      })
    }
    //don't close box if a value is not selected
    if (valueSelected === name) {
      this.setState({ valueSelected: '' })
    }
  }

  render() {
    const{category, commonProps}= this.props;
    const {
      firstFiltersValues,
      secondFiltersValues,
      thirdFiltersValues,
      fourthFiltersValues,
      updateFirstFilter,
      updateSecondFilter,
      updateThirdFilter,
      updateFourthFilter,
      firstFilterIsDisable,
      secondFilterIsDisable,
      thirdFilterIsDisable,
      fourthFilterIsDisable,
      firstFilterValueSelected,
      secondFilterValueSelected,
      thirdFilterValueSelected,
      fourthFilterValueSelected,
    } = commonProps || {};

    // trier par ordre alphabétique les modèles
    const sortFilterModel = secondFiltersValues ? secondFiltersValues.sort() : [];

    // trier par ordre croissant les capacités pour le filtre 6
    const sortFilterNumber = thirdFiltersValues ? sortNumbers(thirdFiltersValues) : [];

    return (
      <div className="flex container-filters helper_hide-BelowLandscape">
        <FilterItem
          filterType={Settings.filter[category].firstFilter.name}
          name={Settings.filter[category].firstFilter.name}
          filterId={Settings.filter[category].firstFilter.index}
          filters={firstFiltersValues}
          updateFilter={updateFirstFilter}
          filterValueSelected={firstFilterValueSelected}
          isDisable={firstFilterIsDisable}
          isFilterSelected={this.state.isFirstFilterSelected}
          checkFilterIsSelected={this.checkFirstFilterIsSelected}
          closeBox={this.handleCloseFilterChoiceBox}
        />
        <FilterItem
          filterType={Settings.filter[category].secondFilter.name}
          name={Settings.filter[category].secondFilter.name}
          filterId={Settings.filter[category].secondFilter.index}
          filters={sortFilterModel}
          updateFilter={updateSecondFilter}
          filterValueSelected={secondFilterValueSelected}
          isDisable={secondFilterIsDisable}
          isFilterSelected={this.state.isSecondFilterSelected}
          checkFilterIsSelected={this.checkSecondFilterIsSelected}
          closeBox={this.handleCloseFilterChoiceBox}
        />
        <FilterItem
          filterType={Settings.filter[category].thirdFilter.name}
          name={Settings.filter[category].thirdFilter.name}
          filterId={Settings.filter[category].thirdFilter.index}
          filters={sortFilterNumber}
          updateFilter={updateThirdFilter}
          filterValueSelected={thirdFilterValueSelected}
          isDisable={thirdFilterIsDisable}
          isFilterSelected={this.state.isThirdFilterSelected}
          checkFilterIsSelected={this.checkThirdFilterIsSelected}
          closeBox={this.handleCloseFilterChoiceBox}
        />
        <FilterItem
          filterType={Settings.filter[category].fourthFilter.name}
          name={Settings.filter[category].fourthFilter.name}
          filterId={Settings.filter[category].fourthFilter.index}
          filters={fourthFiltersValues}
          updateFilter={updateFourthFilter}
          filterValueSelected={fourthFilterValueSelected}
          isDisable={fourthFilterIsDisable}
          isFilterSelected={this.state.isFourthFilterSelected}
          checkFilterIsSelected={this.checkFourthFilterIsSelected}
          closeBox={this.handleCloseFilterChoiceBox}
        />
      </div>
    )
  }
}

