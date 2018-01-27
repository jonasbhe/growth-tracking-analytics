import React from 'react';

import Button from './Button.jsx';

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

            <Button
              label="Female"
              onClick={() => this.setGenderFilter('female')}
              style={{
                margin: 5,
                backgroundColor: gender === 'female' ? '#296596' : '#9c9c9c'
              }}
            />

            <Button
              label="Male"
              onClick={() => this.setGenderFilter('male')}
              style={{
                margin: 5,
                backgroundColor: gender === 'male' ? '#296596' : '#9c9c9c'
              }}
            />

            <Button
              label="Both"
              onClick={() => this.setGenderFilter('both')}
              style={{
                margin: 5,
                backgroundColor: gender === 'both' ? '#296596' : '#9c9c9c'
              }}
            />
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
          <Button
            label="Apply filter"
            onClick={() => updateFilter(this.state)}
          />
        </div>
      </div>
    );
  }
}

export default Filter;
