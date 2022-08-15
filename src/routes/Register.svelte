<script>
  import { afterUpdate } from 'svelte'

  import { useNavigate } from "svelte-navigator"

  import { registNewUser } from '../lib/api.js'
  import * as local from '../lib/util.js'

  let navigate = useNavigate()

  let newUser = {
    email: 'douglassocorro1@gmail.com',
    password: '12345'
  }

  let payMethods = {
    pago_mobil: null,
  }

  afterUpdate(() => {
    //console.log({newUser, payMethods})
  })

  let showPassword = false
  function togglePassword(){
    showPassword = !showPassword
  }

  function handleInput( evt ) {
    newUser.password = evt.target.value
  }

  async function handleRegist() {
    console.log({newUser, payMethods})

    const res = await registNewUser({newUser, payMethods})
    
    if (res.success) {
      console.log({res})
      local.saveUser(res.user)

      navigate('/me')
    } else {
      console.log({err: res.err})
    }
  }

  $: type = showPassword ? "password" : "text"

</script>

<div>
  <h1>Registro</h1>

  <form>
    <!-- personal data -->
    <div>
      <h2>Datos personales</h2>
      <div>
        <label for="email">Correo</label>
        <input 
          id="email" 
          type="text" 
          name="email"
          bind:value={newUser.email}>
      </div>
      <div>
        <label for="password">Contraseña</label>
        <input 
          id="password" 
          type={ type } 
          name="password"
          value={newUser.password}
          on:input={ handleInput }>
        <button on:click|preventDefault={togglePassword}>{showPassword ? "hide" : "show" }</button>
      </div>
    </div>

    <!-- Metodos de pago -->
    <div>
      <h2>Metodos de Pago</h2>
      <div>
        <label for="pago-mobil">Pago mobil</label>
        <input 
          id="pago-mobil" 
          type="text" 
          name="pago-mobil"
          bind:value={payMethods.pago_mobil}>
      </div>
    </div>
  </form>

  <button on:click={handleRegist}>Registrarce</button>
</div>