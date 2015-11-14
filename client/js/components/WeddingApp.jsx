import React from 'react';

export default class WeddingApp extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <h4>Hello, Daniela and Pedro!</h4>
      <form action="/photo" method="POST" encType="multipart/form-data">
        <input type="file" name="fileUpload" id="fileUpload" className="form-control" />
        <button className="btn">Submit</button>
      </form>
    </div>
    );
  }
}
