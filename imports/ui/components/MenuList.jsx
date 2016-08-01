import React from 'react';

import MenuItem from './MenuItem';
import TableChooserContainer from '../conteiners/TableChooserContainer';

export default class MenuList extends React.Component {
  getMenuList() {
    const { menuList } = this.props;
    if (menuList.length) {
      return menuList.map(menuItem => <MenuItem key={menuItem._id}
                                                menuItem={menuItem}
                                                cartItems={this.props.cartItems}
      />);
    }

    return <h2>No items</h2>;
  }

  render() {
    return (
      <div className="row">
        {this.props.tableChosen ? '' : <TableChooserContainer />}

        {this.props.ready ? this.getMenuList() : 'loading...'}
      </div>
    );
  }
}