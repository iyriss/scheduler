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

  const updateDays = (state) => {
    const newDays = [...state.days ];
    const day = newDays.find(aDay => aDay.name === state.day);
    const spots = day.appointments.filter(apptKey => state.appointments[apptKey].interview === null).length;
    day.spots = spots;
    return newDays;
  };

  const bookInterview = (id, interview) => {
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
        setState(prev => ({...prev,
          appointments
        }));
        setState(prev => ({...prev,
          days: updateDays(prev)
        }));
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
        setState(prev => ({...prev,
          appointments
        }));
        setState(prev => ({...prev,
          days: updateDays(prev)
        }));
      });
  };
  return { state, setDay, bookInterview, cancelInterview};
}