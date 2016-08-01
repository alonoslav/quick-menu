import React from 'react';

import WaitersHeaderContainer from '../conteiners/WaitersHeaderContainer';

export default class MainLayout extends React.Component {
  render() {
    return (
      <div>
        <WaitersHeaderContainer title={this.props.title}/>

        <div>
          {this.props.content}
        </div>
      </div>
    );
  }
}