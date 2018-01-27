import React from 'react';

class Button extends React.Component {
  render() {
    const { label, onClick, small, style, disabled = false } = this.props;

    return (
      <button
        id="noprint"
        style={{
          height: small ? '22px' : '42px',
          background: 'unset',
          cursor: 'pointer',
          backgroundColor: '#296596',
          color: 'white',
          fontSize: small ? '0.7rem' : '1.1rem',
          paddingLeft: small ? '0.5rem' : '1rem',
          paddingRight: small ? '0.5rem' : '1rem',
          border: 'none',
          ...style
        }}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    );
  }
}

export default Button;
