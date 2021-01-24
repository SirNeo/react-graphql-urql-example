import { Switch, Route,  BrowserRouter } from 'react-router-dom'

// import LoadingBoundary from './LoadingBoundary'
import Header from '../../components/Header'
// import LinkList from './LinkList'
// import CreateLink from './CreateLink'
import Login from '../Login'

import PersonList from '../Person'
import CreatePerson from "../Person/Create";

const App = () => 
    <BrowserRouter>
    <div className="center w85">
        <Header/>
        <div className="ph3 pv1 background-gray">
        
            <Switch>
            <Route exact path="/" component={PersonList} />
            <Route exact path="/new" component={CreatePerson} />
            <Route exact path="/login" component={Login} />
            </Switch>
        
        </div>
    </div>
  </BrowserRouter>

export default App;
