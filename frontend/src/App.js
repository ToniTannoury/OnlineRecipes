import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Register from "./components/Register"
import Login from "./components/Login"
import LandingPage from './components/LandingPage'
import SearchRecipes from './components/SearchRecipes'
import Liked from './components/Liked'
function App(){
  
  

  return (
    <Router>

      <div className="container">
      <UserProvider>
        <Routes>
          
            <Route path="/" element={<Register/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/LandingPage" element={<LandingPage/>}/>
            <Route path="/searchRecipes" element={<SearchRecipes/>}/>
            <Route path="/likes" element={<Liked/>}/>
          
          </Routes>
        </UserProvider>
      
      </div>
    </Router>
    

  )
}

export default App