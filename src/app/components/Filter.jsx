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
        <div style={{ textAlign: 'center' }}>
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
              small
              style={{
                margin: 5,
                backgroundColor: gender === 'female' ? '#296596' : '#9c9c9c'
              }}
            />

            <Button
              label="Male"
              onClick={() => this.setGenderFilter('male')}
              small
              style={{
                margin: 5,
                backgroundColor: gender === 'male' ? '#296596' : '#9c9c9c'
              }}
            />

            <Button
              label="Both"
              onClick={() => this.setGenderFilter('both')}
              small
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

            <div style={{ display: 'flex', margin: '0 auto', width: '25%' }}>
              <div
                style={{
                  fontSize: '0.9rem',
                  color: '#777777'
                }}
              >
                Min:
                <input
                  style={{
                    height: 20,
                    fontSize: '1.3rem',
                    width: '50%'
                  }}
                  type="number"
                  value={minAge}
                  onChange={event => this.setMinAge(event.target.value)}
                />
              </div>

              <div
                style={{
                  fontSize: '0.9rem',
                  color: '#777777'
                }}
              >
                Max:
                <input
                  style={{
                    height: 20,
                    fontSize: '1.3rem',
                    width: '50%'
                  }}
                  type="number"
                  value={maxAge}
                  onChange={event => this.setMaxAge(event.target.value)}
                />
              </div>
            </div>
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
                height: 20,
                fontSize: '1.3rem',
                width: '5%'
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
            small
            onClick={() => updateFilter(this.state)}
          />
        </div>
      </div>
    );
  }
}

export default Filter;
