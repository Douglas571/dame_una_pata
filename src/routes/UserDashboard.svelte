<script>
  import { onMount } from 'svelte'

  import { Link } from 'svelte-navigator'
  import { user } from '../lib/store.js'
  import { getUserCampains } from '../lib/api.js'
  console.log({THE_USER: $user})

  const short = (t) => t.slice(0, 20) + '...'

  let campains = []
  onMount( async () => {
    campains = await getUserCampains($user.id)
    console.log({campains})
  })
</script>

<div>
  <h1>Bienvenido {$user.personal_data.name}</h1>

  <h2>
    <span>Campañas</span>
    <Link to="/campains/new">Nueva</Link>
  </h2>
  <hr>
  {#each campains as camp(camp.id)}
    <Link to={`/campains/${camp.id}`}>{camp.addressee}: {short(camp.description)}</Link><br>
  {/each}
</div>