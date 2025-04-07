import express from "express"
import articlesRoutes from "./src/routes/articles.js"
import artistsRoutes from "./src/routes/artists.js"
import artpiecesRoutes from "./src/routes/artpieces.js"
import categoriesRoutes from "./src/routes/categories.js"
import customersRoutes from "./src/routes/customers.js"
import ordersRoutes from "./src/routes/orders.js"
import reviewsRoutes from "./src/routes/reviews.js"
import salesRoutes from "./src/routes/sales.js"
import suppliersRoutes from "./src/routes/suppliers.js"
import wishlistRoutes from "./src/routes/wishlist.js"

const app = express();
app.use(express.json())
app.use("/api/articles", articlesRoutes)
app.use("/api/artists", artistsRoutes)
app.use("/api/artpieces", artpiecesRoutes)
app.use("/api/categories", categoriesRoutes)
app.use("/api/customers", customersRoutes)
app.use("/api/orders", ordersRoutes)
app.use("/api/reviews", reviewsRoutes)
app.use("/api/sales", salesRoutes)
app.use("/api/suppliers", suppliersRoutes)
app.use("/api/wishlist", wishlistRoutes)

export default app;