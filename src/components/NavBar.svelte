<script>
  import { Link } from 'svelte-navigator'
  import { user } from '../lib/store.js'
  import { removeUser } from '../lib/util.js'

  function handleLogout() {
    user.logout()
    console.log('bye bye!')
  }

  console.log({USER: $user})
  $: isLogedIn = $user.token ? true : false

</script>

<nav>
  <div>
    <Link to="/">Home</Link>
  
    {#if isLogedIn}
      <Link to="/" on:click={handleLogout}>Cerrar seción</Link>
    {:else}
      <Link to="login">Iniciar Seción</Link>
    {/if}

    <Link to="register">Registrarce</Link>
  </div>
  {#if isLogedIn}
    <div>
      <p>User: <Link to="/me">{$user.personal_data.name}</Link></p>
    </div>
  {/if}
</nav>