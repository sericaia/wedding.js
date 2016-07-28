import $ from 'jquery';

import React from 'react';

const Slider = require('react-slick');

import PictureItem from './PictureItem.jsx';

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
      dots: false,
      arrows: false,
      slidesToShow: 1,
      lazyLoad: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000
    };

    if (!this.state.data.length) {
      return (<p>Loading data.. </p>);
    } else {
      return (
        <div>
          <Slider {...settings}>
            {this.state.data.map((item) => {
              return (
                <div id='picItem' ref={item} key={item} style={{backgroundColor: '#72a8ab'}}>
                  <PictureItem item={item} />
                </div>);
            })}
          </Slider>
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
