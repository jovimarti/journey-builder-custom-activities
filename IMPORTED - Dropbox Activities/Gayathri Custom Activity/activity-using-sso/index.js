"use strict";

var config      = require('./config/qa');
var _           = require('underscore');
var express     = require('express');
var http        = require('http');
var jwtSimple   = require('jwt-simple');
var hbs         = require('hbs');

var app = express();

app.configure(function() {
    app.set('port', (process.env.PORT || 5000));

    app.set('view engine', 'hbs');
    app.set('views', __dirname + '/server/views');

    app.use(express.static(__dirname + '/public'));

    app.use(express.cookieParser());

    app.use(express.session({
        store: new express.session.MemoryStore()
        , secret: 'custom-activity-sso!@#$'
        , key: 'custom-activity-sso-app'
        , cookie: { httpOnly: true }
    }));
});

var conditionalCSRFWhitelist = [
    '/login'
];
var conditionalCSRFMiddleware = express.csrf();
var conditionalCSRF = function (req, res, next) {
    if (conditionalCSRFWhitelist.indexOf(req.url) !== -1) {
        next();
    } else {
        conditionalCSRFMiddleware(req, res, next);
    }
};

app.use(conditionalCSRF);

app.post('/login', function( req, res ) {
    var formParser = express.urlencoded();
    var jwt = null;
    var appSignature = config.environs['QA3S1'].appSignature;

    formParser(req, res, function() {
        try {
            jwt = jwtSimple.decode( req.body.jwt, appSignature );
        } catch (e) {
            jwt = null;
        }

        if ( jwt === null ) {
            res.send( 500, 'Unable to decode jwt!' );
            return;
        }

        // User info object (MID, Organization, etc)
        req.session.user = req.session.user || {
            id:         jwt.request.user.id
            , culture:  jwt.request.user.culture
            , timezone: jwt.request.user.timezone.shortName // Nothing using this yet, so only store minimal info
            , email:    jwt.request.user.email
        };
        req.session.user.org = req.session.user.org || jwt.request.organization;

        // Fuel info object (mostly just keys)
        req.session.fuel = req.session.fuel || {};
        req.session.fuel.token = jwt.request.user.oauthToken;
        req.session.fuel.legacyToken = jwt.request.user.internalOauthToken;
        req.session.fuel.refreshToken = jwt.request.user.refreshToken;
        req.session.fuel.culture = jwt.request.user.culture;
        req.session.fuel.stackKey = String(jwt.request.organization.stackKey).toUpperCase();
        req.session.fuel.redirectLink = jwt.request.query && jwt.request.query.deepLink;

        if ( req.session.fuel.redirectLink ) {
            console.log('Redirect link found.  Redirecting to ', req.session.fuel.redirectLink);
            res.redirect( req.session.fuel.redirectLink ); // safe because this is only done on /login
            delete req.session.fuel.redirectLink;
        } else {
            res.redirect( '/' );
        }
    });
});

app.get('/index.html', renderIndex);
app.get('/', renderIndex);

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});

function renderIndex(req, res) {
    res.render('index', {
        user: req.session.user
        , stackKey: req.session.fuel.stackKey
        , token: req.csrfToken()
        , legacyToken: req.session.fuel.legacyToken
        , culture: req.session.fuel.culture
    });
}