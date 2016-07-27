import React from 'react';

import MenuItem from './MenuItem';

export default class MenuList extends React.Component {
  getMenuList() {
    const { menuList } = this.props;
    if (menuList.length) {
      return menuList.map(menuItem => <MenuItem key={menuItem._id} menuItem={menuItem} />);
    }

    return <h2>No items</h2>;
  }

  render() {
    return (
      <div>
        <h3>MenuList</h3>

        <div className="row">
          {this.props.ready ? this.getMenuList() : 'loading...'}
        </div>
      </div>
    );
  }
}