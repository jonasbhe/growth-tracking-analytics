import React from "react";

import Datepicker from "./Datepicker.jsx";
import Results from "./Results.jsx";

class Mainpage extends React.Component {
  render() {
    const {
      ouName,
      eventData,
      trackedEntityInstances,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      getEvents
    } = this.props;

    const {
      events,
      averages,
      totals,
      distribution,
      skipped,
      timeline
    } = eventData;

    console.log(timeline);

    return (
      <div
        style={{
          width: "100%"
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            margin: 10,
            color: "#777777"
          }}
        >
          Growth Tracking Analytics App
        </div>
        <hr style={{ border: "1px solid #f3f3f3" }} />
        <div
          style={{
            textAlign: "center",
            fontSize: "1.8rem",
            margin: 10,
            color: "#777777"
          }}
        >
          {ouName || "Choose an organization unit."}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >
          <Datepicker
            label="Start date:"
            date={startDate}
            setDate={setStartDate}
          />

          <Datepicker label="End date:" date={endDate} setDate={setEndDate} />
        </div>
        <div
          style={{
            textAlign: "center",
            marginBottom: 10
          }}
        >
          <button
            style={{
              height: 42,
              background: "unset",
              cursor: "pointer",
              backgroundColor: "#296596",
              color: "white",
              fontSize: "1.1rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              outline: "none"
            }}
            //disabled={!ouName} // TODO: Disable button if no org unit is selecged
            onClick={getEvents}
          >
            Get events
          </button>
        </div>
        <hr style={{ border: "1px solid #f3f3f3" }} />
        <h3>Filter options:</h3>
        <p>Girls || Boys || All</p>
        <p>By age</p>
        <h3>Chart options:</h3>
        <p>By week || By month</p>
        <p>Skipped events: {Object.values(skipped).length}</p>
        <hr />
        Tab to switch between results, filterable visit list, etc
        <Results
          events={events}
          averages={averages}
          distribution={distribution}
          totals={totals}
          timeline={timeline}
        />
        List of trackedEntityInstances sortable by different indicator severity
      </div>
    );
  }
}

export default Mainpage;
