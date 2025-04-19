import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import Layout from "./components/Layout/Layout";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="details" element={<Details />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
