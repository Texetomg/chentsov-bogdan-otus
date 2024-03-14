import express from 'express'
import 'dotenv/config'
import './auth.js'
import passport  from 'passport'
import { isLoggedIn } from './isLoggedIn.js'
import session from 'express-session'

const port = process.env.PORT

const app = express()

app.use(session({ secret: "cats" }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.send("<a href='/auth/google'>Auth with google</a>")
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
    })
)

app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`
        <p>Hello ${req.user.displayName}</p>
        <a href='/logout'>logout</a>
    `)
})

app.get('/auth/failure', (req, res) => {
    res.send('unsuccess auth')
})

app.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
          return next(err)
        }
        req.session.destroy()
        res.redirect('/')
    })
})

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`)
})

