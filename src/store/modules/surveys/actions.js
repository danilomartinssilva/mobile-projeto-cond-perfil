export function addSurveyRequest(survey) {
  return {
    type: '@surveys/ADD_REQUEST',
    survey,
  };
}

export function addSurveySucess(survey) {
  return {
    type: '@surveys/ADD_SUCCESS',
    survey,
  };
}
export function destroySurveyRequest(id) {
  return {
    type: '@surveys/DESTROY_REQUEST',
    id,
  };
}
export function destroySurveySuccess(id) {
  return {
    type: '@surveys/DESTROY_SUCESS',
    id,
  };
}
export function destroySurveyFailure(failed) {
  return {
    type: '@surveys/DESTROY_FAILURE',
    failed,
  };
}
export function loadSurveyRequest() {
  return {
    type: '@surveys/LOAD_REQUEST',
  };
}
export function getAllRequest() {
  return {
    type: '@surveys/GET_ALL_REQUEST',
  };
}
export function getAllSucess(items) {
  return {
    type: '@surveys/GET_ALL_SUCESS',
    items,
  };
}
export function getAllFailure(failed) {
  return {
    type: '@surveys/GET_ALL_FAILURE',
    failed,
  };
}
export function loadSurveySuccess(items) {
  return {
    type: '@surveys/LOAD_SUCCESS',
    items,
  };
}
export function loadSurveyFailure(failed) {
  return {
    type: '@surveys/LOAD_FAILURE',
    failed,
  };
}
export function addSurveyFailure(failed) {
  return {
    type: '@surveys/ADD_FAILURE',
    failed,
  };
}
export function updateSurveysRequest(survey) {
  return {
    type: '@surveys/UPDATE_REQUEST',
    survey,
  };
}
export function updateSurveysSucess(survey) {
  return {
    type: '@surveys/UPDATE_SUCESS',
    survey,
  };
}
export function updateSurveysFailure(failed) {
  return {
    type: '@surveys/UPDATE_FAILURE',
    failed,
  };
}
export function showSurveyRequest(id) {
  return {
    type: '@surveys/SHOW_REQUEST',
    id,
  };
}
export function showSurveySucess(survey) {
  return {
    type: '@surveys/SHOW_SUCESS',
    survey,
  };
}
export function showSurveyFailure(failed) {
  return {
    type: '@surveys/SHOW_FAILURE',
    failed,
  };
}
export function addVoteRequest(id) {
  return {
    type: '@surveys/ADD_VOTE_REQUEST',
    id,
  };
}
export function addVoteSucess(survey_refresh) {
  return {
    type: '@surveys/ADD_VOTE_SUCESS',
    survey_refresh,
  };
}
export function addVoteFailure(failed) {
  return {
    type: '@surveys/ADD_VOTE_FAILURE',
    failed,
  };
}
