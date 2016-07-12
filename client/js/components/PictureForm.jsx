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

    fetch(this.props.postPhoto.url, {
      method: this.props.postPhoto.method,
      processData: false,
      contentType: false,
      body: data
    }).then(function(response) {
      if(response.ok) {
        console.log('IMG SUBMITTED');
      } else {
        console.log('RESPONSE NOT OK');
      }
    }).catch(function(error) {
      console.log('NOT SUBMITTED', error);
    });
  }

  componentWillUnmount () {
    // Its not yet possible to abort a fetch request
    // see https://github.com/whatwg/fetch/issues/27
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
