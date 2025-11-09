const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
	{
		// name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		username: { type: String, required: false },
		password: { type: String },
		active: { type: Boolean, default: false },
		isAdmin: { type: Boolean, default: false },
		firstLogin: { type: Boolean, default: true },
		firstname: String,
		lastname: String,
		companyName: String,
		city: String,
		address: String,
		phoneNumber: String,
		userType: String,
		role: String,
		isVerified: { type: Boolean, default: false },
  		verificationToken: { type: String },
	},
	{ timestamps: true }
);

userSchema.methods.matchPasswords = async function (enteredPassword) {
	// console.log('TOKEN_SECRET:', process.env.TOKEN_SECRET);
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
