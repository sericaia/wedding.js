import React from 'react';

export default class PictureItem extends React.Component {

  getPhotoSrc (photoUrl) {
    return this.props.getPhotos.url + photoUrl;
  }

  render () {
    console.log('I GOT', this.getPhotoSrc(this.props.item));
    return (
      <img
        style={{width: '100%'}}
        src={this.getPhotoSrc(this.props.item)}/>
    );
  }
}

PictureItem.propTypes = {
  item: React.PropTypes.string.isRequired
};

PictureItem.defaultProps = {
  getPhotos: {
    url: '/photos/',
    method: 'GET'
  }
};
