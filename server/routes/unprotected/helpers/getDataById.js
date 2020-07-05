import _ from 'lodash';

/**
 * Process `id` and return some data.
 *
 * @param {String} args.id - Some sample parameter to test the flow.
 * @returns {Object} Contains `id` and `data`.
 */
export default async function getDataById({ id } = {}) {
    if (_.isEmpty(id)) {
        throw new Error(`Invalid ID: ${id}`);
    }
    return await Promise.resolve({ id, data: `some_unprotected_data_for_${id}` });
}
