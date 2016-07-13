import React from 'react';
import PictureForm from './PictureForm.jsx';
import PictureList from './PictureList.jsx';

export default class WeddingApp extends React.Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  isSmartPhone() {
    var width = window.fakeInnerWidth || window.innerWidth;
    return width <= 568;
  }

  getPictureStyle() {
    if (this.isSmartPhone()) {
      return {
        width: '100%'
      };
    } else {
      return {
        width: '70%'
      }
    }
  }

  getContentWrapperStyle() {
    var contentWrapper = {
      backgroundColor: '#72a8ab',
      display: '-ms-flex',
      display: '-webkit-flex',
      display: 'flex',
      padding: '30px 30px 0px 0px'
    };

    if (this.isSmartPhone()) {
      contentWrapper.padding = '30px 30px 0px 30px';
      contentWrapper.flexDirection = 'column';
    }

    return contentWrapper;
  }

  render () {
    return (
      <div>
        <div style={this.getContentWrapperStyle()}>
          <div style={
            this.isSmartPhone() ? {width: '100%'} : {width: '30%'}
          }>
            <img src="/assets/logotipo.png" style={{width: '100%'}}/>
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
