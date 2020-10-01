import React, { useState , useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "../helpers/selectors";


export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days })); //prevent make the request every time component renders
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const meetings = dailyAppointments.map((appointment) => {
    return (
      <Appointment
      key={appointment.id}
      {...appointment}
      />
    )
  })

  useEffect(() => {
    const URLdays = "/api/days"
    const URLappointments = "/api/appointments"
    Promise.all([
      axios.get(URLdays),
      axios.get(URLappointments)
    ]).then((response) => {
      setState(prev => ({...prev, 
        days: response[0].data, 
        appointments: response[1].data,
       }));
    })
  }, []);
  return (
    <main className="layout">
      <section className="sidebar">
      <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
      <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {meetings}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

