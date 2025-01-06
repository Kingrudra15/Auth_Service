const express = require('express')
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig')

const apiRoutes = require('./routes/index');
//const UserService = require('./services/user-service')
//const UserRepository = require('./repository/user-repository')
const db = require('./models/index')
//const {User,Role} = require('./models/index')
const app = express();
const prepareAndStartServer = () => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
    app.use('/api',apiRoutes)

    app.listen(PORT , async () => {
        console.log(`server started ON port: ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true});
        }

        // const u1 = await User.findByPk(3);        
        // const r1 = await Role.findByPk(2)
        
        // //u1.addRole(r1);
        // const response = await u1.hasRole(r1)
        // console.log(response);
        

        // const repo = new UserRepository();
        // const response = await repo.getById(1)
        // console.log(response);
        // const service = new UserService();
        // // const newToken = service.createToken({email: 'aviiii@gmail.com',id:1});
        // // console.log('new token is :',newToken);
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF2aWlpaUBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNzM0NDU5NzEzLCJleHAiOjE3MzQ0NjMzMTN9.LYhHApTtJJruQBOlwpCmiyc3q0yWL0AY__HP8o31nQA';
        // const response = service.varifyToken(token);
        // console.log(response);
        
    })
}

prepareAndStartServer()