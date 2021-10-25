'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async find(ctx) {
        const { restaurant, type, approved } = ctx.query;
        let populate;
        populate = ["user", "food"]
        return await strapi.services.comments.find({ restaurant, type, approved }, populate)
    }
};
