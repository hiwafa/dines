'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async restaurantFoods(ctx) {
        const { restaurant } = ctx.params;
        let populate;
        populate = ["comments", "categories", "ingredients", "images", "comments.created_by", "comments.reply"]
        return await strapi.services.foods.find({ restaurant }, populate)
    },

    async update(ctx) {
        let { ingredients } = ctx.request.body;
        let food = ctx.request.body;
        let ingreds = [];

        for (let i = 0; i < ingredients.length; i++) {
            const exist = await strapi.services.ingredients.findOne({ name: ingredients[i] })
            if (exist?.id) {
                ingreds.push(exist.id);
            }
            else {
                const add = await strapi.services.ingredients.create({ name: ingredients[i] })
                ingreds.push(add.id)
            }
        }
        food.ingredients = ingreds

        // update db
        try {
            return await strapi.services.foods.update({ id: food.id }, food)
        }
        catch (e) {
            return e;
        }

    }
};
