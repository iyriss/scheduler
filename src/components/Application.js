import React, { useState , useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days })); //prevent make the request every time component renders
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  useEffect(() => {
    const URLdays = "/api/days"
    const URLappointments = "/api/appointments"
    const URLinterviewers = "/api/interviewers"
    Promise.all([
      axios.get(URLdays),
      axios.get(URLappointments),
      axios.get(URLinterviewers)
    ]).then((response) => {
      setState(prev => ({...prev, 
        days: response[0].data, 
        appointments: response[1].data,
        interviewers: response[2].data,
       }));
    })
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const meetings = dailyAppointments.map((appointment) => {
    // console.log('appointment.interview is:', appointment.interview)
    const interview = getInterview(state, appointment.interview)  
    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interviewers={dailyInterviewers}
      interview={interview} //obj e.g  interview: { student: "Chad Takahashi", interviewer: {id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png"} }
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />
    )
  })

  function bookInterview(id, interview) {
    console.log('id:', id, 'rest: ', id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(response => {
      setState({
        ...state,
        appointments
      });
    })
  }

  function cancelInterview(id) { 
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`/api/appointments/${id}`)
    .then(response => {
      setState({
        ...state,
        appointments
      });
    })
  }

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

