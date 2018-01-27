import React from 'react';

const SkippedList = ({ skipped }) => (
  <div
    style={{
      maxHeight: 286,
      overflow: 'auto',
      borderTop: '1px solid #f3f3f3',
      borderBottom: '1px solid #f3f3f3'
    }}
  >
    <table
      style={{
        width: '100%'
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              textAlign: 'left',
              fontSize: '1.5rem',
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            Event ID
          </th>
          <th
            style={{
              textAlign: 'left',
              fontSize: '1.5rem',
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            Reason
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.values(skipped)
          .sort((a, b) => a.sortOrder < b.sortOrder)
          .map(event => (
            <tr key={event.id}>
              <td
                style={{
                  width: '1%',
                  paddingLeft: 10,
                  paddingRight: 10
                }}
              >
                {event.id}
              </td>
              <td
                style={{
                  width: 'auto',
                  paddingLeft: 10,
                  paddingRight: 10
                }}
              >
                {event.reason}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

export default SkippedList;
