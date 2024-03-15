import express from 'express'
import 'dotenv/config'
import passport  from 'passport'

import session from 'express-session'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'

const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: "cats" }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.send("<a href='/auth/google'>Auth with google</a>")
})

app.use('/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/task', taskRouter)



app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`)
})

