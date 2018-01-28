import React from 'react';

import Datepicker from './Datepicker.jsx';
import Button from './Button.jsx';

const SearchSection = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  ouName,
  ouLevel,
  getEvents,
  loading
}) => (
  <div
    style={{
      width: '100%'
    }}
  >
    <div
      style={{
        textAlign: 'center',
        fontSize: '2.5rem',
        margin: 10,
        color: '#777777'
      }}
    >
      Growth Tracking Analytics
    </div>

    <hr style={{ border: '1px solid #f3f3f3' }} />

    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}
    >
      <Datepicker label="Start date:" date={startDate} setDate={setStartDate} />

      <Datepicker label="End date:" date={endDate} setDate={setEndDate} />
    </div>

    <div
      style={{
        textAlign: 'center',
        fontSize: '1.8rem',
        margin: 10,
        color: '#777777'
      }}
    >
      {!ouName
        ? 'Choose an organization unit.'
        : ouLevel < 4 ? 'Choose a lower level organisation unit.' : ouName}
    </div>

    <div
      style={{
        textAlign: 'center',
        marginBottom: 10
      }}
    >
      <Button
        label="Get events"
        onClick={getEvents}
        style={{
          backgroundColor:
            !ouName || ouLevel < 4 || loading ? '#9c9c9c' : '#296596'
        }}
        disabled={!ouName || ouLevel < 4 || loading}
      />
    </div>

    <hr style={{ border: '1px solid #f3f3f3' }} />
  </div>
);

export default SearchSection;
