import db from '../db/index.mjs'

export async function findAll() {
  return await db.query('SELECT * FROM users')
  .then(res => {
    const users =  res.rows.map((user) => {
      const messages = user.messages
      if (messages.length >0) {
        db.query(`SELECT * FROM messages WHERE messages.userid = $1`,[user.id])
         .then(res => {
           messages = res.rows
           user.messages = messages
         })
      }
      return user
    })
    return users
  })
  .catch(e => console.error(e.stack));
}
export async function findById(userId) {
  return await db.query(`SELECT * FROM users WHERE users.id = $1`,[userId])
  .then(res => {
    const messages = res.rows[0].messages
    if (messages.length >0) {
       db.query(`SELECT * FROM messages WHERE messages.userid = $1`,[userId])
        .then(res => {
          messages = res.rows
        })
      }
      let user = {username: res.rows[0].username, id: res.rows[0].id, messages: messages }
      return user
  })
  .catch(e => console.error(e.stack));
}

export async function createUser(user) {
  const query = {
    text: 'INSERT INTO users("id", "username", "messages" ) VALUES($1, $2, $3) RETURNING *',
    values: [user.id, user.username, []],
  }
  return await db.query(query)
  .then(res => {
    console.log(res)
    return res.rows[0]
  } )
  .catch(e => console.error(e.stack))
}