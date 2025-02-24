const findOrder = (req, res) => {
    const periodTime = req.params.period_time; // Get period_time from request params
    let orders = [];
    // Example orders data (replace with actual database query)
    if (periodTime === 'TO_DAY') {
        orders = [
            {
                id: 1,
                date: "2024-02-25",
                items: [{ count: 2, price: 10 }, { count: 1, price: 5 }]
            },
            {
                id: 2,
                date: "2024-02-24",
                items: [{ count: 3, price: 15 }]
            }
            ,
            {
                id: 3,
                date: "2024-02-23",
                items: [{ count: 1, price: 5 }]
            }
            ,
            {
                id: 4,
                date: "2024-02-22",
                items: [{ count: 5, price: 25 }]
            }
            ,
        ];
    }
    else if (periodTime === 'YESTERDAY') {
        orders = [
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
            ,
            {
                id: 3,
                date: "2024-02-22",
                items: [{ count: 1, price: 5 }]
            }
            ,
            {
                id: 4,
                date: "2024-02-21",
                items: [{ count: 5, price: 25 }]
            }
            ,
            {
                id: 5,
                date: "2024-02-20",
                items: [{ count: 2, price: 10 }]
            }
            ,
            {
                id: 6,
                date: "2024-02-19",
                items: [{ count: 1, price: 5 }]
            }
        ];
    }
    else if (periodTime === 'LAST_WEEK') {
        orders = [
            {
                id: 1,
                date: "2024-02-18",
                items: [{ count: 2, price: 10 }, { count: 1, price: 5 }]
            },
            {
                id: 2,
                date: "2024-02-17",
                items: [{ count: 3, price: 15 }]
            }
            ,
            {
                id: 3,
                date: "2024-02-16",
                items: [{ count: 1, price: 5 }]
            }
            ,
            {
                id: 4,
                date: "2024-02-15",
                items: [{ count: 5, price: 25 }]
            }
            ,
            {
                id: 5,
                date: "2024-02-14",
                items: [{ count: 2, price: 10 }]
            }
            ,
            {
                id: 6,
                date: "2024-02-13",
                items: [{ count: 1, price: 5 }]
            }
            ,
            {
                id: 7,
                date: "2024-02-12",
                items: [{ count: 3, price: 15 }]
            }
        ];
    }
    else if (periodTime === 'LAST_MONTH') {
        orders = [
            {
                id: 1,
                date: "2024-01-31",
                items: [{ count: 2, price: 10 }, { count: 1, price: 5 }]
            },
            {
                id: 2,
                date: "2024-01-30",
                items: [{ count: 3, price: 15 }]
            }
            ,
            {
                id: 3,
                date: "2024-01-29",
                items: [{ count: 1, price: 5 }]
            }
            ,
            {
                id: 4,
                date: "2024-01-28",
                items: [{ count: 5, price: 25 }]
            }
            ,
            {
                id: 5,
                date: "2024-01-27",
                items: [{ count: 2, price: 10 }]
            }
            ,
            {
                id: 6,
                date: "2024-01-26",
                items: [{ count: 1, price: 5 }]
            }
            ,
            {
                id: 7,
                date: "2024-01-25",
                items: [{ count: 3, price: 15 }]
            }
            ,
            {
                id: 8,
                date: "2024-01-24",
                items: [{ count: 2, price: 10 }]
            }
            ,
            {
                id: 9,
                date: "2024-01-23",
                items: [{ count: 1, price: 5 }]
            }
            ,
            {
                id: 10,
                date: "2024-01-22",
                items: [{ count: 3, price: 15 }]
            }
            ,
            {
                id: 11,
                date: "2024-01-21",
                items: [{ count: 2, price: 10 }]
            }
            ,
            {
                id: 12,
                date: "2024-01-20",
                items: [{ count: 1, price: 5 }]
            }
            ,
            {
                id: 13,
                date: "2024-01-19",
                items: [{ count: 3, price: 15 }]
            }
            ,
            {
                id: 14,
                date: "2024-01-18",
                items: [{ count: 2, price: 10 }]
            }
            ,
            {
                id: 15,
                date: "2024-01-17",
                items: [{ count: 1, price: 5 }]
            }
            ,
            {
                id: 16,
                date: "2024-01-16",
                items: [{ count: 3, price: 15 }]
            }
            ,
            {
                id: 17,
                date: "2024-01-15",
                items: [{ count: 2, price: 10 }]
            }
            ,
            {
                id: 18,
                date: "2024-01-14",
                items: [{ count: 1, price: 5 }]
            }
            ,
            {
                id: 19,
                date: "2024-01-13",
                items: [{ count: 3, price: 15 }]
            }
            ,
            {
                id: 20,
                date: "2024-01-12",
                items: [{ count: 2, price: 10 }]
            }
            ,
            {
                id: 21,
                date: "2024-01-11",
                items: [{ count: 1, price: 5 }]
            }

        ];
    }

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