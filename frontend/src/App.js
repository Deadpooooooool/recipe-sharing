import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AllRoutes from './routes/allRoutes';
import Header from './components/Header';

const App = () => {
  const [user, setUser] = useState(null);

  // Fetch user information from your authentication system
  useEffect(() => {
    // Your authentication logic here
    // Example: setUser(authService.getCurrentUser());
  }, []);

  return (
    <Router>
      <Header/>
      <AllRoutes user={user} />
    </Router>
  );
};

export default App;
