const fs = require('fs')

fs.writeFileSync('./.env', `API_key=${process.env.API_key}\n`)