import express from "express"
import articlesRoutes from "./src/routes/articles.js"
import customersRoutes from "./src/routes/customers.js"
import artpiecesRoutes from "./src/routes/artpieces.js"
import ordersRoutes from "./src/routes/orders.js"
import wishlistRoutes from "./src/routes/wishlist.js"

const app = express();
app.use("/api/customers", customersRoutes)

app.use(express.json())

export default app;