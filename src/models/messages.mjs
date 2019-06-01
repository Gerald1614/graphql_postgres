import db from '../db/index.mjs'

export async function findAll() {
  return await db.query(`SELECT messages.id, messages.text, messages.userid, users.username 
  FROM messages JOIN users 
  ON users.id = messages.userid`)
  .then(res => {
    const result=[]
    console.log(res.rows)
    for (let message of Object.values(res.rows)) {
      result.push({id: message.id, text: message.text, userid: { id: message.userid, username: message.username}})
    }
      return result
  })
  .catch(e => console.error(e.stack));
}

export async function findById(messageId) {
  return await db.query(`SELECT messages.id, messages.text, messages.userid, users.username 
  FROM messages JOIN users
  ON users.id = messages.userid`)
  .then(res => {
    console.log(res)
      const result =  res.rows.find((el) => {
        return el.id === messageId
      }) 
      console.log(result)
      return {id: result.id, text: result.text, userid: { id: result.userid, username: result.username}}
  })
  .catch(e => console.error(e.stack));
}

export async function createMessage(message) {
  const query = {
    text: 'INSERT INTO messages("id", "text", "userid" ) VALUES($1, $2, $3) RETURNING *',
    values: [message.id, message.text, message.userid]
  }
  return await db.query(query)
  .then(res => {
    return res.rows[0]
  } )
  .catch(e => console.error(e.stack))
}

export async function deleteMessage(messageId) {
  return await db.query('DELETE FROM messages WHERE messages.id=$1', [messageId])
  .then(res => {
    return true
  } )
  .catch(e =>{ 
    console.error(e.stack)
  return false})
}
