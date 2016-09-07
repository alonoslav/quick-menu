import React from 'react';

import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';

import Misc from '../../utils/Misc';
import CommonAlerts from '../../utils/CommonAlerts';

export default class OwnerEditCategoryModal extends React.Component {
  componentDidMount() {
    $('#modal1').openModal({
      dismissible: false,
    });
  }

  closeModal() {
    event.preventDefault();

    $('#modal1').closeModal();
    this.props.onEditCategory();
  }

  categoryChange(event) {
    event.preventDefault();

    const categoryName = this.refs.name.value.trim();

    if (!categoryName) {
      CommonAlerts.error('Введіть назву категорії')
      return false;
    }

    const { category } = this.props;

    category.name = categoryName;

    Meteor.call('category.update', category, Misc.handleMethodResult(() => {
      $('#modal1').closeModal();
      this.props.onEditCategory();
    }));
  }

  render() {
    return (
      <div id="modal1" className="modal">
        <div className="modal-content black-text">
          <h4>Назва</h4>
          <p>
            <input type="text" ref="name" defaultValue={this.props.category.name}/>
          </p>
        </div>
        <div className="modal-footer">
          <a href="#!"
             className="waves-effect waves-red btn-flat"
             onClick={this.closeModal.bind(this)}>Закрити</a>

          <a href="#!"
             className="waves-effect waves-green btn-flat"
             onClick={this.categoryChange.bind(this)}>Гаразд</a>
        </div>
      </div>
    );
  }
}
