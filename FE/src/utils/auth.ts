export const tokenManager = {
  setToken: (token: string) => {
    localStorage.setItem('access_token', token);
  },
  
  getToken: () => {
    return localStorage.getItem('access_token');
  },
  
  removeToken: () => {
    localStorage.removeItem('access_token');
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  }
};