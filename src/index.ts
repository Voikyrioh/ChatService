import API from './presentation/server'
import MessageController from './presentation/Controllers/MessageController'

async function main() {
  API.run(3000, MessageController)
}

main().catch(error => console.error(error));
