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

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Us' });
});

/* GET Privacy page. */
router.get('/privacypolicy', function(req, res, next) {
  res.render('privacypolicy', { title: 'Privacy Policy' });
});

module.exports = router;
