import app from "./app.js";
import "./database.js";
import { config } from "./src/utils/config.js";
async function main() {
  app.listen(config.server.PORT);
  console.log("Server running");
}
main();