import React from 'react';

import Header from '../components/Header';

export default class MainLayout extends React.Component {
  render() {
    return (
      <div>
        <Header title={this.props.title}/>

        <div>
          {this.props.content}
        </div>
      </div>
    );
  }
}