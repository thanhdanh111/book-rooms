
import react , {useState, useEffect} from 'react'
import {auth,db} from './chat/firebase'
import LoginDemo from './Logindemo/LoginDemo';
import {Switch, Route,Router } from "react-router-dom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import "./App.css";
import Navbar from "./components/Navbar";
import CreateCard from './pages/CreateCard'
import RoomAccept from './pages/RoomAccept'
import { createBrowserHistory } from 'history';

function App() {
  const history = createBrowserHistory();
    const [user , setUser] = useState(auth)
    const [initializing , setInitializing] = useState(true)
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
          if(user){
              setUser(user);
              
          } else{

              setUser(null);
          }
          if(initializing){
              setInitializing(false)
          }
      })
      return unsubscribe;
  },[]);
  return (
    <>
   {
     user ? (
       <>
        <>
      <Navbar />
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/rooms/" component={Rooms} />
          <Route exact path="/rooms/:slug" component={SingleRoom} />
          <Route exact path="/rooms/:slug/create-card" children={<CreateCard user={user} db={db} />} />
          <Route exact path="/rooms/:slug/:nameProcard" children={<RoomAccept user={user} db={db} />} />
          <Route component={Home} />
        </Switch>
      </Router>
    </>
       </>
     )
     :
     <>
      <Switch>
            <Route exact path="/" component={LoginDemo} />
            <Route component={LoginDemo} />
            
      </Switch>
     </>
   }
    </>
  );
}

export default App;
