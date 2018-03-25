import unionWith from 'lodash/unionWith';

export const questions = (state=[], {type, questions}) =>{
    const questionEquality = (a={}, b={}) =>{
        return a.quesion_id == b.quesion_id;
    };
    if(type==='FETCHED_QUESTIONS'){
        state = unionWith(state, questions, questionEquality);
    };

    return state;
};