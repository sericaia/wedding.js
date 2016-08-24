import $ from 'jquery';
import React from 'react';
import utils from '../../utils/utils.js';
import defaults from '../../../config/defaults';

export default class PictureForm extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
    };
  }

  handleChange (e) {
    let data = new FormData();
    data.append('fileUpload', e.target.files[0]);

    this.serverRequest = $.ajax({
      url: this.props.postPhoto.url,
      method: this.props.postPhoto.method,
      processData: false,
      contentType: false,
      data: data,
      success: function (data) {
      },
      error: function (xhr, status, err) {
        console.log('NOT SUBMITTED', status, err);
      }
    });
  }

  componentWillUnmount () {
    this.serverRequest.abort();
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
        <label type='button' className='btn btn-default' htmlFor='fileUpload' style={{backgroundColor: defaults.colors.cameraIconBorder, border: `${defaults.colors.cameraIconBorder} solid 1px`}}>
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
