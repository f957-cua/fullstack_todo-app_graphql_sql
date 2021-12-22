const express = require('express')
const path = require('path')

const sequelize = require('./utils/database')
const { graphqlHTTP } = require("express-graphql");

const schema = require('./graphql/schema')
const resolver = require('./graphql/resolver')


const app = express()

const PORT = process.env.PORT || 3000

// set static response
app.use(express.static(path.join(__dirname, 'public')))

// set parse json
app.use(express.json())

// set graphQL
app.use(
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
  })
);

// send .html response
app.use((req, res, next) => {
  res.sendFile('/index.html')
})

async function start() {
  try {
    // connect to db
    await sequelize.sync()
    
    app.listen(PORT, () => {
      console.log(`app run on PORT ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
