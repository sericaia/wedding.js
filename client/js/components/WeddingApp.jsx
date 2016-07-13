import React from 'react';
import PictureForm from './PictureForm.jsx';
import PictureList from './PictureList.jsx';

export default class WeddingApp extends React.Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
        <div style={{
          backgroundColor: '#72a8ab',
          display: '-ms-flex',
          display: '-webkit-flex',
          display: 'flex',
          padding: '30px 30px 0px 0px'
        }}>
          <div style={{
            width: '30%'
          }}>
            <img src="/assets/logotipo.png" style={{width: '100%'}}/>
            <PictureForm />
          </div>
          <div style={{
            width: '70%'
          }}>
            <PictureList />
          </div>
        </div>
      </div>
    );
  }
}
