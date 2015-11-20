import React from 'react';

export default class WeddingApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    $.ajax({
      url: this.props.getAllPhotos.url,
      method: this.props.getAllPhotos.method,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.getAllPhotos, status, err.toString());
      }.bind(this)
    });
  }

  getPhotoSrc(photoUrl) {
    return this.props.getPhoto.url + photoUrl;
  }

  render() {
    return (
    <div>
      <h4>Hello, Daniela and Pedro!</h4>
      <form action="/photo" method="POST" encType="multipart/form-data">
        <input type="file" name="fileUpload" id="fileUpload" className="form-control" />
        <button className="btn">Submit</button>
      </form>

      { /* TODO: move into new component */ }
      <div>
        <h4>File List</h4>
        { this.state.data.map(function(item) {
          return (
              <div key={item}>
                <img src={this.getPhotoSrc(item)} />
                <div>{item}</div>
              </div>
            );
        }, this) }
      </div>
    </div>
    );
  }
}

WeddingApp.defaultProps = {
  getAllPhotos: {
    url: '/photo',
    method: 'GET'
  },
  getPhoto: {
    url: '/photo/',
    method: 'GET'
  }
};
