'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async restaurantFoods(ctx) {
        const { restaurant } = ctx.params;
        return await strapi.services.foods.find({ restaurant })
    }
};
