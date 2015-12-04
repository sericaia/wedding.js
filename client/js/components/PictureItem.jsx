import React from 'react';

export default class PictureItem extends React.Component {

  constructor(props) {
    super(props);
  }

  getPhotoSrc(photoUrl) {
    return this.props.getPhoto.url + photoUrl;
  }

  render() {
    return (
      <div key={this.props.item}>
        <img src={this.getPhotoSrc(this.props.item)} height="150"/>
        <div>{this.props.item}</div>
      </div>
    );
  }
}

PictureItem.propTypes = {
  item: React.PropTypes.string.isRequired
};

PictureItem.defaultProps = {
  getPhoto: {
    url: '/photo/',
    method: 'GET'
  }
};
