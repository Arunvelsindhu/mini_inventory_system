import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportProductsToPDF = (products) => {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Inventory Management System", 14, 18);

    doc.setFontSize(12);
    doc.text("Products Report", 14, 28);

    const tableColumn = [
        "ID",
        "Name",
        "SKU",
        "Category",
        "Price",
        "Stock",
        "Low Stock"
    ];

    const tableRows = [];

    products.forEach(product => {

        tableRows.push([
            product.id,
            product.name,
            product.sku,
            product.category,
            `₹ ${product.price}`,
            product.stock,
            product.low_stock_limit
        ]);

    });

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 38,
        theme: "grid",
        headStyles: {
            fillColor: [44, 62, 80]
        }
    });

    doc.save("Inventory_Report.pdf");

};

export default exportProductsToPDF;