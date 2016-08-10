import React from 'react';

import Spinner from 'react-simple-spinner';

export default class Loader extends React.Component {
  render() {
    return (
      <div className="center-align">
        <Spinner colorHex='#180180'
                 style='double'
                 spinnerWidth='3px'
                 spinDuration={.5}
                 size='100px'/>
      </div>
    );
  }
}
