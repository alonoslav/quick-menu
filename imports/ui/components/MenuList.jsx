import React from 'react';
import Masonry from 'react-masonry-component';

import MenuItem from './MenuItem';
import TableChooserContainer from '../conteiners/TableChooserContainer';
import Loader from './Loader';


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
        {this.props.organizationId ? this.props.tableChosen ? '' : <TableChooserContainer /> : ''}

        {
          !this.props.ready ? <Loader/> :
          this.props.menuList.length ?
            <Masonry className={'row'}>{this.getMenuList()}</Masonry> :
            <h3 className="center-align">Нічого не знайдено</h3>
        }
      </div>
    );
  }
}
