//This returns an array of the appointments: 
//e.g. [{id: 1, time: '12pm", interview: null}]
export function getAppointmentsForDay(state, day) {
  let appointments = [];
  const filteredDays = state.days.filter(dayName => dayName.name === day);

  if (filteredDays.length) {
    appointments = filteredDays[0].appointments.map(x => state.appointments[x]);
  }
  return appointments;
} 

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewObject = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }

  return interviewObject;
}
