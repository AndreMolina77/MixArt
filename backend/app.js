import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import articlesRoutes from "./src/routes/articles.js"
import employeesRoutes from "./src/routes/employees.js"
import artpiecesRoutes from "./src/routes/artpieces.js"
import categoriesRoutes from "./src/routes/categories.js"
import customersRoutes from "./src/routes/customers.js"
import ordersRoutes from "./src/routes/orders.js"
import reviewsRoutes from "./src/routes/reviews.js"
import salesRoutes from "./src/routes/sales.js"
import suppliersRoutes from "./src/routes/suppliers.js"
import wishlistRoutes from "./src/routes/wishlist.js"
import loginRoutes from "./src/routes/login.js"
import logoutRoutes from "./src/routes/logout.js"
import signupRoutes from "./src/routes/signup.js"
import signupCustomerRoutes from "./src/routes/signupCustomer.js"
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js"
import { validateAuthToken } from "./middlewares/validateAuthToken.js"

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors({origin: "http://localhost:5173", credentials: true}))
//Login requerido
app.use("/api/articles", validateAuthToken(["admin","vendedor"]), articlesRoutes)
app.use("/api/employees", validateAuthToken(["admin"]), employeesRoutes)
app.use("/api/artpieces", validateAuthToken(["admin", "artista"]), artpiecesRoutes)
app.use("/api/categories", validateAuthToken(["admin", "artista", "vendedor"]), categoriesRoutes)
app.use("/api/customers", customersRoutes)
app.use("/api/orders", ordersRoutes)
app.use("/api/reviews", reviewsRoutes)
app.use("/api/sales", salesRoutes)
app.use("/api/suppliers", suppliersRoutes)
app.use("/api/wishlist", wishlistRoutes)
//No login requerido
app.use("/api/login", loginRoutes)
app.use("/api/logout", logoutRoutes)
app.use("/api/signup", signupRoutes)
app.use("/api/signupCustomer", signupCustomerRoutes)
app.use("/api/recoveryPassword", recoveryPasswordRoutes)
app.use("/api/validateAuthToken", validateAuthToken)

export default app;