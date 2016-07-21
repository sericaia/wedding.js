/* global FormData, fetch */
import React from 'react';
import utils from '../../utils/utils.js';

export default class PictureForm extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
    };
  }

  handleChange (e) {
    let data = new FormData();
    data.append('fileUpload', e.target.files[0]);

    fetch(this.props.postPhoto.url, {
      method: this.props.postPhoto.method,
      processData: false,
      contentType: false,
      body: data
    }).then((response) => {
      if (response.ok) {
        console.log('IMG SUBMITTED');
      } else {
        console.log('RESPONSE NOT OK');
      }
    }).catch(function (error) {
      console.log('NOT SUBMITTED', error);
    });
  }

  componentWillUnmount () {
    // Its not yet possible to abort a fetch request
    // see https://github.com/whatwg/fetch/issues/27
  }

  getContentWrapperStyle () {
    var contentWrapper = {
      display: 'flex',
      justifyContent: 'center'
    };

    if (utils.isSmartPhone()) {
      contentWrapper.width = '50%';
    }
    
    return contentWrapper;
  }

  render () {
    return (
      <div style={this.getContentWrapperStyle()}>
        <label type='button' className='btn btn-default' htmlFor='fileUpload' style={{backgroundColor: '#8EB9BC', border: '#4C7D80 solid 1px'}}>
          <span className='glyphicon glyphicon-camera' style={{fontSize: '50px'}}></span>
        </label>
        <input
          type='file'
          name='fileUpload'
          id='fileUpload'
          className='form-control'
          accept='image/*'
          style={{display: 'none'}}
          onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}

PictureForm.defaultProps = {
  postPhoto: {
    url: '/photos',
    method: 'POST'
  }
};
