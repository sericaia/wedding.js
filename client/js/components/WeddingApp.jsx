import React from 'react';
import utils from '../../utils/utils.js';
import PictureForm from './PictureForm.jsx';
import PictureList from './PictureList.jsx';

export default class WeddingApp extends React.Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  getPictureStyle () {
    if (utils.isSmartPhone()) {
      return {
        width: '100%'
      };
    } else {
      return {
        width: '70%'
      };
    }
  }

  getContentWrapperStyle () {
    var contentWrapper = {
      backgroundColor: '#72a8ab',
      // display: '-ms-flex',
      display: '-webkit-flex',
      // display: 'flex',
      padding: '30px 30px 0px 0px'
    };

    if (utils.isSmartPhone()) {
      contentWrapper.padding = '30px 30px 0px 30px';
      contentWrapper.flexDirection = 'column';
    }

    return contentWrapper;
  }

  render () {
    var isSmartPhone = utils.isSmartPhone();
    return (
      <div>
        <div style={this.getContentWrapperStyle()}>
          <div style={isSmartPhone ? {width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'} : {width: '30%'}}>
            <img
              src={isSmartPhone ? '/assets/logotipo_mobile.png' : '/assets/logotipo.png'}
              style={isSmartPhone ? {width: '50%'} : {width: '100%'}} />
            <PictureForm />
          </div>
          <div style={this.getPictureStyle()}>
            <PictureList />
          </div>
        </div>
      </div>
    );
  }
}
