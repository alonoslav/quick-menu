import React from 'react';

import { FlowRouter } from 'meteor/kadira:flow-router';

import Loader from './Loader';

export default class OwnerTablesLinks extends React.Component {
  getTablesLinks() {
    const tableBody = this.props.tables.map(table => {
      const selectAll = (event) => event.target.select();

      const tableLink = FlowRouter.url('qrMountPoint', {
        organization: this.props.organizationId,
        table: table._id,
      });

      return (
        <tr key={table._id}>
          <td>Столик {table.name}</td>
          <td>
            <input type="text" value={tableLink} onClick={selectAll} readOnly={true}/>
          </td>
        </tr>
      );
    });
    return (
      <table className="bordered">
        <tbody>
        {tableBody}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 l6 offset-l3">
            {
              !this.props.ready ? <Loader/> :
                this.props.tables.length ?
                  this.getTablesLinks() :
                  <h3 className="center-align">Нічого не знайдено</h3>
            }
          </div>
        </div>
      </div>
    );
  }
}
