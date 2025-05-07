import app from './app'
import { config } from './config'

const PORT = config.port

console.log(`\n\n-----------------------------------`)
console.warn(`¡Do not leave secrets in logs!\n`)
console.log(`Server configuration: ${JSON.stringify(config, null, 2)}`)
console.log(`-----------------------------------\n\n`)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
