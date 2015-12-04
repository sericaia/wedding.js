import React from 'react';
import PictureItem from './PictureItem.jsx';
import PictureForm from './PictureForm.jsx';

export default class PictureList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    $.ajax({
      url: this.props.getAllPhotos.url,
      method: this.props.getAllPhotos.method,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.getAllPhotos, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    return (
      <div>
        <PictureForm />

        <div>
          <h4>File List</h4>
          { this.state.data.map(function(item) {
            return (<PictureItem item={item} />);
          }, this) }
        </div>
      </div>
    );
  }
}

PictureList.defaultProps = {
  getAllPhotos: {
    url: '/photo',
    method: 'GET'
  }
};
