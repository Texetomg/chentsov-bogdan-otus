import express from 'express'
import passport  from 'passport'
import { isLoggedIn } from '../isLoggedIn.js'

import '../strategies/googleStrategy.js'

const router = express.Router()

router.get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/failure'
    })
)

router.get('/failure', (req, res) => {
    res.send('unsuccess auth')
})

router.get('/protected', isLoggedIn, (req, res) => {
    res.send(`
        <p>Hello ${req.user.displayName}</p>
        <a href='/auth/logout'>logout</a>
    `)
})

router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
          return next(err)
        }
        req.session.destroy()
        res.redirect('/')
    })
})

export default router