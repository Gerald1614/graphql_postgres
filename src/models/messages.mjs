import db from '../db/index.mjs'

export async function findAll() {
  return await db.query('SELECT messages.*, users.username, users.id FROM messages JOIN users ON userid = users.id')
  .then(res => {
    const result=[]
    for (let message of Object.values(res.rows)) {
      result.push({id: message.id, text: message.text, user: { id: message.userid, username: message.username}})
    }
      return result
  })
  .catch(e => console.error(e.stack));
}

export async function findById(messageId) {
  return await db.query('SELECT messages.*, users.username, users.id FROM messages JOIN users ON userid = users.id WHERE messages.id = $1',[messageId])
  .then(res => {
      return {id: res.rows[0].id, text: res.rows[0].text, user: { id: res.rows[0].userid, username: res.rows[0].username}}
  })
  .catch(e => console.error(e.stack));
}

