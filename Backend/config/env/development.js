//Development configuration options
//To sign the session identifier, use a secret string
module.exports = {
    //db: 'mongodb://localhost/articles-db',
    db: 'mongodb://127.0.0.1/articles-db',
    sessionSecret: 'developmentSessionSecret',
    secretKey: 'real_secret'
};
