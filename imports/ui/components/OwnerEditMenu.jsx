import React from 'react';

import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { Materialize } from 'meteor/materialize:materialize';

import Misc from '/imports/utils/Misc';
import Loader from './Loader';

const onReady = () => {
  Meteor.setTimeout(() => {
    $('select').material_select();
    Materialize.updateTextFields();
  }, 100);
};

export default class OwnerEditMenu extends React.Component {
  getCategories() {
    const { categories } = this.props;

    if (categories.length) {
      return categories.map(category => <option key={category._id} value={category._id}>
        {category.name}</option>);
    }

    return <option value="" disabled={true}>Виберіть категорію</option>
  }

  editMenu(event) {
    event.preventDefault();

    const { refs } = this;
    const { menuItem } = this.props;

    const fields = ['name', 'categoryId', 'description', 'photo', 'price'];

    const updatedMenuItem = Misc.getValuesFromRefs(refs, fields, true);

    _.extend(updatedMenuItem, {
      description: updatedMenuItem.description.replace(/\n/g, '<br/>'),
      price: parseFloat(updatedMenuItem.price),
    });

    const updatedMenu = _.extend(menuItem, updatedMenuItem);

    Meteor.call('menu.edit', updatedMenu, Misc.handleMethodResult(() => {
      FlowRouter.go('ownerMenuList');
    }));
  }

  getDescription() {
    const { menuItem } = this.props;
    const description = menuItem.description;

    return description.replace(/\<br\/>/g, "\n");
  }

  render() {
    const { menuItem, ready } = this.props;

    if (ready) {
      onReady();
    }

    return (
      !ready ? <Loader/> : (
        <div className="row">
          <form className="col s12 l6 offset-l3 m8 offset-m2" onSubmit={this.editMenu.bind(this)}>
            <div className="row">
              <div className="input-field col s12">
                <input id="name" ref="name" type="text" className="validate" required={true}
                       defaultValue={menuItem.name}/>
                <label htmlFor="name">Назва</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input id="price" ref="price" type="text" className="validate" required={true}
                       defaultValue={menuItem.price}/>
                <label htmlFor="price">Ціна</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12" required={true}>
                <select ref="categoryId" selected={menuItem.categoryId} readOnly={true}>
                  {this.getCategories()}
                </select>
                <label>Категорія</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12" required={true}>
              <textarea id="description" ref="description"
                        className="materialize-textarea"
                        defaultValue={this.getDescription()}></textarea>
                <label htmlFor="description">Опис</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input id="photo" ref="photo" type="text" className="validate" required={true}
                       defaultValue={menuItem.photo}/>
                <label htmlFor="photo">Фото (http://)</label>
              </div>
            </div>

            <button className="btn waves-effect waves-light orange" type="submit" name="action">
              Редагувати
            </button>
          </form>
        </div>
      )
    );
  }
}
