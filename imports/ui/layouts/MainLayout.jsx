import React from 'react';

import HeaderContainer from '../conteiners/HeaderContainer';

export default class MainLayout extends React.Component {
  render() {
    return (
      <div>
        <HeaderContainer title={this.props.title}/>

        <div className="main">
          {this.props.content}
        </div>
      </div>
    );
  }
}