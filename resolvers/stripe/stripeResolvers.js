const User = require("../../models/usersModel");
const { stripe } = require("./stripe");
module.exports = {
    Mutation: {
        createSubscription: async (root, args, ctx) => {
            const user = await Users.findBy(email)
            const customer = stripe.customers.create({
                email: user.email,
                source,
                plan: process.env.PLAN
            })

            user.stripeId = customer.id;
            user.userType = "Super User"
            await user.save()

            return user;
        }
    }
}