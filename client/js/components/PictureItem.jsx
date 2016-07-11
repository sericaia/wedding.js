import React from 'react';

export default class PictureItem extends React.Component {

  getPhotoSrc (photoUrl) {
    return this.props.getPhotos.url + photoUrl;
  }

  render () {
    console.log('I GOT', this.getPhotoSrc(this.props.item));
    return (
      <div>
        <img src={this.getPhotoSrc(this.props.item)} height={this.props.height} />
      </div>
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
  },
  height: '150'
};
