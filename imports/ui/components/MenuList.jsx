import React from 'react';

import MenuItem from './MenuItem';
import TableChooserContainer from '../conteiners/TableChooserContainer';

export default class MenuList extends React.Component {
  getMenuList() {
    const { menuList } = this.props;

    if (menuList.length) {
      return menuList.map(menuItem => <MenuItem key={menuItem._id}
                                                menuItem={menuItem}
                                                cartItems={this.props.cartItems}/>);
    }

    return <h4 className="center-align">Не знайдено нічогісінько...</h4>;
  }

  render() {
    return (
      <div className="row">
        {this.props.tableChosen ? '' : <TableChooserContainer />}

        {this.getMenuList()}
      </div>
    );
  }
}
