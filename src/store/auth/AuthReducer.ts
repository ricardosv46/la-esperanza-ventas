import { User } from '@generated/graphql'
import { AuthInitialState, initialState } from './AuthState'

type action = { type: 'logout' } | { type: 'login'; payload: User }

const AuthReducer = (state: AuthInitialState, action: action): AuthInitialState => {
  switch (action.type) {
    case 'login':
      if (action.payload.tipoUsuario === 3) {
        return { ...state, user: action.payload, isAuth: true }
      }
      return { ...state, isAuth: false }
    case 'logout':
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return { ...state, user: initialState.user, isAuth: false }

    default:
      return state
  }
}

export default AuthReducer
