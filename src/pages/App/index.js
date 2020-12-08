import { useAuth0 } from "@auth0/auth0-react";
import Login from '../../components/Login'
import PersonList from '../Person'
import Loading from "../../components/Loading";
import './styles.css'


const App = () => { 
  
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <div>
        <Login />
        <PersonList />
    </div>
  )
}

export default App;
