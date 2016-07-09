import React from 'react';

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

  render () {
    return (
      <div>
        <label htmlFor='fileUpload'>
          <span className='glyphicon glyphicon-camera'></span>
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
