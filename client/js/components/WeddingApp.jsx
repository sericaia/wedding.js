import React from 'react';
import PictureList from './PictureList.jsx';

export default class WeddingApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h4>WeddingJS</h4>
        <PictureList />
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
