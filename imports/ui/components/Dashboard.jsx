import React from 'react';

import MenuListContainer from '../conteiners/MenuListContainer';

export default class Dashboard extends React.Component {
  getContent() {
    const permissionChecker = this.props.permissionChecker;

    if (permissionChecker.isCustomer()) {
      return <MenuListContainer />;
    }

    return <h1>Loading...</h1>;
  }

  render() {
    return (
      <div>
        {this.getContent()}
      </div>
    );
  }
}