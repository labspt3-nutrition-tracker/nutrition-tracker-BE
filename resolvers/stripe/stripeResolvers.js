const User = require("../../models/usersModel");
const Billing = require("../../models/billingModel");
const stripe = require("../../stripe");

const moment = require('moment');

module.exports = {
    Query: {
        getBillingHistory: async (root, args, ctx) => {
            const { id } = args;

            const billingInfo = await Billing.findAllById(id)


            console.log(billingInfo)

            return billingInfo;
        }
    },
    Mutation: {
        createSubscription: async (root, args, ctx) => {
            const {source, email} = args;

            let user = await User.findBy({"email": email});
            const customer = await stripe.customers.create({
                email: user.email,
                source,
                plan: process.env.PLAN
            });

            user = {
                ...user[0],
                stripe_id: customer.id,
                userType: "Super User"
            }

            const billingInfo = {
                date: moment().format('ddd MMMM D YYYY'),
                user_id: user.id,
                stripeId: user.stripe_id,
                amount_paid: 700
            }

            console.log("create",billingInfo)

            await Billing.add(billingInfo)
            await User.edit(user.id, user);

            return user;
        }
    }
}