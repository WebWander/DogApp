import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Start from "./components/Start";
import Profile from "./components/Profile/Profile";
import Create from "./components/Create/Create";
import Edit from "./components/Edit/Edit";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
