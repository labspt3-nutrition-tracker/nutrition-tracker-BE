const User = require("../../models/usersModel");
const Billing = require("../../models/billingModel");
const stripe = require("../../stripe");
module.exports = {
    Mutation: {
        createSubscription: async (root, args, ctx) => {
            const {source, email} = args

            let user = await User.findBy({"email": email})
            const customer = stripe.customers.create({
                email: user.email,
                source,
                plan: process.env.PLAN
            })

            user = {
                ...user[0],
                stripe_id: customer.id,
                userType: "Super User"
            }

            const billingInfo = {
                user_id: user.id,
                stripeId: user.stripe_id,
                amount_paid: source.price
            }

            const newUser = await User.edit(user.id, user);

            console.log(source)

            return user;
        }
    }
}