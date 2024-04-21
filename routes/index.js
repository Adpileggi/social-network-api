const router = require('express').Router();
const apiRoutes = require('./api/userRoutes');

router.use('/api', apiRoutes);

router.use((req,res) => {
    return res.send('Try a differnt route');
});

module.exports = router;