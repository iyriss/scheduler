import React from 'react';
import "./styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

const Appointment = (props) => {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
  
      .then(() => {
        transition(SHOW);
      })
      .catch(error => {
        transition(ERROR_SAVE, true);
      });
  };

  const confirm = () => {
    transition(CONFIRM);
  };

  const deleteInterview = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => {
        transition(ERROR_DELETE, true);
      });
  };

  const edit = () => {
    transition(EDIT);
  };


  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => {
        transition(CREATE)
        ;
      }} /> }
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={confirm} onEdit={edit}/>)}
      {mode === CREATE && (<Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} />)}
      {mode === SAVING && (<Status message="Saving..." />)}
      {mode === DELETING && (<Status message="Deleting..." />)}
      {mode === CONFIRM && (<Confirm message="Are you sure you want to delete the appointment?" onConfirm={deleteInterview} onCancel={() => back()} />)}
      {mode === EDIT && (<Form name={props.interview.student} interviewers={props.interviewers} interviewer={props.interview.interviewer.id} onSave={save} onCancel={() => back()} />)}
      {mode === ERROR_SAVE && (<Error message="⚠️ Could not save. Try again later." onClose={()=>back()}/>)}
      {mode === ERROR_DELETE && (<Error message="⚠️ Could not delete. Try again later." onClose={()=>back()}/>)}
    </article>
  
  );
};

export default Appointment;