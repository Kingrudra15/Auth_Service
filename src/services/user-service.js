const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig')
const bcrypt = require('bcrypt')


class UserService {
    constructor(){
        this.userRepository = new UserRepository();

    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("something wrong at token creation");
            throw error;  
        }
    }

    async signIn(email,plainPassword){
        try {
            // step1 fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            //step2  compare incoming plain password with stores encypted password
            const passwordsMatch = this.checkPassword(plainPassword,user.password);

            if(!passwordsMatch){
                console.log("password doesn't match");
                throw{error: 'incorrect password'};
            }
            //step 3-- if password match create a token and sent to user
            const newJWT = this.createToken({email:user.email,id: user.id});
            return newJWT;
        } catch (error) {
            console.log("something wrong at sign process");
            throw error; 
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY,{expiresIn:'1d'});
            return result;
        } catch (error) {
            console.log("something went wrong in token creation");
            throw error;
 
        }

    }

    varifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("something wrong at token validation",error);
            throw error; 
        }
    }

    checkPassword(userInputPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPassword,encryptedPassword)
        } catch (error) {
            console.log("something went wrong in password comparison");
            throw error;
   
        }
    }
}



module.exports = UserService;