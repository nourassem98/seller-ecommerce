import './App.css';
import LoginPage from './Pages/LoginPage';
import SellerHome from './Pages/SellerHome';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>

      {
        localStorage.getItem("success") && localStorage.getItem("permission") == 3 ?
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SellerHome />} />
              <Route path="/S_Home" element={<SellerHome />} />
            </Routes>
          </BrowserRouter >
          :
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
      }
    </div >
  )
}

export default App;
