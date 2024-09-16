import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/common/Header";
import HomePage from "./pages/HomePage";
import Whiteboard from "./pages/Whiteboard";
function App() {
  return (
    <Router>
      {/* Toastify config to show notification */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
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
