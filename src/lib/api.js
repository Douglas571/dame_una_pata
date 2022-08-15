import fake from './fake_server.js'

function userExist(email) {
  return !fake.users.some( u => u.email == email )
}

function getUser(email) {
  return fake.users.find(u => u.email == email)
}

let lastId = 1

export async function registNewUser(data) {
  if (userExist(data.email)) {
    return {
      err: 'A user with this email alredy exist'
    }
  }


  // TO-DO: regist the user in the fake server...
  lastId++

  fake.users.push({
    id: lastId,
    ...data,
  })

  let user = getUser(data.email)

  return { 
    success: true, 
    msg: 'user success fully loaded',
    user: {
      ...user,
      password: undefined,
    }
  }
}

export async function checkUser(data) {
  console.log({data})
  console.log({fake})
  if (userExist(data.email)) {
    return { err: 'Wrong email' }
  }
  const user = getUser(data.email)
  if (!user.password == data.password) {
    return { err: 'wrong password' }
  }

  return {
    success: true,
    data: {
      ...user,
      password: undefined,
      token: "87103419a0sdf6041232nnsfd"
    }
  }
}

export async function createNewCampain(data) {
  let res = {}

  let user = fake.users.find(({id}) => id === data.user_id)

  if (!user.campains) user.campains = []

  data.id = Date.now()
  data.acepted_supplies = []
  user.campains.push(data)

  return res
}

export async function getCampain(campain_id, user_id) {
  let campain = fake.users.find( u => u.id == user_id)
    ?.campains.find( c => c.id == campain_id)

  let user = fake.users.find(({id}) => id === user_id)
  console.log(user)


  return campain
}

export async function getUserCampains(user_id) {
  let campains = fake.users.find( u => u.id === user_id)?.campains
  return campains
}