import React from 'react';

export default class BlankLayout extends React.Component {
  render() {
    return (
      <div>
        {this.props.content}
      </div>
    );
  }
}
