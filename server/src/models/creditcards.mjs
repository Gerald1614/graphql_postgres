import db from '../db/index.mjs'

export async function findAll() {
  return await db.query(`SELECT creditcards.id, creditcards.cardnumber, creditcards.userid, users.username 
  FROM creditcards JOIN users 
  ON users.id = creditcards.userid`)
  .then(res => {
    const result=[]
    console.log(res.rows)
    for (let creditcard of Object.values(res.rows)) {
      result.push({id: creditcard.id, cardnumber: creditcard.cardnumber, userid: { id: creditcard.userid, username: creditcard.username}})
    }
      return result
  })
  .catch(e => {
    console.error(e.stack)
    return []
  });
}

export async function findById(creditcardId) {
  return await db.query(`SELECT creditcards.id, creditcards.cardnumber, creditcards.userid, users.username 
  FROM creditcards JOIN users
  ON users.id = creditcards.userid`)
  .then(res => {
    console.log(res)
      const result =  res.rows.find((el) => {
        return el.id === creditcardId
      }) 
      console.log(result)
      return {id: result.id, cardnumber: result.cardnumber, userid: { id: result.userid, username: result.username}}
  })
  .catch(e => console.error(e.stack));
}

export async function createCreditcard(creditcard) {
  const query = {
    text: 'INSERT INTO creditcards("id", "cardnumber", "userid" ) VALUES($1, $2, $3) RETURNING *',
    values: [creditcard.id, creditcard.cardnumber, creditcard.userid]
  }
  return await db.query(query)
  .then(res => {
    return res.rows[0]
  } )
  .catch(e => console.error(e.stack))
}

export async function updateCreditcard(id, cardnumber) {
  return await db.query('UPDATE creditcards SET cardnumber = $1 WHERE id = $2 RETURNING *', [cardnumber, id])
  .then(res => {
    return res.rows[0]
  } )
  .catch(e => console.error(e.stack))
}

export async function deleteCreditcard(creditcardId) {
  return await db.query('DELETE FROM creditcards WHERE creditcards.id=$1', [creditcardId])
  .then(res => {
    return true
  } )
  .catch(e =>{ 
    console.error(e.stack)
  return false})
}
