const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
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
    async updateFood(ctx) {
        const {id} = ctx.params;
        let { ingredients } = ctx.request.body;
        let food = ctx.request.body;
        let ingreds = [];

        for (let i = 0; i < ingredients.length; i++) {
            const exist = await strapi.services.ingredients.findOne({ name: ingredients[i] })
            if (exist!==null) {
                ingreds.push(exist.id);
            }
            else {
                const add = await strapi.services.ingredients.create({ name: ingredients[i] })
                ingreds.push(add.id)
            }
        }
        food.ingredients = ingreds
        // update db
        let entity;
        if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        data.ingredients = ingreds;
        entity = await strapi.services.foods.update({ id }, data, {
            files,
        });
        } else {
        ctx.request.body.ingredients = ingreds;
        entity = await strapi.services.foods.update({ id }, ctx.request.body);
        }

        return sanitizeEntity(entity, { model: strapi.models.foods });

}

};

