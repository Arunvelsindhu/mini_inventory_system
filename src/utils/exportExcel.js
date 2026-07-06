import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportProductsToExcel = (products) => {

    const data = products.map(product => ({

        ID: product.id,
        Name: product.name,
        SKU: product.sku,
        Category: product.category,
        Price: product.price,
        Stock: product.stock,
        "Low Stock Limit": product.low_stock_limit

    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Products"
    );

    const excelBuffer = XLSX.write(
        workbook,
        {
            bookType: "xlsx",
            type: "array"
        }
    );

    const file = new Blob(
        [excelBuffer],
        {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
    );

    saveAs(file, "Inventory_Products.xlsx");

};

export default exportProductsToExcel;