export function getAppointmentsForDay(state, day) {
  let appointments = [];
  const filteredDays = state.days.filter(dayName => dayName.name === day);

  if (filteredDays.length) {
    appointments = filteredDays[0].appointments.map(x => state.appointments[x]);
  }
  return appointments;
} 

