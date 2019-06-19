import db from '../db/index.mjs'

export async function findAll() {
  return await db.query('SELECT * FROM users')
  .then(res => {
    const users =  res.rows.map(async (user) => {
        await db.query(`SELECT * FROM creditcards WHERE creditcards.userid = $1`,[user.id])
         .then(res => {
           user.creditcards = res.rows
           console.log(user.creditcards)
         })
         .catch(e => user.creditcards=[])
      return user
    })
    return users
  })
  .catch(e => console.error(e.stack));
}
export async function findById(userId) {
  return await db.query(`SELECT * FROM users WHERE users.id = $1`,[userId])
  .then(async res => {
    let creditcards = []
       await db.query(`SELECT * FROM creditcards WHERE creditcards.userid = $1`,[userId])
        .then(res => {
          creditcards = res.rows
        })
        .catch(e => {
          console.error(e.stack)
          return creditcards=[]
          })

      let user = {username: res.rows[0].username, id: res.rows[0].id, creditcards: creditcards }
      return user
  })
  .catch(e => console.error(e.stack));
}

export async function createUser(user) {
  const query = {
    text: 'INSERT INTO users("id", "username") VALUES($1, $2) RETURNING *',
    values: [user.id, user.username],
  }
  return await db.query(query)
  .then(res => {
    console.log(res)
    return res.rows[0]
  } )
  .catch(e => console.error(e.stack))
}

export async function deleteUser(userId) {
  return await db.query('DELETE FROM users WHERE users.id=$1', [userId])
  .then(res => {
    return true
  } )
  .catch(e =>{ 
    console.error(e.stack)
    return false})
}