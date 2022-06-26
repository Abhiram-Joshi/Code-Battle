import { Route, Routes, Navigate} from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import { AuthProvider } from './components/context/AuthContext';
import ProtectedRoute from "./components/Protected/ProtectedRoute";


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Categories from "./pages/Categories";
import Rooms from "./pages/Rooms";
import Editor from "./pages/Editor";

function App() {
  return ( 
    <Router>
      <AuthProvider>
       <Routes>
         <Route exact path="/" element={<Home />} /> 
         <Route path="/login" element={<Login/>} /> 
         <Route path="/signup" element={<Signup/>} />   
         <Route path="/rooms" element={<ProtectedRoute ><Rooms /></ProtectedRoute>} />
         <Route path="/editor" element={<Editor />} /> 
         <Route path="/categories" element={<ProtectedRoute ><Categories /></ProtectedRoute>} />
       </Routes>
       </AuthProvider>
     </Router>
 );
}

export default App;
