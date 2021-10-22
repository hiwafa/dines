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
        let { ingredients, categories } = ctx.request.body;
        let food = ctx.request.body;
        let ingreds = [];
        let cats = [];

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

        for (let i = 0; i < categories.length; i++) {
            const exist = await strapi.services.categories.findOne({ name: categories[i] })
            if (exist?.id) {
                cats.push(exist.id);
            }
            else {
                const add = await strapi.services.categories.create({ name: categories[i], restaurant: food.restaurant })
                cats.push(add.id)
            }
        }
        food.ingredients = ingreds
        food.categories = cats

        // update db
        try {
            return await strapi.services.foods.update({ id: food.id }, food)
        }
        catch (e) {
            return e;
        }

    }
};
