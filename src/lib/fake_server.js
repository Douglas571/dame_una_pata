export default {
  users: [
    {
      id: 1,
      email: "juancarlossocorro571@gmail.com",
      password: "12345",

      personal_data: {
        name: 'Douglas Socorro',
      },

      campains: [
        {
          id: '12345',
          addressee: 'Rosario',
          description: "blbllbblblblblblblblblblblblblblblblblb",
          money_collected: { current: 5, goal: 100 },
          acepted_supplies: 
            [ 
              {
                id: 1,
                name: 'Lorem Ipsum is simply dummy text',
              },
              {
                id: 2,
                name: 'Lorem Ipsum is simply dummy text',
              },
              {
                id: 3,
                name: 'Lorem Ipsum is simply dummy text',
              },
            ]
        }
      ]
    }
  ]
}