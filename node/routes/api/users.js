const express = require('express');
const router = express.Router();
const uuid = require('uuid');

let users = require('../../Users');

//get all users 
router.get('/', (req, res) => {
    res.json(users);
});


router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const found = users.find(user => user.id == parseInt(userId));

    if (!found) {
        return res.status(404).json({ msg: `User with ${userId} not found` });
    }
    res.json(found);
});

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;

    // Check if user with the given ID exists
    const foundUser = users.find(user => user.id === parseInt(userId));

    if (!foundUser) {
        return res.status(404).json({ msg: `User with ID ${userId} not found` });
    }

    // Check if email is provided and ensure it's unique
    if (email && users.some(user => user.email === email && user.id !== parseInt(userId))) {
        return res.status(400).json({ msg: 'Email must be unique' });
    }

    // Update user data
    users = users.map(user => {
        if (user.id === parseInt(userId)) {
            if (name) user.name = name;
            if (email) user.email = email;
        }
        return user;
    });

    res.json({ msg: 'User updated successfully', updatedUser: users.find(user => user.id === parseInt(userId)) });
});

router.post('/', (req, res) => {

    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }
    if (!newUser.name || !newUser.email) {
       return  res.sendStatus(400)
    }

    if(users.some(user => user.email == newUser.email ))
    {
       return  res.json({ 'msg': `${newUser.email} already exist ...`}) ;
    }

    users.push(newUser);
    res.json(users) ;
})

router.delete('/:id' , (req,res)=>
{

    found = users.some(user => user.id === parseInt(req.params.id)) ;

    if(!found)
    {
        return res.status(400).json({ 'msg' : `${req.params.id} is not found `}) ;
    }

    users =  users.filter(user =>  user.id !== parseInt(req.params.id)) ;
    
    res.json({ msg : 'user deleted successfully' , users}) ;

})

module.exports = router;
