const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    let token = req.header('x-auth-token');

    if(!token){
        return res.status(401).send('Autenticacion requerida.');
    }
    
    try{
        let user = jwt.verify(token, config.get('jwtPrivateKey'));
        if(user.isAdmin == true){
            req.user = user;
            next();
        }
        else{
            return res.status(403).send('Permisos de administrador requeridos.');
        }
    }
    catch (e){
        return res.status(400).send('Token invalido.');
    }
}