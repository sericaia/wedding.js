import React from 'react';

export default class WeddingApp extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <h4>Hello, Daniela and Pedro!</h4>
      <form action="/photo" method="POST" enctype="multipart/form-data">
        <input type="file" name="fileUpload" id="fileUpload" class="form-control" />
        <button class="btn">Submit</button>
      </form>
    </div>
    );
  }
}
