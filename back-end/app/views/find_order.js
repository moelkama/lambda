const findOrder = (req, res) => {
    const periodTime = req.params.period_time; // Get period_time from request params

    // Example orders data (replace with actual database query)
    const orders = [
        {
            id: 1,
            date: "2024-02-24",
            items: [{ count: 2, price: 10 }, { count: 1, price: 5 }]
        },
        {
            id: 2,
            date: "2024-02-23",
            items: [{ count: 3, price: 15 }]
        }
    ];

    // Map through orders and calculate total price
    const formattedOrders = orders.map(order => ({
        id: order.id,
        date: order.date,
        total: order.items.reduce((sum, item) => sum + item.count * item.price, 0)
    }));

    // Return JSON response
    res.json({
        period_time: periodTime,
        period_times: ['TO_DAY', 'YESTERDAY', 'LAST_WEEK', 'LAST_MONTH'],
        orders: formattedOrders
    });
};

// Export function for routing
module.exports = findOrder;