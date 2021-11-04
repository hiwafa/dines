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
            entity = await strapi.services.profile.update({ id }, data, {
                files,
            });
        } else {
            const pd = await strapi.services.profile.findOne({ id });
            entity = await strapi.services.profile.update({ id }, {
                numberOfVisit: pd.numberOfVisit + 1
            });
        }

        return sanitizeEntity(entity, { model: strapi.models.profile });
    },
};