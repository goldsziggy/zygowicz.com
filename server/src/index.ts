import * as dotenv from "dotenv"
import cors from "cors"
import express from "express"
import bodyParser from "body-parser"
import { validate, ValidationError, Joi } from "express-validation"
import postMessage from "./routes/post-message.js"
import postMessageClaude from "./routes/post-message-claude.js"
import { purgeExpiredData } from "./utils/data.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

const validation = {
  body: Joi.object({
    message: Joi.number().min(0).max(1001).required(),
    persona: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    parentId: Joi.string()
      .regex(/[a-zA-Z0-9]{0,30}/)
      .allow(null, "")
      .optional(),
  }),
}

app.use(express.json())
if (process.env.CORS_URL) {
  app.use(
    cors({
      origin: process.env.CORS_URL,
    })
  )
}
setInterval(() => {
  purgeExpiredData()
}, 1000 * 60 * 20)

app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

const api = express.Router()
// api.post("/message", validate(validation), postMessage)
api.post("/message", validate(validation), postMessageClaude)

app.use("/api", api)

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  return res.status(500).json({ error: true, message: err.message })
})

app.listen(PORT, () => {
  console.log(`Zygowicz resume service listening on port ${PORT}`)
})
