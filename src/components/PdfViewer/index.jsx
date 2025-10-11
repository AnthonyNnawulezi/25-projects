import {
  Document,
  Page,
  PDFDownloadLink,
  PDFViewer,
  Text,
  View,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import "./style.css";

function PdfViewer() {
  const [products, setProducts] = useState([]);
  const [productsDetails, setProductsDetails] = useState(null);

  async function FetchProducts() {
    // Fetch product details from an API or other source
    const response = await fetch(
      "https://dummyjson.com/products?limit=10&skip=0"
    );
    const data = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    FetchProducts();
  }, []);

  async function FetchProductDetails(id) {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    setProductsDetails(data);
    console.log(data);
  }

  function ViewDocument(productsDetails) {
    return (
      <Document>
        <Page>
          <Text>Product Details</Text>
          {productsDetails && (
            <View>
              <Text>ID: {productsDetails.id}</Text>
              <Text>Title: {productsDetails.title}</Text>
              <Text>Description: {productsDetails.description}</Text>
              <Text>Price: {productsDetails.price}</Text>
            </View>
          )}
        </Page>
      </Document>
    );
  }

  return (
    <div className="pdf-viewer-container">
      <h1>PdfViewer</h1>
      <ul>
        {products && products.length > 0
          ? products.map((product) => (
              <li onClick={FetchProductDetails(product.id)} key={product.id}>
                {product.title}
              </li>
            ))
          : null}
      </ul>
      <div className="pdf-viewer">
        <PDFViewer width="600" height="400">
          <ViewDocument productsDetails={productsDetails} />
        </PDFViewer>
      </div>
      <PDFDownloadLink
        Document={<ViewDocument productsDetails={productsDetails} />}
      >
        <button>Download PDF</button>
      </PDFDownloadLink>
    </div>
  );
}

export default PdfViewer;
