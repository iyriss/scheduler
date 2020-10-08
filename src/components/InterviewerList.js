import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem';
import 'components/InterviewerList.scss';
import PropTypes from 'prop-types';

const InterviewerList = (props) => {

  const interviews = props.interviewers.map(person => {
    return (
      <InterviewerListItem
      
        key={person.id}
        name={person.name}
        avatar={person.avatar}
        selected={person.id ===  props.value}
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
export default InterviewerList;

