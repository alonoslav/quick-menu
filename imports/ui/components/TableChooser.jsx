import React from 'react';
import classNames from 'classnames';

import { Table } from '../../api/table/table';

export default class TableChooser extends React.Component {
  componentDidMount() {
    $('#table-chooser-modal').openModal({
      dismissible: false,
    });

    setTimeout(() => {
      $('select').material_select();
    }, 500);
  }

  getTabels() {
    return this.props.tables.map(table => {
      return (<option key={table._id} value={table._id}>{table.name}</option>);
    });
  }

  choseTable(event) {
    event.preventDefault();

    const tableId = $('select').val();
    localStorage.setItem('table', tableId);
    $('#table-chooser-modal').closeModal();
  }

  render() {
    const buttonClass = classNames(
      'modal-action',
      'waves-effect',
      'waves-green',
      'btn-flat',
    );

    return (
      <div id="table-chooser-modal" className="modal">
        <div className="modal-content">
          <h4>Виберіть столик</h4>
          <div className="input-field s12">
            {this.props.ready ?
              <select>
                {this.getTabels()}
              </select> : 'Loading...'
            }
          </div>
        </div>
        <div className="modal-footer">
          <a href="#" className={buttonClass} onClick={this.choseTable.bind(this)}>
            Вибрати
          </a>
        </div>
      </div>
    );
  }
}