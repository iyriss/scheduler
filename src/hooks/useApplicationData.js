import { useState , useEffect } from "react";
import axios from "axios";
import InterviewerListItem from "components/InterviewerListItem";

export default function useApplicationData() {
  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    const URLdays = "/api/days";
    const URLappointments = "/api/appointments";
    const URLinterviewers = "/api/interviewers";
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
    });
  }, []);

  const daySpots = (state, dayName, up = false) => {

    setState(prev => {
      const day = prev.days.find(aDay => aDay.name === dayName);
      
      if (up) {
        day.spots += 1;
      } else {
        day.spots -= 1;
      }
      return prev;
    });
    // console.log("day:", day)
  };

  const bookInterview = (id, interview) => {
  // console.log("ID:", id, "INTERVIEW:", interview)
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        daySpots(state, state.day);
        setState({
          ...state,
          appointments
        });
      });
  };

  const cancelInterview = (id) => {
    
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        daySpots(state, state.day, true);
        setState({
          ...state,
          appointments
        });
      });
  };
  return { state, setDay, bookInterview, cancelInterview};
}