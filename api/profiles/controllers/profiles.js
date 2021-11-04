const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
    /**
     * Update a record.
     *
     * @return {Object}
     */

    async update(ctx) {
        const { id } = ctx.params;

        let entity;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            entity = await strapi.services.profiles.update({ id }, data, {
                files,
            });
        } else {
            const pd = await strapi.services.profiles.findOne({ id });
            entity = await strapi.services.profiles.update({ id }, {
                numberOfVisit: parseInt(pd.numberOfVisit) + parseInt(ctx.request.body.numberOfVisit)
            });
        }

        return sanitizeEntity(entity, { model: strapi.models.profiles });
    },
};