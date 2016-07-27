import React from 'react';

export default class MenuItem extends React.Component {
  formatPrice(price) {
    return price.toFixed(2);
  }

  render() {
    const priceStyle = {
      fontSize: '20px'
    };

    return (
      <div className="col s12 m6 l4">
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={this.props.menuItem.photo}/>
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
              {this.props.menuItem.name}
              <i className="material-icons right">more_vert</i>
            </span>
            <p>
              <span style={priceStyle}>
                {this.formatPrice(this.props.menuItem.price)} грн.
              </span>
              <a href="#" className="waves-effect waves-light btn orange right">
                <i className="material-icons left">shopping_cart</i>
                В кошик
              </a>
            </p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              {this.props.menuItem.name}
              <i className="material-icons right">close</i>
            </span>
            <p>
              {this.props.menuItem.description}
            </p>
          </div>
        </div>
      </div>
    );
  }
}