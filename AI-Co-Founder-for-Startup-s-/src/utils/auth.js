// Authentication utility functions

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('userEmail');
  
  return !!(token && userEmail);
};

export const getUserInfo = () => {
  if (typeof window === 'undefined') return null;
  
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('userEmail');
  const userRole = localStorage.getItem('userRole');
  const userProfile = localStorage.getItem('userProfile');
  const userStartup = localStorage.getItem('userStartup');
  
  if (!token || !userEmail) return null;
  
  return {
    token,
    email: userEmail,
    role: userRole,
    profile: userProfile ? JSON.parse(userProfile) : {},
    startup: userStartup ? JSON.parse(userStartup) : {}
  };
};

export const logout = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userProfile');
  localStorage.removeItem('userStartup');
  
  // Redirect to home page
  window.location.href = '/';
};

export const requireAuth = (callback) => {
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    window.location.href = '/login';
    return false;
  }
  
  if (callback) {
    callback();
  }
  
  return true;
};
