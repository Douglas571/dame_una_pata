<script>

  //import { useNavigate } from "svelte-navigator"
 
  import { checkUser } from '../lib/api.js'
  import * as local from '../lib/util.js'

  import { user as theUser } from '../lib/store.js'

  export let location
  export let navigate

  let user = {
    email: "juancarlossocorro571@gmail.com",
    password: "12345"
  }

  //let navigate = useNavigate()

  async function handleLogin() {
    console.log({USER: user})

    let res = await checkUser(user)

    if (res.success) {
      local.saveUser(res.data)
      
      theUser.set(res.data)
      
      navigate('/me')
    } else {
      console.log(res.err)
    }
  }

</script>

<div>
  <h1>Inicio de Seción</h1>
  <div>
    <label for="email">Correo</label>
    <input id="email" type="text" bind:value={user.email}/>
  </div>

  <div>
    <label for="password">Contraseña</label>
    <input id="password" type="text" bind:value={user.password}/>
  </div>

  <div>
    <button on:click={handleLogin}>Entrar</button><br>
    <a>Registrace</a><br>
    <a>Recuperar Contraseña</a>
  </div>
</div>