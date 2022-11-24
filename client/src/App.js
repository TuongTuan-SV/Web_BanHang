import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from "./components/header/Header";
import LandingPage from "./components/homepage/landingPage";
import Dashboard from "./components/dashboard/dashboard";
import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   window.onbeforeunload(
  //       localStorage.clear()
  //  )
  // },[])

  return (
    <div className="App">
      <DataProvider>
        <Router>
          <Routes>
            <Route index path="/*" element={<LandingPage />} />
            <Route path="/*" element={<Dashboard />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
