import React from 'react';
import Modal from 'react-modal';
import MobFilterList from './Components/FilterInterfaceMob/index';

Modal.setAppElement('#rootFilters');

const header = document.getElementById('header');

const customStyles = {
  content : {
    top: '0',
    left: '0',
    right : '0',
    bottom: '0'
  }
};

export default class MobFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

    openModal() {
      this.setState({modalIsOpen: true});
      //hide nav when modal is open
      if (header) {
        header.style.display='none';
      }
      //prevent scroll on body
      document.body.style.overflow = 'hidden';
    }

    closeModal() {
      this.setState({modalIsOpen: false});
      //show nav when modal is close
      if (header) {
        header.style.display='block';
      }
      document.body.style.overflow = 'unset';
    }

    render() {
      const { category, commonProps, mobProps} =this.props
      const buttonVisible = this.state.modalIsOpen ? 'dn' : 'db';

      return (
        <div className="helper_hide-AboveLandscape dn-ns flex justify-center">
          <div className={`filterMob_button ${buttonVisible} f16 white tc bg-black br2 pa3 mv4 pointer`} onClick={this.openModal}>
            Filtrer
          </div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
          >
              <MobFilterList
                category ={category}
                closeModal={this.closeModal}
                commonProps={commonProps}
                mobProps={mobProps}
              />
          </Modal>
        </div>
      )
    }
};


