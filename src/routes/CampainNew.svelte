<script>
  import { user } from '../lib/store.js'
  import { createNewCampain } from '../lib/api.js'

  export let navigate

  let addressee = 'memelia'
  let picture = 'some.png'
  let description = 'new memelia lorem blablabla'
  let money = 100

  function incrementMoney() {
    money += 1
  }

  function decrementMoney() {
    if (money > 0) money -= 1
  }

  let lastDonativoId = 1
  let newDonativoName = ""
  let donativos = []

  $: thereDonativos = donativos.length

  function addDonativo() {
    if (newDonativoName === "") return

    let newDonativo = {
      id: lastDonativoId,
      name: newDonativoName,
    }

    donativos = [...donativos, newDonativo]

    lastDonativoId += 1
    newDonativoName = ""
  }

  function deleteDonativo(id) {
    donativos = donativos.filter( d => d.id !== id)
  }

  // TO-DO: Write the code to send the data 

  let showSuccessDialog = false
  async function submitNewCampain(){
    let newCampain = {
      addressee,
      description,
      picture,
      money_collected: {
        current: 0,
        goal: money,
      },
      donativos,
      user_id: $user.id
    }

    const res = await createNewCampain(newCampain)
    
    if (res.err) {
      console.log({ERR: res.err})
      return
    }

    // TO-DO: write code to push the new Campain into the fake servar,
    // and show feedback to user.
    showSuccessDialog = true
    setTimeout(() => {
      showSuccessDialog = false
      navigate('/me')
    }, 3000)
  }

</script>

<div>
  <h1>Nueva Campaña</h1>
  <hr/>
  <div id="new-campain-main">
    <section>
      <h2>Destinatario</h2>
      <div>
        <label for="addressee-name">Destinatario</label>
        <input id="addressee-name" type="text" bind:value={addressee}/>
      </div>

      <div>
        <label for="description">Descripción</label>
        <textarea id="description" bind:value={description}></textarea>
      </div>

      <div>
        <label for="picture">Fotografía</label>
        <input id="picture" type="file" name="picture">
      </div>
    </section>

    <section>
      <h2>Recaudación</h2>
      <div>
        <label for="money-input">Total a recaudar</label>
        <div id="money-drive">
          <input 
            id="money-input"
            type="number" 
            name="money" 
            min="0"
            bind:value={money}>
          <span>$</span>
          <button on:click={incrementMoney}>+</button>
          <button on:click={decrementMoney}>-</button>
        </div>
      </div>
    </section>

    <section>
      <h2>Insumos aceptados</h2>
      <div>
        <input 
          type="text" 
          name="donativo" 
          bind:value={newDonativoName}>
        <button on:click={addDonativo}>agregar</button>
      </div>
      
      
      {#if thereDonativos}
        <div>
          <hr>
          <ul>
            {#each donativos as donativo(donativo.id)}
              <li>
                <span>{donativo.name}</span>
                <button 
                  on:click={
                    () => deleteDonativo(donativo.id)
                  }>eliminar</button>
              </li>
            {/each}
          </ul>
        </div>      
      {/if}

    </section>
    <button on:click={submitNewCampain}>Crear Nueva Campaña</button>
  </div>

  <div 
    id="successDialog" 
    class:show={showSuccessDialog}>
      <h3>Campaña creada exitosamente</h3>
    </div>

</div>

<style>
  :root {
    --orange: #333333;
  }

  #money-input {
    width: 5em;
    border: none;
    text-align: right;
  }

  #money-type-input {
    width: 4em;
    border: none;
    text-align: right;
  }

  #money-drive {
    display: inline-block;
    border-bottom: 1px solid var(--orange);
  }

  #successDialog {
    display: none
  }
  #new-campain-main {

  }

  #successDialog.show {
    background-color: red;
    
    position: fixed;

    width: 100%;
    height: 20%;

    top: 0;
    left: 0;
    
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>