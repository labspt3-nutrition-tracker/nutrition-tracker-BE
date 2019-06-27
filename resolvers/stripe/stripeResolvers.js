const User = require("../../models/usersModel");
const Billing = require("../../models/billingModel");
const stripe = require("../../stripe");

const moment = require('moment');

module.exports = {
    Query: {
        getBillingHistory: async (root, args, ctx) => {
            const { id } = args;
            const billingInfo = await Billing.findAllById(id)

            return billingInfo;
        },

        getRecentBilling: async (root, args, ctx) => {
            const { id } = args;
            const billingInfo = await Billing.findLastById(id)

            return billingInfo;
        }

    },
    Mutation: {
        createSubscription: async (root, args, ctx) => {
            const {source, email, amount} = args;
            console.log("amount", amount)

            let user = await User.findBy({"email": email});

            if (amount == 700){

                const customer = await stripe.customers.create({
                    email: user.email,
                    source,
                    plan: process.env.PREMIUM_PLAN
                });

                user = {
                    ...user[0],
                    stripe_id: customer.id,
                    userType: "premium"
                }

                const billingInfo = {
                    date: moment().format('ddd MMMM D YYYY'),
                    user_id: user.id,
                    stripeId: user.stripe_id,
                    amount_paid: 700
                }

                console.log("create",billingInfo)
                console.log("userStripe", user)

                await Billing.add(billingInfo)

                const newUser = await User.edit(user.id, user);
                console.log("user", newUser)
                return newUser;
            }else{

                const customer = await stripe.customers.create({
                    email: user.email,
                    source,
                    plan: process.env.COACH_PLAN
                });

                user = {
                    ...user[0],
                    stripe_id: customer.id,
                    userType: "coach"
                }

                const billingInfo = {
                    date: moment().format('ddd MMMM D YYYY'),
                    user_id: user.id,
                    stripeId: user.stripe_id,
                    amount_paid: 1000
                }

                console.log("create",billingInfo)
                console.log("userStripe", user)

                await Billing.add(billingInfo)
                const newUser = await User.edit(user.id, user);
                console.log("user", newUser)
                return newUser;
            }
        }
    }
}