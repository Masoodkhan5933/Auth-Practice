const db = require("../models");
require('dotenv').config();

const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const { username, email, password, roles } = req.body;
    console.log('Signup request received:', req.body);

    if (!username || !email || !password || !roles) {
        console.log('Validation error: All fields are required!');
        return res.status(400).send({ message: "All fields are required!" });
    }

    const user = new User({
        username,
        email,
        password: bcrypt.hashSync(password, 8)
    });
    console.log('New user created:', user);

    user.save((err, user) => {
        if (err) {
            console.error('Error saving user:', err);
            res.status(500).send({ message: err });
            return;
        }

        console.log('User saved:', user);

        Role.find(
            { name: { $in: Array.isArray(roles) ? roles : [roles] } },
            (err, foundRoles) => {
                if (err) {
                    console.error('Error finding roles:', err);
                    res.status(500).send({ message: err });
                    return;
                }

                if (!foundRoles.length) {
                    console.log('Validation error: Role does not exist!', roles);
                    return res.status(400).send({ message: `Failed! Role ${roles} does not exist!` });
                }

                console.log('Roles found:', foundRoles);

                user.roles = foundRoles.map(role => role._id);
                user.save(err => {
                    if (err) {
                        console.error('Error saving user roles:', err);
                        res.status(500).send({ message: err });
                        return;
                    }

                    console.log('User registered successfully:', user);
                    res.send({ message: "User was registered successfully!" });
                });
            }
        );
    });
};

exports.signin = (req, res) => {
    console.log('Signin request received:', req.body);
    User.findOne({
        username: req.body.username
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                console.error('Error finding user:', err);
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                console.log('Validation error: User not found.');
                return res.status(404).send({ message: "User Not found." });
            }

            

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                console.log('Validation error: Invalid password.');
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            console.log('User found:', user);

            var token = jwt.sign({ id: user.id }, process.env.SECRET, {
                expiresIn: 86400 // 24 hours
            });

            console.log('Token generated:', token);

            var authorities = [];
            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }

            console.log('User signed in successfully:', user);

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
};
