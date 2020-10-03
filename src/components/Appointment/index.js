import React from 'react'
import "./styles.scss"
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING";
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"

const Appointment = (props) => {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    // console.log("What is this:", props.bookInterview(props.id))
    .then(() => {
      transition(SHOW);
    })
  }

  function confirm() {
    transition(CONFIRM);
  }

  function deleteInterview() {
    transition(DELETING)
  props.cancelInterview(props.id)
  .then(() => {
    transition(EMPTY)
  })
}
  function edit() {
    transition(EDIT)
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} /> }
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={confirm} onEdit={edit}/> )}
      {mode === CREATE && (<Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} /> )}
      {mode === SAVING && (<Status message="Saving..." />)}
      {mode === DELETING && (<Status message="Deleting..." />)}
      {mode === CONFIRM && (<Confirm message="Are you sure you want to delete the appointment?" onConfirm={deleteInterview} onCancel={() => back ()} />)}
      {mode === EDIT && (<Form name={props.interview.student} interviewers={props.interviewers} interviewer={props.interview.interviewer.id} onSave={save} onCancel={() => back()} />)}
    </article>
  
  );
};

export default Appointment;