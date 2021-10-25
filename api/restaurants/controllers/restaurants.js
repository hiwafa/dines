'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async counts(ctx) {
        const { restaurant, text } = ctx.query;
        const comments = await strapi.services.comments.count({ restaurant, text_null: false })
        const rates = await strapi.services.comments.count({ restaurant })
        const foods = await strapi.services.foods.count({ restaurant })
        const categories = await strapi.services.categories.count({ restaurant })
        console.log(comments)
        return { comments, rates, foods, categories }
    }
};
