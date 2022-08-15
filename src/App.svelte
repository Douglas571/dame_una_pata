<script>
  import { Router, Route, Link } from 'svelte-navigator'

  import Home from './routes/Home.svelte'

  import Login from './routes/Login.svelte'
  import Register from './routes/Register.svelte'
  
  import Campain from './routes/Campain.svelte'
  import CampainNew from './routes/CampainNew.svelte'

  import NavBar from './components/NavBar.svelte'

  import UserDashboard from './routes/UserDashboard.svelte'
</script>

<Router>
  <h1>Dame una pata</h1>
  <NavBar/>
  
  <Route path="/">
    <Home/>
  </Route>
  
  <Route path="/login" component={Login} />
  <Route path="/register" component={Register} />
  <Route path="/campains/:campain_id" component={Campain} />
  <Route path="/campains/new" component={CampainNew} />

  <Route path="me"><UserDashboard/></Route>

</Router>

<style>
  :root {
    --blue-dark: #048ABF;
    --blue-ligth: #18B5D9;
    --teal-dark: #1BBFBF;
    --teal-ligth: #8FD9D9;
    --beish: #D9CAAD;
  }

</style>