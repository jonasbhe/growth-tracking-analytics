import React from "react";

import Datepicker from "./Datepicker.jsx";

class Mainpage extends React.Component {
  render() {
    const {
      eventData,
      trackedEntityInstances,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      getEvents
    } = this.props;

    const { events, averages, totals } = eventData;

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
            margin: 20,
            color: "#777777"
          }}
        >
          Growth Tracking Aggregation App
        </div>
        <hr style={{ border: "1px solid #f3f3f3" }} />
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

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
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
                fontWeight: "bold",
                fontSize: "1rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                outline: "none"
              }}
              onClick={getEvents}
            >
              Go
            </button>
          </div>
        </div>

        <hr style={{ border: "1px solid #f3f3f3" }} />

        <h1>Filter options:</h1>

        <p>Girls || Boys || All</p>

        <p>By age</p>

        <p>By week || By month</p>

        <div>
          <p>Events: {events && Object.values(events).length}</p>
          <p>
            Tracked entity instances:{" "}
            {trackedEntityInstances &&
              Object.values(trackedEntityInstances).length}
          </p>
          <p>Averages:</p>
          <p>WFL: {averages.wfa / Object.values(events).length}</p>
          <p>WFA: {averages.wfl / Object.values(events).length}</p>
          <p>LHFA: {averages.lhfa / Object.values(events).length}</p>
          <p>BFA: {averages.bfa / Object.values(events).length}</p>
          <p>ACFA: {averages.acfa / Object.values(events).length}</p>
          <p>Totals:</p>
          <p>
            WFL: {totals.wfl.SD0_1} {totals.wfl.SD1_2} {totals.wfl.SD2_3}{" "}
            {totals.wfl.SD3}
          </p>
          <p>
            WFA: {totals.wfa.SD0_1} {totals.wfa.SD1_2} {totals.wfa.SD2_3}{" "}
            {totals.wfa.SD3}
          </p>
          <p>
            LHFA: {totals.lhfa.SD0_1} {totals.lhfa.SD1_2} {totals.lhfa.SD2_3}{" "}
            {totals.lhfa.SD3}
          </p>
          <p>
            BFA: {totals.bfa.SD0_1} {totals.bfa.SD1_2} {totals.bfa.SD2_3}{" "}
            {totals.bfa.SD3}
          </p>
          <p>
            ACFA: {totals.acfa.SD0_1} {totals.acfa.SD1_2} {totals.acfa.SD2_3}{" "}
            {totals.acfa.SD3}
          </p>
        </div>
      </div>
    );
  }
}

export default Mainpage;
