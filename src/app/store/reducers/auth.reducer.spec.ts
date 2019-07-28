import { authReducer, initialAuthState } from './auth.reducer';
import * as AuthActions from '../actions/auth.actions';
import { User } from '../../model/user';

const userMock: User = {
  email: 'email',
  password: 'pass',
  id: '2',
};

describe('Auth Reducer', () => {
  describe('LOG_OUT', () => {
    it('should set the user to null', () => {
      const action = AuthActions.LOG_OUT();

      const result = authReducer(initialAuthState, action);

      expect(result).toEqual({ ...initialAuthState, user: null });
    });
  });

  describe('LOG_IN_SUCCESS', () => {
    it('should set the user', () => {
      const action = AuthActions.LOG_IN_SUCCESS({ user: userMock });

      const result = authReducer(initialAuthState, action);

      expect(result).toEqual({ ...initialAuthState, user: userMock });
    });
  });

  describe('LOG_IN_SUCCESS_LS', () => {
    it('should set the user', () => {
      const action = AuthActions.LOG_IN_SUCCESS_LS({ user: userMock });

      const result = authReducer(initialAuthState, action);

      expect(result).toEqual({ ...initialAuthState, user: userMock });
    });
  });
});
