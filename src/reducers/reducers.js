import { combineReducers } from 'redux'

function categories(state = [] /*categories*/, action) {
  switch (action.type) {
    case ("SELECT_QUESTION"):
      console.log(action);
      return state.map((cat, index) => {
        if (cat.id === action.catId) {
          return Object.assign({}, cat, {
            questions: cat.questions.map((question, index) => {
              if (question.id === action.questionId) {
                return Object.assign({}, question, {used:true})
              } 
              return question;
            })
          });
        } 
        return cat;
      }); 

    default: 
      return state;
  }
}

export const rootReducer = combineReducers({ categories});
