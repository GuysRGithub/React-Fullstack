import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
} from "reactstrap";

import Table from "./Table";
export default (props) => {
  const [totalTables, setTotalTables] = useState([]);
  const [selection, setSelection] = useState({
    table: {
      name: null,
      id: null,
    },

    date: new Date(),
    time: null,
    location: "Any Location",
    size: 0,
  });

  //         Detail Booking
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [locations] = useState([
    "Any Location",
    "Rio",
    "New York",
    "Inside",
    "outside",
    "Bar",
  ]);

  const [times] = useState([
    "9AM",
    "10AM",
    "11AM",
    "1PM",
    "2PM",
    "3PM",
    "6PM",
    "7PM",
  ]);

  const [reservationError, setReservationError] = useState(false);

  const getDate = (_) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date =
      months[selection.date.getMonth()] +
      " " +
      selection.date.getDate() +
      " " +
      selection.date.getFullYear();

    let time =
      selection.time > 12
        ? selection.time + 12 + ":00"
        : selection.time + ":00";
    console.log(time);

    const datetime = new Date(date + " " + time);
    return datetime;
  };

  const getEmptyTables = (_) => {
    let tables = totalTables.filter((table) => table.isAvailable);
    return tables.length;
  };

  useEffect(() => {
    // Check availability of tables from DB when a date and time is selected
    if (selection.time && selection.date) {
      (async (_) => {
        let datetime = getDate();
        let res = await fetch("http://localhost:3005/availability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: datetime,
          }),
        });
        res = await res.json();
        // Filter available tables with location and group size criteria
        let tables = res.tables.filter(
          (table) =>
            (selection.size > 0 ? table.capacity >= selection.size : true) &&
            (selection.location !== "Any Location"
              ? table.location === selection.location
              : true)
        );
        setTotalTables(tables);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection.time, selection.date, selection.size, selection.location]);

  const reserve = async (_) => {
    if (
      (booking.name.length === 0) |
      (booking.phone.length === 0) |
      (booking.email.length === 0)
    ) {
      console.log("Incomplete details");
      setReservationError(true);
    } else {
      const datetime = getDate();
      let res = await fetch("http://localhost:3005/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...booking,
          date: datetime,
          table: selection.table.id,
        }),
      });
      res = await res.text();
      console.log("Reserve" + res);
      props.setPage(2);
    }
  };

  const selectTable = (table_name, table_id) => {
    setSelection({
      ...selection,
      table: {
        name: table_name,
        id: table_id,
      },
    });
  };

  const getSizes = (_) => {
    let newSizes = [];
    for (let i = 1; i < 8; i++) {
      newSizes.push(
        <DropdownItem
          key={i}
          className="booking_dropdown_item"
          onClick={(e) => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table,
              },
              size: i,
            };
            setSelection(newSel);
          }}
        >
          {i}
        </DropdownItem>
      );
    }
    return newSizes;
  };

  const getLocations = (_) => {
    let newLocations = [];
    locations.forEach((loc) => {
      newLocations.push(
        <DropdownItem
          key={loc}
          className="booking_dropdown_item"
          onClick={(_) => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table,
              },
              location: loc,
            };
            setSelection(newSel);
          }}
        >
          {loc}
        </DropdownItem>
      );
    });
    return newLocations;
  };

  const getTimes = (_) => {
    let newTimes = [];
    times.forEach((time) => {
      newTimes.push(
        <DropdownItem
          key={time}
          className="booking_dropdown_item"
          onClick={(_) => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table,
              },
              time: time,
            };
            setSelection(newSel);
          }}
        >
          {time}
        </DropdownItem>
      );
    });
    return newTimes;
  };

  const getTables = (_) => {
    console.log("Getting tables");
    if (getEmptyTables() > 0) {
      let tables = [];
      totalTables.forEach((table) => {
        if (table.isAvailable) {
          tables.push(
            <Table
              key={table._id}
              id={table._id}
              chairs={table.capacity}
              name={table.name}
              empty
              selectTable={selectTable}
            ></Table>
          );
        } else {
          tables.push(
            <Table
              key={table._id}
              id={table._id}
              chairs={table.capacity}
              name={table.name}
              selectTable={selectTable}
            ></Table>
          );
        }
      });
      return tables;
    }
  };

  return (
    <div>
      <Row noGutters className="text-center align-items-center pizza-cta">
        <Col>
          <p className="looking-for-pizza">
            {!selection.table.id ? "Book a Table " : "Confirm Reservation "}
            <i
              className={
                !selection.table.id ? "fas fa-chair pizza-slice" : "fas fa-pizza-slice pizza"
              }
            ></i>
          </p>

          <p className="selected-table">
            {selection.table.id
              ? "You are booking table " + selection.table.name
              : null}
          </p>

          <p>
            {reservationError ? (
              <p className="reservation-error">
                ⁕ Please fill out all of the details
              </p>
            ) : null}
          </p>
        </Col>
      </Row>

      {!selection.table.id ? (
        <div id="reservation-stuff">
          <Row noGutters className="text-center align-items-center">
            <Col xs="12" sm="3">
              <input
                type="date"
                required="required"
                className="booking-dropdown"
                value={selection.date.toISOString().split("T")[0]}
                onChange={(e) => {
                  if (!isNaN(new Date(new Date(e.target.value)))) {
                    let newSel = {
                      ...selection,
                      table: {
                        ...selection.table,
                      },
                      date: new Date(e.target.value),
                    };

                    setSelection(newSel);
                  } else {
                    console.log("Invalid Data Input");
                    let newSel = {
                      ...selection,
                      table: {
                        ...selection.table,
                      },
                      date: new Date(),
                    };
                    setSelection(newSel);
                  }
                }}
              ></input>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle
                  color="none"
                  caret
                  className="booking-dropdown"
                >
                  {selection.time === null ? "Select a Time" : selection.time}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getTimes()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle
                  color="none"
                  caret
                  className="booking-dropdown"
                >
                  {selection.location === null
                    ? "Select a Location"
                    : selection.location}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getLocations()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle
                  color="none"
                  caret
                  className="booking-dropdown"
                >
                  {selection.size === null
                    ? "Select a Party size"
                    : selection.size}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getSizes()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
          </Row>
          <Row noGutters className="tables-display">
            <Col>
              {getEmptyTables() > 0 ? (
                <p className="available-tables">{getEmptyTables()} available</p>
              ) : null}
              {selection.date && selection.time ? (
                getEmptyTables() > 0 ? (
                  <div>
                    <div className="table-key">
                      <span className="empty-table"> &nbsp; Available
                      &nbsp;&nbsp;</span>
                      <span className="full-table"> &nbsp; Unavailable
                      &nbsp;&nbsp;</span>
                    </div>
                    <Row noGutters>{getTables()}</Row>
                  </div>
                ) : (
                  <p className="table-display-message">No Available</p>
                )
              ) : (
                <p className="table-display-message">
                  Please select a date and time for your reservation.
                </p>
              )}
            </Col>
          </Row>
        </div>
      ) : (
        <div id="confirm-reservation-stuff">
          <Row
            noGutters
            className="test-center justify-content-center reservation-details-container"
          >
            <Col xs="12" sm="3" className="reservation-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Name"
                className="reservation-input"
                value={booking.name}
                onChange={(e) => {
                  setBooking({
                    ...booking,
                    name: e.target.value,
                  });
                }}
              ></Input>
            </Col>
            <Col xs="12" sm="3" className="reservation-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Phone number"
                className="reservation-input"
                value={booking.phone}
                onChange={(e) => {
                  setBooking({
                    ...booking,
                    phone: e.target.value,
                  });
                }}
              ></Input>
            </Col>
            <Col xs="12" sm="3" className="reservation-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Email"
                className="reservation-input"
                value={booking.email}
                onChange={(e) => {
                  setBooking({
                    ...booking,
                    email: e.target.value,
                  });
                }}
              ></Input>
            </Col>
          </Row>
          <Row noGutters className="test-center">
            <Col>
              <Button
                color="none"
                className="book-table-btn"
                onClick={(_) => {
                  reserve();
                }}
              >
                Book Now
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};
