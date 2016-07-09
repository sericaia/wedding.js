import React from 'react';
import PictureList from './PictureList.jsx';

export default class WeddingApp extends React.Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
        <h4>Ana e Luís - 27 de Julho de 2016</h4>
        <PictureList />
      </div>
    );
  }
}
