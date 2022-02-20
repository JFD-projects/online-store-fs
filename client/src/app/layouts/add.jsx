import React from "react";
import ProductsLoader from "../components/ui/hoc/productsLoader";
import AddProductTable from "../components/ui/addProductTable";

const Add = () => {
  return (
      <>
        <ProductsLoader>
          <AddProductTable />
        </ProductsLoader>
      </>
  );
};

export default Add;
