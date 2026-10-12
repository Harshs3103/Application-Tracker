import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<div>Signup page (coming next)</div>} />
      <Route path="/" element={<div>Jobs page (coming soon)</div>} />
    </Routes>
  );
}

export default App;