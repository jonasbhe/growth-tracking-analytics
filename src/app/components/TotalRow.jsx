import React from 'react';

class TotalRow extends React.Component {
  state = {
    hovered: false
  };

  toggleHover = () => this.setState(state => ({ hovered: !state.hovered }));

  render() {
    const { label, total, max, toggleVisits } = this.props;
    const { hovered } = this.state;

    return (
      <div
        style={{
          display: 'flex',
          cursor: 'pointer',
          margin: 3,
          borderTop: '1px solid #f3f3f3',
          backgroundColor: hovered ? '#f3f3f3' : 'white'
        }}
        onClick={() => toggleVisits(total.events, label)}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      >
        <div
          style={{
            flex: '1',
            display: 'flex'
          }}
        >
          <div
            style={{
              flex: '1',
              paddingLeft: 10,
              paddingRight: 10,
              textAlign: 'left'
            }}
          >
            {label}
          </div>
          <div
            style={{
              flex: '1',
              paddingLeft: 10,
              paddingRight: 10,
              textAlign: 'right'
            }}
          >
            {total.sum}
          </div>
          <div
            style={{
              flex: '1',
              paddingLeft: 10,
              paddingRight: 10,
              textAlign: 'right'
            }}
          >
            {Math.round(total.sum / max * 1000) / 10}%
          </div>
        </div>
        <i
          id="noprint"
          style={{ flex: '0' }}
          className="fa fa-list"
          aria-hidden="true"
        />
      </div>
    );
  }
}

export default TotalRow;
