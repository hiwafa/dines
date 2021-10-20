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
    }
};
