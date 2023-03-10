import * as api from '../api/index';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, history) => async (dispatch) => {
    try {
      // log in th user..
      const { data } = await api.signIn(formData);

      dispatch({ type: AUTH, data});

      history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
      // sign up th user..
      const { data } = await api.signUp(formData);

      dispatch({ type: AUTH, data});

      history.push('/');
    } catch (error) {
        console.log(error);
    }
}