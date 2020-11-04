const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require("passport-local").Strategy;
const {ExtractJwt} = require('passport-jwt');
const bcrypt = require("bcrypt")
import {models} from "../db";

const {User} = models

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: 'secret'
}, async (payload: object, done: Function) => {
    try {
        // @ts-ignore
        const user = await User.findByPk(payload.sub)
        if (!user) return done(null, null)
        return done(null, user);
    } catch (error) {
        done(error, false)
    }
}));

passport.use(new LocalStrategy({usernameField: 'email'},
    async (email: any, password: string, done: Function) => {
        try {
            const user = await User.findOne({where: {email:email}})
            if (!user) return done(null, false)
            const isMatch = bcrypt.compare(password, user.password);
            if (!isMatch) return done(null, false)
            done(null,user);
        } catch (error) {
            done(error, false)
        }
    }));