import React from 'react';

// NOTE:: change this into stateless
// https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components
//
// var PictureForm = () => (
//   <form action="/photo" method="POST" encType="multipart/form-data">
//     <input type="file" name="fileUpload" id="fileUpload" className="form-control" />
//     <button className="btn">Submit</button>
//   </form>
// );

export default class PictureForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <form action="/photo" method="POST" encType="multipart/form-data">
        <input type="file" name="fileUpload" id="fileUpload" className="form-control" />
        <button className="btn">Submit</button>
      </form>
    );
  }
}
