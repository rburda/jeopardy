export const AT_SELECT_QUESTION = "SELECT_QUESTION";

export function selectQuestionActionCreator({catId, questionId}) {
  return {
    type: AT_SELECT_QUESTION,
    catId: catId,
    questionId: questionId
  };
}