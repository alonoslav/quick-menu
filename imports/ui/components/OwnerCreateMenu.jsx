import React from 'react';

import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';

import { FlowRouter } from 'meteor/kadira:flow-router';

import Misc from '/imports/utils/Misc';
import CommonAlerts from '/imports/utils/CommonAlerts';

export default class OwnerCreateMenu extends React.Component {
  componentDidMount() {
    Meteor.setTimeout(() => $('select').material_select(), 1000);
  }

  getCategories() {
    const { categories } = this.props;

    if (categories.length) {
      return categories.map(category => <option key={category._id} value={category._id}>
        {category.name}</option>);
    }

    return <option value="" disabled={true}>Виберіть категорію</option>
  }

  createMenu(event) {
    event.preventDefault();

    const { refs } = this;

    const fields = ['name', 'categoryId', 'description', 'photo', 'price'];

    const menuItem = Misc.getValuesFromRefs(refs, fields, true);

    _.extend(menuItem, {
      description: menuItem.description.replace(/\n/g, '<br/>'),
      price: parseFloat(menuItem.price),
    });

    Meteor.call('menu.add', menuItem, Misc.handleMethodResult(() => {
      CommonAlerts.success('Елемент додано');
      FlowRouter.go('ownerMenuList');
    }));
  }

  render() {
    const category = FlowRouter.getParam('category');

    return (
      <div className="row">
        <form className="col s12 l6 offset-l3 m8 offset-m2" onSubmit={this.createMenu.bind(this)}>
          <div className="row">
            <div className="input-field col s12">
              <input id="name" ref="name" type="text" className="validate" required={true}/>
              <label htmlFor="name">Назва</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input id="price" ref="price" type="text" className="validate" required={true}/>
              <label htmlFor="price">Ціна</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12" required={true}>
              <select ref="categoryId" value={category} readOnly={true}>
                {this.getCategories()}
              </select>
              <label>Категорія</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12" required={true}>
              <textarea id="description" ref="description"
                        className="materialize-textarea"></textarea>
              <label htmlFor="description">Опис</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input id="photo" ref="photo" type="text" className="validate" required={true}/>
              <label htmlFor="photo">Фото (http://)</label>
            </div>
          </div>

          <button className="btn waves-effect waves-light orange" type="submit" name="action">
            Створити
          </button>
        </form>
      </div>
    );
  }
}
