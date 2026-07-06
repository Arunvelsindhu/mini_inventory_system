import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

function DashboardCharts({ products }) {

    // Products by Category
    const categoryMap = {};

    products.forEach((product) => {

        categoryMap[product.category] =
            (categoryMap[product.category] || 0) + 1;

    });

    const pieData = {

        labels: Object.keys(categoryMap),

        datasets: [

            {

                label: "Products",

                data: Object.values(categoryMap),

                backgroundColor: [

                    "#3498db",
                    "#2ecc71",
                    "#f39c12",
                    "#9b59b6",
                    "#e74c3c",
                    "#1abc9c",
                    "#34495e"

                ]

            }

        ]

    };

    // Stock by Product

    const barData = {

        labels: products.map(product => product.name),

        datasets: [

            {

                label: "Available Stock",

                data: products.map(product => product.stock),

                backgroundColor: "#3498db"

            }

        ]

    };

    return (

        <div className="charts">

            <div className="chart-card">

                <h3>Products by Category</h3>

                <Pie data={pieData} />

            </div>

            <div className="chart-card">

                <h3>Stock by Product</h3>

                <Bar
                    data={barData}
                    options={{

                        responsive: true,

                        plugins: {

                            legend: {

                                display: false

                            }

                        }

                    }}
                />

            </div>

        </div>

    );

}

export default DashboardCharts;