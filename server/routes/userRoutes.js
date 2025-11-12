const express = require('express')
const User = require('../models/User.js')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const { admin, protectRoute } = require('../middleware/authMiddleware.js')
const crypto = require('crypto');
const sendVerificationEmail = require('../utils/sendVerificationEmail.js');

const userRoutes = express.Router();

//TODO: redefine expiresIn
const genToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '60d' });
};

// login
const loginUser = asyncHandler(async (req, res) => {

	//console.log('U loginu sam')
    
    const username = req.body.credentials.username;
    const password = req.body.credentials.password;

	//console.log('evo useranamea:'+username)

    // console.log('username: ' + username)
    // console.log('password: ' + password)

	const email = username
   
  let user = null;
  if(email.includes("@")){
       user = await User.findOne({ email: email });

  }else {
       user = await User.findOne({ username: email });
  }

	//console.log('evo usera:')
	//console.log(user)

	// console.log('user:'+user)
   
	if (user && (await user.matchPasswords(password))) {

		if (!user.isVerified) {
			return res.status(401).send('Please verify your email before logging in.');
		}

	// if (true) {
		user.firstLogin = false;
		await user.save();
		res.json({
		    _id: user._id,
			username: user.username,
			isAdmin: user.isAdmin,
			token: genToken(user._id),
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      companyName: user.companyName,
      city: user.city,
      address: user.address,
      phoneNumber: user.phoneNumber,
      userType: user.userType,
      role: user.role
		});
	} else {
		// res.status(401).send('Invalid Email or Password.');
		// throw new Error('User not found.');
		res.status(401);
   		throw new Error('Invalid username or password.');
	}

		// res.json({
		//     _id: '1234',
		// 	username: 'Dejan',
		// 	isAdmin: true,
		// 	// token: genToken(user._id),
		// })
});

// register
// const registerUser = asyncHandler(async (req, res) => {

// 	console.log('evo me u registeru')
// 	const { firstname, email, password } = req.body;

// 	const userExists = await User.findOne({ email });
// 	if (userExists) {
// 		res.status(400).send('We already have an account with that email address.');
// 	}

// 	const verificationToken = crypto.randomBytes(32).toString('hex');
	
// 	const user = await User.create({
// 		firstname,
// 		email,
// 		password,
// 		verificationToken,
//     	isVerified: false,
// 	});




// 	const newToken = genToken(user._id);

// 	//sendVerificationEmail(newToken, email, name);

// 	if (user) {

// 		console.log('eve me be')

// 		await sendVerificationEmail(user.email, user.verificationToken);

// 		res.status(201).json({
// 		message: 'User registered. Please check your email to verify your account.',
// 		});
// 		// res.status(201).json({
// 		// 	_id: user._id,
// 		// 	username: user.username,
// 		// 	email: user.email,
// 		// 	// googleImage: user.googleImage,
// 		// 	// googleId: user.googleId,
// 		// 	firstLogin: user.firstLogin,
// 		// 	isAdmin: user.isAdmin,
// 		// 	token: newToken,
// 		// 	active: user.active,
// 		// 	createdAt: user.createdAt,
// 		// });
// 	} else {
// 		// res.status(400).send('We could not register you.');
// 		// throw new Error('Something went wrong. Please check your information and try again.');
// 		 res.status(400).send('We could not register you.');
// 	}
// });
const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, companyName, email,city, address,phoneNumber, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send('We already have an account with that email address.');
  }

  const verificationToken = crypto.randomBytes(32).toString('hex');

  try {

    let user = null;

    if(companyName){
        user = await User.create({
        companyName,
        email,
        city,
        address,
        phoneNumber,
        password,
        verificationToken,
        isVerified: false,
        role: 'kompanija'
      });
   } else {
        user = await User.create({
        firstname,
        lastname,
        email,
        city,
        address,
        phoneNumber,
        password,
        verificationToken,
        isVerified: false,
        role: 'fizicko'
      });
    }

    await sendVerificationEmail(user.email, user.verificationToken);

    return res.status(201).json({
      // message: 'User registered. Please check your email to verify your account.',
       message: 'User registered. Please check your email to verify your account.',
    });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).send('We could not register you. Please try again.');
  }
});

// routes/userRoutes.js or wherever your user routes are
userRoutes.get('/verify-email', asyncHandler(async (req, res) => {
  const { token } = req.query;

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return res.status(400).send('Invalid or expired verification token.');
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  // res.send('Email successfully verified! You can now log in.');
   res.send('Email je uspješno verifikovan! Možete se ulogovati na vaš nalog.');
}));

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// GET /api/users/:id — get single user
const getUser = asyncHandler(async (req, res) => {
  // console.log('trazim usera')
  const user = await User.findById(req.params.id).select('-password'); // exclude password

  
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// DELETE /api/users/:id — delete user
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


userRoutes.put('/', asyncHandler(async (req, res) => {

    //console.log('ovde sam jarane')
 
    try {

      
      const { id ,city, address, phoneNumber } = req.body;

      const user = await User.findById(id);
      if (!user) {
        res.status(404);
        throw new Error('User not found');
      }

      // Update fields
      user.city = city;
      user.address = address;
      user.phoneNumber = phoneNumber;

      console.log('city:',user.city)
       
      await user.save();

      res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

}));



userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);
userRoutes.route('/').get(protectRoute, admin, getUsers);
userRoutes
  .route('/:id')
  .get(protectRoute, admin, getUser)
  .delete(protectRoute, admin, deleteUser);
  
 module.exports = userRoutes;
