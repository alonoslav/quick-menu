import React from 'react';

import { FlowRouter } from 'meteor/kadira:flow-router';

export default class OwnersHeader extends React.Component {
  componentDidMount() {
    $(".dropdown-button").dropdown({ hover: false });
  }

  render() {
    return (
      <div>
        <ul id="dropdown1" className="dropdown-content">
          <li>
            <a href="/owner-menu">
              Меню
            </a>
          </li>

          <li>
            <a href="/tables-links">
              Посилання
            </a>
          </li>

          <li>
            <a href="/logout">
              Вийти
            </a>
          </li>
        </ul>

        <div className="navbar-fixed">
          <nav className="red lighten-1">
            <div className="nav-wrapper">
            <span className="brand-logo center">
              {this.props.title}
            </span>

              <ul id="nav-mobile" className="right">
                <li>
                  <a className="dropdown-button" href="#!" data-activates="dropdown1">
                    <i className="material-icons right">more_vert</i>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
