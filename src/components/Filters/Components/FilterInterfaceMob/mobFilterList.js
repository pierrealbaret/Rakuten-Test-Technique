import React from 'react';
import MobFilterName from './Components/mobFilterName';
import MobFilterChoiceBox from './Components/mobFilterChoiceBox';
import CloseSvg from './Components/closeSvg';
import { Settings, sortNumbers } from './../../../../utils/index';
import './filterInterfaceMob.css';

export default class MobFilterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterListIsToggleOn: false,
      name: ''
    }

    this.handleShowFilterList = this.handleShowFilterList.bind(this);
    this.myRef = React.createRef();
  }

  handleShowFilterList(e) {
    this.setState(prevState => ({
      filterListIsToggleOn: !prevState.filterListIsToggleOn
    }));

    this.setState({ name: e.target.getAttribute('name') });
  }

  render() {

    const {category, mobProps, commonProps} = this.props;
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
    } = commonProps;

    // trier par ordre alphabétique les modèles
    const sortFilterModel = secondFiltersValues ? secondFiltersValues.sort() : [];

    // trier par ordre croissant les capacités pour le filtre 6
    const sortFilterNumber = thirdFiltersValues ? sortNumbers(thirdFiltersValues) : [];

    return (
      <div ref={this.myRef} className="filterMob_interface w-100 z-5" >
        <div className="filterMob_interface-animation flex flex-column">
          {!this.state.filterListIsToggleOn &&
            <div className="w-100">
              <div className="f5 bg-white pv4 ph3 bb b--moon-gray relative flex items-center justify-between fixed w-100 z-4">
                <CloseSvg onClick={this.props.closeModal} />
                <span className="text b">Filtrer</span>
                <span className="b--black f6 pt1 pointer underline" onClick={mobProps.clearAllFilters}>Effacer</span>
              </div>
              <div className="flex flex-column container-filters">
                <MobFilterName
                  filterType={Settings.filter[category].firstFilter.name}
                  name={Settings.filter[category].firstFilter.name}
                  filterId={Settings.filter[category].firstFilter.index}
                  filterValueSelected={firstFilterValueSelected}
                  filters ={firstFiltersValues}
                  isDisable={firstFilterIsDisable}
                  handleShowFilterList={firstFiltersValues.length >1 ? this.handleShowFilterList: null}
                />
                <MobFilterName
                  filterType={Settings.filter[category].secondFilter.name}
                  name={Settings.filter[category].secondFilter.name}
                  filterId={Settings.filter[category].secondFilter.index}
                  filterValueSelected={secondFilterValueSelected}
                  filters ={secondFiltersValues}
                  isDisable={secondFilterIsDisable}
                  handleShowFilterList={secondFiltersValues.length >1 ? this.handleShowFilterList: null}
                />
                <MobFilterName
                  filterType={Settings.filter[category].thirdFilter.name}
                  name={Settings.filter[category].thirdFilter.name}
                  filterId={Settings.filter[category].thirdFilter.index}
                  filterValueSelected={thirdFilterValueSelected}
                  filters ={thirdFiltersValues}
                  isDisable={thirdFilterIsDisable}
                  handleShowFilterList={thirdFiltersValues.length >1 ? this.handleShowFilterList: null}
                />
                <MobFilterName
                  filterType={Settings.filter[category].fourthFilter.name}
                  name={Settings.filter[category].fourthFilter.name}
                  filterId={Settings.filter[category].fourthFilter.index}
                  filterValueSelected={fourthFilterValueSelected}
                  isDisable={fourthFilterIsDisable}
                  filters ={fourthFiltersValues}
                  handleShowFilterList={ fourthFiltersValues.length >1 ? this.handleShowFilterList: null }
                />
              </div>
              <div className="f5 bg-white pa3 fixed w-100 z-4 bottom-0 helper_shadow" onClick={this.props.closeModal}>
                <div className="f6 br2 bg-black white w-100 tc helper_padding_12">
                  Voir les résultats
                    </div>
              </div>
            </div>
          }
        </div>
        {this.state.filterListIsToggleOn && this.state.name === 'Marque' &&
          <MobFilterChoiceBox
            filterType={Settings.filter[category].firstFilter.name}
            name={Settings.filter[category].firstFilter.name}
            filterId={Settings.filter[category].firstFilter.index}
            filters={firstFiltersValues}
            updateFilter={updateFirstFilter}
            filterValueSelected={firstFilterValueSelected}
            handleShowFilterList={this.handleShowFilterList}
          />
        }
        {this.state.filterListIsToggleOn && this.state.name === 'Modèle' &&
          <MobFilterChoiceBox
            filterType={Settings.filter[category].secondFilter.name}
            name={Settings.filter[category].secondFilter.name}
            filterId={Settings.filter[category].secondFilter.index}
            filters={sortFilterModel}
            updateFilter={updateSecondFilter}
            filterValueSelected={secondFilterValueSelected}
            handleShowFilterList={this.handleShowFilterList}
          />
        }
        {this.state.filterListIsToggleOn && this.state.name === 'Capacité' &&
          <MobFilterChoiceBox
            filterType={Settings.filter[category].thirdFilter.name}
            name={Settings.filter[category].thirdFilter.name}
            filterId={Settings.filter[category].thirdFilter.index}
            filters={sortFilterNumber}
            updateFilter={updateThirdFilter}
            filterValueSelected={thirdFilterValueSelected}
            handleShowFilterList={this.handleShowFilterList}
          />
        }
        {this.state.filterListIsToggleOn && this.state.name === 'Couleur' &&
          <MobFilterChoiceBox
            filterType={Settings.filter[category].fourthFilter.name}
            name={Settings.filter[category].fourthFilter.name}
            filterId={Settings.filter[category].fourthFilter.index}
            filters={fourthFiltersValues}
            updateFilter={updateFourthFilter}
            filterValueSelected={fourthFilterValueSelected}
            handleShowFilterList={this.handleShowFilterList}
          />
        }
      </div>
    )
  }
};
