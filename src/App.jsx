import React from 'react';
import { connect } from 'react-redux';
import QuestionList from './components/QuestionList';
import { Route, Link } from 'react-router-dom';
import QuestionDetail from './components/QuestionDetail';

const AppDisplay = () => {
  return (
    <div>
      <h1>
        <Link to={`/`}>Ismorphic React</Link>
      </h1>
      <div>
        {/* <QuestionList/> */}
        <Route exact path="/" render={() => <QuestionList />} />
        <Route exact path="/questions/:id" render={({match}) => <QuestionDetail question_id={match.params.id} />} />
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  };
};

// export default AppDisplay;
export default connect(mapStateToProps)(AppDisplay);
