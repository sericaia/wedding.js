import React from 'react';

const Carousel = require('react-slick');

import PictureItem from './PictureItem.jsx';
import PictureForm from './PictureForm.jsx';

import Nes from 'nes';

export default class PictureList extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      data: []
    };
    this.client = new Nes.Client('ws://localhost:3000');
  }

  componentDidMount () {
    this.serverRequest = $.ajax({
      url: this.props.getAllPhotos.url,
      method: this.props.getAllPhotos.method,
      success: (data) => {
        this.setState({data: data});
      },
      error: (xhr, status, err) => {
        console.error(this.props.getAllPhotos, status, err.toString());
      }
    });
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
    this.serverRequest.abort();
  }

  render () {
    const settings = {
      dots: true,
      slidesToShow: 1
      // infinite: true,
      // speed: 500,
      // slidesToShow: 1,
      // autoplay: true,
      // autoplaySpeed: 3000,
      // slidesToScroll: 1,
      // lazyLoad: false,
      // arrows: true
    };
    return (
      <div>
        <div>
          <Carousel {...settings}>
            {this.state.data.map(function (item) {
              return (<PictureItem key={item} item={item} />);
            }, this)}
          </Carousel>
        </div>
        <PictureForm />
      </div>
    );
  }
}

PictureList.mixins = [Carousel.ControllerMixin];

PictureList.defaultProps = {
  getAllPhotos: {
    url: '/photos',
    method: 'GET'
  }
};
