import React from 'react';
import classNames from 'classnames';

export default class SideMenuItem extends React.Component {
  render() {
    const { category } = this.props;

    const link = category._id ? `/menu-list/${category._id}` : '/menu-list';
    const imageSrc = `/icons/${category.icon}`;

    const imgStyle = {
      width: '35px',
      verticalAlign: 'middle',
      margin: '0 10px',
    };

    const linkClass = classNames({
      active: this.props.active,
      bold: true,
    });

    const onClick = () => {
      this.props.onClick(category._id)
    };

    return (
      <li className={linkClass}>
        <a href={link} onClick={onClick.bind(this)} className="waves-effect waves-teal">
          <img src={imageSrc} alt={category.name} style={imgStyle}/>

          {category.name}
        </a>
      </li>
    );
  }
}
