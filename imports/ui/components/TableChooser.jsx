import React from 'react';
import classNames from 'classnames';

import { $ } from 'meteor/jquery';

export default class TableChooser extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      $('#table-chooser-modal').openModal({
        dismissible: false,
      });

      $('select').material_select();
    }, 500);
  }

  getTables() {
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
            <select>
              {this.getTables()}
            </select>
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