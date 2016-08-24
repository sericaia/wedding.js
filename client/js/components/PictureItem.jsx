import React from 'react';
import defaults from '../../../config/defaults';

export default class PictureItem extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      style: null
    };
  }

  getPhotoSrc (photoUrl) {
    return this.props.getPhotos.url + photoUrl;
  }

  onLoad (img) {
    const width = document.getElementById('picItem').clientWidth;
    return this.setState({
      style: {
        border: `${defaults.colors.photoBorder} solid 2px`,
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: width,
        maxHeight: window.innerHeight - 50
      }
    });
  }

  render () {
    return (
      <img
        style={this.state.style}
        src={this.getPhotoSrc(this.props.item)}
        onLoad={this.onLoad.bind(this)} />
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
