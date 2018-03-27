import React from 'react';
import { connect } from 'react-redux';
import TagsList from './TagsList';
import { Link } from 'react-router-dom';

const QuestionListItem = ({ title, tags, question_id }) => (
  <div className="mb-3">
    <h3>{title}</h3>
    <div className="mb-2">
      <TagsList tags={tags} />
    </div>
    <div>
      <Link to={`/questions/${question_id}`}>
        <button>More Info!</button>
      </Link>
    </div>
  </div>
);

const QuestionList = ({ questions }) => {
  return questions && questions.length ? (
    <div>
      {questions.map(question => (
        <QuestionListItem key={question.question_id} {...question} />
      ))}
    </div>
  ) : (
    <div>... Loading questions... </div>
  );
};

const mapStateToProps = ({ questions }) => ({
  questions
});

export default connect(mapStateToProps)(QuestionList);
