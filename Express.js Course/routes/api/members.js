const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

// Create a route that gets all members
router.get('/', (req, res) => {
    res.json(members);
});

// Get a single member
// Now is /:id because we are using the router
router.get('/:id', (req, res) => {
    // res.send(req.params.id);
    // Triple equals means that it will check the type as well
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

// Create Member, we can use / because now its post not get
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(), // generates random universal id
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email){
        return res.status(400).json({msg: 'Please include a name and email'});
    }

    members.push(newMember);
    res.json(members);
    // res.redirect('/');
});

// Update a Member
router.put('/:id', (req, res) => {
    // res.send(req.params.id);
    // Triple equals means that it will check the type as well
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updMember.name: member.name;
                member.email = updMember.email ? updMember.email: member.email;
            
                res.json({msg: 'Member updated', member});
            }
        });
    }
    else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

// Delete Member
router.delete('/:id', (req, res) => {
    // res.send(req.params.id);
    // Triple equals means that it will check the type as well
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json({
            msg: 'Member deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    }
    else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

module.exports = router;