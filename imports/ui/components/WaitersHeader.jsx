import React from 'react';

import { _ } from 'meteor/underscore';

export default class WaitersHeader extends React.Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="red lighten-1">
          <div className="nav-wrapper">
            <a href="/" className="brand-logo center">
              {this.props.title}
            </a>

            <ul id="nav-mobile" className="right">
              <li>
                <a href="/logout">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
