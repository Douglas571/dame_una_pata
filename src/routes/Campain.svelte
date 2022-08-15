<script>
  import { onMount } from 'svelte'
  import { useParams } from 'svelte-navigator'
  import { user } from '../lib/store.js'
  import { getCampain } from '../lib/api.js'

  let params = useParams()
  let campain

  onMount( async () => {
    campain = await getCampain($params.campain_id, $user.id)
    console.log({campain})
  })

  function handleDonation() {
    
  }

</script>

<div>
  {#if campain }
    <h1>{campain.addressee}</h1>
    <img id="addressee-img" src="/poodle.jpg"/>
    <p>{campain.description}</p>

    <h2>Recaudación</h2>
    <hr>
    <p>
      {campain.money_collected?.current}
      /
      {campain?.money_collected?.goal}$
    </p>
    <button on:click={handleDonation}>Realizar Donación</button>
    <h3>Insumos Aceptador</h3>

    {#if campain.acepted_supplies }
      <ul>
        {#each campain.acepted_supplies as donation(donation.id)}
          <li>{donation.name}</li>
        {/each}
      </ul>
    {/if}
  {/if}
</div>

<style>
  
  #addressee-img {
    width: 100px;
    height: 100px;
  }


</style>