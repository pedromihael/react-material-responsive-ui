import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h6>VAMO NESSA PORRA</h6>');
});

export default router;