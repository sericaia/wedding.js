import $ from 'jquery';
import React from 'react';
import utils from '../../utils/utils.js';
import defaults from '../../../config/defaults';

export default class PictureForm extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      percentVal: 0
    };
  }

  handleChange (e) {
    let data = new FormData();
    data.append('fileUpload', e.target.files[0]);

    var that = this;

    this.serverRequest = $.ajax({
      url: this.props.postPhoto.url,
      method: this.props.postPhoto.method,
      processData: false,
      contentType: false,
      data: data,
      beforeSend: function () {
        that.setState({
          percentVal: 0
        });
        console.log('>>> INITED!');
      },
      uploadProgress: function (event, position, total, percentComplete) {
        console.log('>>> PROGRESS:', percentComplete);
        that.setState({
          percentVal: percentComplete
        });
      },
      complete: function (xhr) {
        console.log('>>> FINISHED!');
        that.setState({
          percentVal: 100
        });
      },
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
      // display: 'flex',
      justifyContent: 'center'
    };

    if (utils.isSmartPhone()) {
      contentWrapper.width = '50%';
    }

    return contentWrapper;
  }

  renderProgressBar () {
    if (this.state.percentVal > 0) {
      return (
        <div style={{
          width: '100%',
          padding: '5px'
        }}>
          <div className='progress' style={{width: '100%'}}>
            <div className='progress-bar'
              role='progressbar'
              aria-valuenow={this.state.percentVal}
              aria-valuemin='0'
              aria-valuemax={this.props.progressValueMax}
              style={{width: `${this.state.percentVal}%`}}>
                {this.state.percentVal} %
            </div>
          </div>
        </div>
      );
    }
  }

  render () {
    return (
      <div style={this.getContentWrapperStyle()}>
        <div style={{
          width: '100%',
          textAlign: 'center',
          marginBottom: '5px'
        }}>
          <label type='button'
            className='btn btn-default'
            htmlFor='fileUpload'
            style={{backgroundColor: defaults.colors.cameraIconBorder, border: `${defaults.colors.cameraIconBorder} solid 1px`}}>
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
        {this.renderProgressBar()}
      </div>
    );
  }
}

PictureForm.defaultProps = {
  postPhoto: {
    url: '/photos',
    method: 'POST'
  },
  progressValueMax: 100,
  progressValueMin: 0
};
