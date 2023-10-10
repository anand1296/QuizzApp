export type Action = { type: 'setUser', payload: {username: string, password: string, isAdmin?: boolean} }
    | { type: 'loginSuccess'}
    | { type: 'logoutSuccess'}
    | { type: 'resetLoginForm' };