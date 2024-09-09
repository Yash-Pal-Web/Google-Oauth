import express, { Application } from 'express';
import appRoute from '../routes/index';
import config from '../config/env';

import path from 'path';

import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';

import bodyParser from 'body-parser';





export default async ({ app }: { app: Application }) => {
    app.use(express.json({ limit: '5mb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    //app.use(express.json());
    
  
    // set view engine and its path
    const viewpath = path.join(__dirname, '..', 'public', 'html');
    app.set('views', viewpath);
    app.set('view engine', 'ejs');
  
    // serve static file
    const staticfile = path.join(__dirname, '..', 'public');
    app.use('/static', express.static(staticfile));
    // google strategy
    passport.use(new GoogleStrategy({
      clientID: config.CLIENT_ID,
      clientSecret:config.CLIENT_SECRET,
      callbackURL: config.CALLBACK_URL
    },(accessToken, refressToken, profile,done)=>{
        console.log(accessToken);
        console.log(refressToken);
        console.log(profile);
    }))
  
    app.get("/auth/google",passport.authenticate('google',{
      scope:["profile", "email"]
    }));
    
    app.get("/auth/google/callback", passport.authenticate('google'))
    app.get('/', (req, res) => {
      const html = `<h1>${config.WEBSITE_NAME}</h1>
                  
      `;
      res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.send(html);
    });
  
    app.use('/api/v1', appRoute);
  
    //handle route not found error
    app.use((req, res) => {
      res.status(500).send(`<h1>Page Not Found</h1>
                               <a href=${config.HOME_DOMAIN_URL}>Please visit homepage </a>
         `);
    });
  
    //app.use(errorHandler);
  
    return app;
  };
  