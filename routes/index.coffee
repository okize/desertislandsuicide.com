router = require('express').Router()
homeController = require '../controllers/home'

router.get '/', homeController.index

module.exports = router
