import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem';
import 'components/InterviewerList.scss';

const InterviewerList = (props) => {
  // console.log(props)
  const interviews = props.interviewers.map(person => {
    return (
      <InterviewerListItem

        key={person.id}
        // id={person.id}
        name={person.name}
        avatar={person.avatar}
        selected={person.id ===  props.value}
        // setInterviewer={setInterviewer}
        setInterviewer={event => props.onChange(person.id)}/>
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{interviews}</ul>
    </section>
  );
};

export default InterviewerList;

