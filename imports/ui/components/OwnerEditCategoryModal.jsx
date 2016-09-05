import React from 'react';

export default class OwnerEditCategoryModal extends React.Component {
  render() {
    return (
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>Назва</h4>
          <p>
            <input type="text" />
          </p>
        </div>
        <div className="modal-footer">
          <a href="#!"
             className=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>
    );
  }
}
