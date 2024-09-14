import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/common/Header";
import HomePage from "./pages/HomePage";
import Whiteboard from "./pages/Whiteboard";
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/whiteboard" element={<Whiteboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
