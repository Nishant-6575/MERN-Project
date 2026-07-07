const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const employeeRoutes = require("./routes/emplyoyeeRoutes")

const connetDB = require("./config/db")
const errorHandler = require("./middleware/error.middleware")

dotenv.config()

connetDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API Running"
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);

})

app.use("/api/employees", employeeRoutes)

app.use(errorHandler)