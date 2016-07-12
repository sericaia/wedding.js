import React from 'react';

var Slider = require('react-slick');

import PictureItem from './PictureItem.jsx';
import PictureForm from './PictureForm.jsx';

import Nes from 'nes';

export default class PictureList extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      data: []
    };
    this.client = new Nes.Client('ws://' + process.env.WEDDING_JS_HOST + ':' + process.env.WEDDING_JS_PORT);
  }

  componentDidMount () {

    fetch(this.props.getAllPhotos.url, {
      method: this.props.getAllPhotos.method
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      this.setState({data: data});
    }.bind(this)).catch(function(error) {
      console.error(this.props.getAllPhotos, error.toString());
    }.bind(this));

    this.client.connect((err) => {
      if (err) {
        console.log('COULD NOT CONNECT', err);
      }
      this.client.subscribe('/photos', this.handleData.bind(this), (err) => {
        if (err) {
          console.log('COULD NOT SUBSCRIBE', err);
        }
      });
    });
  }

  handleData (data) {
    const newData = this.state.data.concat([data]);
    this.setState({
      data: newData
    });
  }

  componentWillUnmount () {
    // Its not yet possible to abort a fetch request
    // see https://github.com/whatwg/fetch/issues/27
  }

  render () {
    const settings = {
      dots: true,
      slidesToShow: 1,
      arrows: true,
      lazyLoad: true,
      // infinite: true,
      // speed: 500,
      // slidesToShow: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      // slidesToScroll: 1,
    };

    if (!this.state.data.length) {
      return (<p>Loading data.. </p>);
    }

    else {
      return (
        <div>
          <Slider {...settings}>
            {this.state.data.map((item) => {
              return (
                <div key={item}>
                  <PictureItem item={item} />
                </div>);
            })}
          </Slider>
          <PictureForm />
        </div>
      );
    }
  }
}

PictureList.defaultProps = {
  getAllPhotos: {
    url: '/photos',
    method: 'GET'
  }
};
