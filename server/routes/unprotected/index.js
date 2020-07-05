import _ from 'lodash';
import express from 'express';
const router = express.Router();

import { getDataById } from './helpers';

router.post('/', async (req, res) => {
    const { id } = req.body;
    try {
        if (_.isEmpty(id)) {
            throw new Error('No ID passed in.');
        }
        res.status(200).json(await getDataById({ id }));
    } catch (error) {
        return res.status(500).send({ error: _.get(error, 'message', error) });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (_.isEmpty(id)) {
            throw new Error('No ID passed in.');
        }
        res.status(200).json(await getDataById({ id }));
    } catch (error) {
        return res.status(500).send({ error: _.get(error, 'message', error) });
    }
});

export default router;
