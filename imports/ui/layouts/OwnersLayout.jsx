import React from 'react';

import OwnersHeaderContainer from '../conteiners/OwnersHeaderContainer';

export default class OwnersLayout extends React.Component {
  render() {
    return (
      <div>
        <OwnersHeaderContainer title={this.props.title}/>

        <div>
          {this.props.content}
        </div>
      </div>
    );
  }
}