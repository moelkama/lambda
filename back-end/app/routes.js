const express = require('express');
const router = express.Router();

// Import controllers
// const views = require('./views');
const findOrder = require('./views/find_order');
// const dynamicForm = require('./dynamic_form');
// const { createArticle, getArticles, deleteArticle } = require('./article_views');
// const { createOrder, searchOrder, updateOrder, deleteOrder } = require('./order_views');
// const statistics = require('./statistics_views');
// const serveFile = require('./serve_file');
// const generatePdf = require('./generate_pdf');

// // Articles Routes
// router.get('/get_articles', getArticles);
// router.post('/create_article', createArticle);
// router.delete('/delete_article/:article_id', deleteArticle);

// // Generate PDF
// router.get('/generate_pdf/:order_id', generatePdf);

// // Serve Files
// router.get('/media/:dir/:file', serveFile);

// // CSRF Token
// router.get('/csrf', views.getCsrfToken);

// Order Routes
router.get('/find_order/:period_time', findOrder);
// router.get('/search_order/:order_id', searchOrder);
// router.put('/update_order/:order_id', updateOrder);
// router.post('/create_order', createOrder);
// router.delete('/delete_order/:order_id', deleteOrder);

// Statistics Routes
// router.get('/statistics/Years', statistics.HowManyYears);
// router.get('/statistics/Orders_per_month/:year', statistics.OrdersPerMonth);
// router.get('/statistics/Orders/:year/:month', statistics.OrdersStatistics);
// router.get('/statistics/Articles/:period_time', statistics.ArticlesStatistics);

module.exports = router;