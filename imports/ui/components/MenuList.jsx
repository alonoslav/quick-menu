import React from 'react';
import Masonry from 'react-masonry-component';

import MenuItem from './MenuItem';
import TableChooserContainer from '../conteiners/TableChooserContainer';


export default class MenuList extends React.Component {
  getMenuList() {
    const { menuList } = this.props;

    return menuList.map(menuItem => <MenuItem key={menuItem._id}
                                              menuItem={menuItem}
                                              cartItems={this.props.cartItems}/>);
  }

  render() {
    return (
      <div>
        {this.props.tableChosen ? '' : <TableChooserContainer />}

        {
          this.props.menuList.length ?
            <Masonry className={'row'}>{this.getMenuList()}</Masonry> :
            <h4 className="center-align">Не знайдено нічогісінько...</h4>
        }
      </div>
    );
  }
}
