import React from 'react';

export default class MenuItem extends React.Component {
  render() {
    return (
      <div className="col s12 m6 l4">
        <div className="card">
          <div className="card-image">
            <img src={this.props.menuItem.photo} />
              <span className="card-title">
                {this.props.menuItem.name}
              </span>
          </div>
          <div className="card-content">
            <p>{this.props.menuItem.description}</p>
          </div>
          <div className="card-action">
            <a href="#">This is a link</a>
          </div>
        </div>
      </div>
    );
  }
}