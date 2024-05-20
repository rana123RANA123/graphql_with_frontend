const User = require("../model/User");
const Recipe = require("../model/Recipe");

module.exports = {
    Query: {
        async user(_, { ID }) {
            return await User.findById(ID);
        },

        async getUsers(_, { }) {
            return await User.find().sort({ createdAt: -1 });
        },
        async recipe(_, { ID }) {
            return await Recipe.findById(ID);
        },

        async getRecipes(_, { amount }) {
            return await Recipe.find().sort({ createdAt: -1 }).limit(amount);
        }
    },
    Mutation: {
        async createUser(_, { userInput: { firstName, lastName, cnic, fatherName, phoneNumber, houseNumber } }) {
            const newUser = new User({
                firstName,
                lastName,
                fatherName,
                houseNumber,
                createdAt: new Date().toISOString(),
                cnic,
                phoneNumber,
            });

            const res = await newUser.save()

            return {
                id: res.id,
                ...res._doc
            }
        },

        async deleteUser(_, { ID }) {
            const deleted = (await User.deleteOne({ _id: ID })).deletedCount
            return deleted > 0;
        },

        async editUser(_, { ID, userInput: { firstName, lastName, cnic, fatherName, phoneNumber, houseNumber } }) {
            const editUser = (await User.findByIdAndUpdate(ID,
                { firstName, lastName, cnic, fatherName, phoneNumber, houseNumber },
                { new: true }
            ))
            return editUser
        },


        async createRecipe(_, { recipeInput: { name, description } }) {
            const newRecipe = new Recipe({
                name,
                description,
                createdAt: new Date().toISOString(),
                thumbsUp: 0,
                thumbsDown: 0,
            });

            const res = await newRecipe.save();

            return {
                id: res.id,
                ...res._doc
            };
        },

        async deleteRecipe(_, { ID }) {
            const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
            return wasDeleted > 0;
        },

        async editRecipe(_, { ID, recipeInput: { name, description } }) {
            const updatedRecipe = await Recipe.findByIdAndUpdate(
                ID,
                { name, description },
                { new: true }
            );
            return updatedRecipe;
        }
    }
};
