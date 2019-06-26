import db from '../db/index'

export async function findAll() {
  return await db.query(`SELECT creditcards.cardid, creditcards.cardnumber, creditcards.userid, users.username 
  FROM creditcards JOIN users 
  ON users.id = creditcards.userid`)
  .then(res => {
    const result=[]
    console.log(res.rows)
    for (let creditcard of Object.values(res.rows)) {
      result.push({cardid: creditcard.cardid, cardnumber: creditcard.cardnumber, userid: { id: creditcard.userid, username: creditcard.username}})
    }
      return result
  })
  .catch(e => {
    console.error(e.stack)
    return []
  });
}

export async function findById(creditcardId) {
  return await db.query(`SELECT creditcards.cardid, creditcards.cardnumber, creditcards.userid, users.username 
  FROM creditcards JOIN users
  ON users.id = creditcards.userid`)
  .then(res => {
    console.log(res)
      const result =  res.rows.find((el) => {
        return el.cardid === creditcardId
      }) 
      console.log(result)
      return {cardid: result.cardid, cardnumber: result.cardnumber, userid: { id: result.userid, username: result.username}}
  })
  .catch(e => console.error(e.stack));
}

export async function createCreditcard(creditcard) {
  const query = {
    text: 'INSERT INTO creditcards("cardid", "cardnumber", "userid" ) VALUES($1, $2, $3) RETURNING *',
    values: [creditcard.cardid, creditcard.cardnumber, creditcard.userid]
  }
  return await db.query(query)
  .then(res => {
    return res.rows[0]
  } )
  .catch(e => console.error(e.stack))
}

export async function updateCreditcard(cardid, cardnumber) {
  return await db.query('UPDATE creditcards SET cardnumber = $1 WHERE cardid = $2 RETURNING *', [cardnumber, cardid])
  .then(res => {
    return res.rows[0]
  } )
  .catch(e => console.error(e.stack))
}

export async function deleteCreditcard(creditcardId) {
  return await db.query('DELETE FROM creditcards WHERE creditcards.cardid=$1', [creditcardId])
  .then(res => {
    return true
  } )
  .catch(e =>{ 
    console.error(e.stack)
  return false})
}
