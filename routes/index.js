var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET FAQs page. */
router.get('/faqs', function(req, res, next) {
  res.render('faqs', { title: 'FAQs' });
});

/* GET Conact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Us' });
});

module.exports = router;
