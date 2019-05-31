const User = require("../../models/usersModel");
const Billing = require("../../models/billingModel");
const stripe = require("../../stripe");
module.exports = {
    Mutation: {
        createSubscription: async (root, args, ctx) => {
            const {source, email} = args

            let user = await User.findBy({"email": email})
            console.log(user)
            const customer = await stripe.customers.create({
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
                date: new Date,
                user_id: user.id,
                stripeId: user.stripe_id,
                amount_paid: 700
            }


            await Billing.add(billingInfo)

            await User.edit(user.id, user);

            const test = await Billing.getAll()
            console.log(test)
            return user;
        }
    }
}