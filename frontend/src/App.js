import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Login Page (Placeholder)</h1>} />
        <Route
          path="/forget-password"
          element={<h1>Forget Password Page (Placeholder)</h1>}
        />
        <Route
          path="/:type/update-password/:resetId"
          element={<h1>Update Password Page (Placeholder)</h1>}
        />
        <Route
          path="/student"
          element={<h1>Student Home Page (Placeholder)</h1>}
        />
        <Route
          path="/faculty"
          element={<h1>Faculty Home Page (Placeholder)</h1>}
        />
        <Route path="/admin" element={<h1>Admin Home Page (Placeholder)</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
