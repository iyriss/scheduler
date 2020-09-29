import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem';

const InterviewerList = ({interviewers, setInterviewer, interviewer}) => {
  // console.log(props)
  const interviews = interviewers.map(person => {
    return (
      <InterviewerListItem
        key={person.id}
        id={person.id}
        name={person.name}
        avatar={person.avatar} 
        selected={person.id ===  interviewer}
        setInterviewer={setInterviewer}/>
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{interviews}</ul>
    </section>
  );
};

export default InterviewerList;