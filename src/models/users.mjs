import db from '../db/index.mjs'

// export async function findAll() {
//   return await db.query('SELECT * FROM users, messages WHERE userid = users.id')
//   .then(res => {
//     const messages = Array.from(res.rows.map((user) => {
//       return {id: user.id, text: user.text}
//     }))
//     const users = (res.rows.map((user) => {
//       let temp = user.messages.map(id => messages.find(message => message.id === id))
//       return {username: user.username, id: user.userid, messages: temp }
//     }))
//     const uniqueUsers = Array.from(new Set(users.map(a => a.id)))
//       .map(id => {
//         return users.find(a => a.id === id)
//       })
//      return uniqueUsers
//   })
//   .catch(e => console.error(e.stack));
// }
export async function findAll() {
  return await db.query('SELECT * FROM users')
  .then(res => {
    console.log(res.rows)
    return res.rows
  })
  .catch(e => console.error(e.stack));
}
export async function findById(userId) {
  return await db.query('SELECT * FROM users INNER JOIN messages ON users.id = messages.userid AND users.id = $1',[userId])
  .then(res => {
    console.log(res.rows)
    const messages = Array.from(res.rows.map((user) => {
      return {id: user.id, text: user.text}
    }))
    console.log(messages)
      let user = {username: res.rows[0].username, id: res.rows[0].userid, messages: messages }
      console.log(user)
      return user
  })
  .catch(e => console.error(e.stack));
}

export async function createUser(user) {
  const query = {
    text: 'INSERT INTO users("id", "username", "messages" ) VALUES($1, $2, $3)',
    values: [user.id, user.username, []],
  }
  return await db.query(query)
  .then(res => {
    console.log(res)
    return res.rows[0]
  } )
  .catch(e => console.error(e.stack))
}