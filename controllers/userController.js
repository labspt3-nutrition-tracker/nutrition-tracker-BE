const { OAuth2Client } = require("google-auth-library");

const User = require("../models/usersModel");

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

exports.findOrCreateUser = async token => {
  // verify the auth token
  const googleUser = await verifyAuthToken(token);
  //check if user exists in database
  const user = await checkIfUserExists(googleUser.email);
  // if user exists, return info, else create user in database
  // return user ? user : createNewUser(googleUser);
  return user ? user : null;
};

const verifyAuthToken = async token => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID
    });
    return ticket.getPayload();
  } catch (err) {
    console.error("Error verifying auth token", err);
  }
};

const checkIfUserExists = async email => await User.findBy(email);

// const createNewUser = googleUser => {
//   const { given_name, family_name, email } = googleUser;
//   const user = { firstName: given_name, lastName: family_name, email };
//   return User.add(user);
// };
