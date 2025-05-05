import app from './app'
import { config } from './config'

const PORT = config.port

console.log(`Configuración del servidor: ${JSON.stringify(config, null, 2)}`)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
