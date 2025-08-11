// modules/user/user.js
import { createAction, handleActions } from 'redux-actions';

const SET_PREVIOUS_URL   = "user/SET_PREVIOUS_URL";
const SET_USER           = "user/SET_USER";
const SET_USER_STATUS    = "user/SET_USER_STATUS";
const SET_AUTH_CHECKED   = "user/SET_AUTH_CHECKED"; // ✅ 추가

export const setPreviousUrl  = createAction(SET_PREVIOUS_URL,  (previousUrl) => previousUrl);
export const setUser         = createAction(SET_USER,          (currentUser) => currentUser);
export const setUserStatus   = createAction(SET_USER_STATUS,   (isLogin) => isLogin);
export const setAuthChecked  = createAction(SET_AUTH_CHECKED,  (checked) => checked); // ✅ 추가

const UserInitalValue = {
  currentUser : {},
  isLogin     : false,
  previousUrl : "",
  authChecked : false, // ✅ “초기 인증 부트스트랩이 끝났는지” 표시
};

const user = handleActions(
  {
    [SET_PREVIOUS_URL] : (state, action) => ({ ...state, previousUrl: action.payload }),
    [SET_USER]         : (state, action) => ({ ...state, currentUser: action.payload }),
    [SET_USER_STATUS]  : (state, action) => ({ ...state, isLogin: action.payload }),
    [SET_AUTH_CHECKED] : (state, action) => ({ ...state, authChecked: action.payload }), // ✅
  },
  UserInitalValue
);

export default user;

