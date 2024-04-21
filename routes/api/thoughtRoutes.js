const router = require('express').Router();

const { 
    getThoughts,
    createThought,
    getSingleThought, 
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController');

// api/thoughts
router.route('/').get(getThoughts).post(createThought);

// api/thougths/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;