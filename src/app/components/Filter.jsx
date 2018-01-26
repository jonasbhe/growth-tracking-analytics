import React from 'react';

class Filter extends React.Component {
  state = {
    gender: 'both',
    filterSd: 5,
    minAge: 0,
    maxAge: 24
  };

  setGenderFilter = gender => this.setState({ gender });

  setFilterSd = filterSd => this.setState({ filterSd });

  setMinAge = minAge => this.setState({ minAge });

  setMaxAge = maxAge => this.setState({ maxAge });

  render() {
    const { updateFilter } = this.props;
    const { gender, filterSd, minAge, maxAge } = this.state;

    return (
      <div>
        <div>
          <div style={{ margin: 10 }}>
            <div
              style={{
                fontSize: '1.2rem',
                color: '#777777'
              }}
            >
              Filter by gender
            </div>
            <button
              style={{
                height: 42,
                background: 'unset',
                cursor: 'pointer',
                backgroundColor: gender === 'female' ? '#296596' : '#9c9c9c',
                color: 'white',
                fontSize: '1.1rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                border: 'none',
                margin: 5
              }}
              onClick={() => this.setGenderFilter('female')}
            >
              Girls
            </button>
            <button
              style={{
                height: 42,
                background: 'unset',
                cursor: 'pointer',
                backgroundColor: gender === 'male' ? '#296596' : '#9c9c9c',
                color: 'white',
                fontSize: '1.1rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                border: 'none',
                margin: 5
              }}
              onClick={() => this.setGenderFilter('male')}
            >
              Boys
            </button>
            <button
              style={{
                height: 42,
                background: 'unset',
                cursor: 'pointer',
                backgroundColor: gender === 'both' ? '#296596' : '#9c9c9c',
                color: 'white',
                fontSize: '1.1rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                border: 'none',
                margin: 5
              }}
              onClick={() => this.setGenderFilter('both')}
            >
              Both
            </button>
          </div>

          <div style={{ margin: 10 }}>
            <div
              style={{
                fontSize: '1.2rem',
                color: '#777777'
              }}
            >
              Filter by age (in months)
            </div>
            Min:
            <input
              style={{
                height: 25,
                fontSize: '1.5rem',
                width: '10%'
              }}
              type="number"
              value={minAge}
              onChange={event => this.setMinAge(event.target.value)}
            />
            Max:
            <input
              style={{
                height: 25,
                fontSize: '1.5rem',
                width: '10%'
              }}
              type="number"
              value={maxAge}
              onChange={event => this.setMaxAge(event.target.value)}
            />
          </div>

          <div style={{ margin: 10 }}>
            <div
              style={{
                fontSize: '1.2rem',
                color: '#777777'
              }}
            >
              Filter zscores above +/-
            </div>
            <input
              style={{
                height: 25,
                fontSize: '1.5rem',
                width: '10%'
              }}
              type="number"
              value={filterSd}
              onChange={event => this.setFilterSd(event.target.value)}
            />
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              height: 42,
              background: 'unset',
              cursor: 'pointer',
              backgroundColor: '#296596',
              color: 'white',
              fontSize: '1.1rem',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              border: 'none'
            }}
            onClick={() => updateFilter(this.state)}
          >
            Apply filter
          </button>
        </div>
      </div>
    );
  }
}

export default Filter;
