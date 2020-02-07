const { User } = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async function() {
    let admin = await User.findOne({ user: 'admin' });
    if(!admin){
        const hash = await bcrypt.hash('admin', 10);
        User.create({
            user: 'admin',
            password: hash, 
            isAdmin: true
        });

        console.log('Admin created...');
    }
}
