import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import ProductList from "../../ui/productList";
import _ from "lodash";
import { useSelector } from "react-redux";
import { getProducts } from "../../../store/products";
import { getCategories, getCategoriesLoadingStatus } from "../../../store/categories";

const ProductsListPage = () => {
  const products = useSelector(getProducts());
  const categories = useSelector(getCategories());
  const categoriesLoading = useSelector(getCategoriesLoadingStatus());
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({
    path: "name",
    order: "asc"
  });
  const pageSize = 8;

  const renderSortArrow = (sort) => {
    if (sort.order === "asc") {
      return <i className="bi bi-caret-down-fill mx-2"/>;
    } else {
      return <i className="bi bi-caret-up-fill mx2"/>;
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  const handleProfessionSelect = (item) => {
    if (searchQuery !== "") setSearchQuery("");
    setSelectedProf(item);
  };
  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined);
    setSearchQuery(target.value);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleSort = () => {
    if (sortBy.path === "name") {
      setSortBy({
        path: "price",
        order: "asc"
      });
      return;
    }
    setSortBy({
      ...sortBy,
      order: sortBy.order === "asc" ? "desc" : "asc"
    });
  };

  function filterProducts(data) {
    return searchQuery
      ? data.filter((product) => product.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
      : selectedProf ? data.filter((product) => JSON.stringify(product.category) === JSON.stringify(selectedProf)) : data;
  }

  const filteredProducts = filterProducts(products).map(u => ({
    ...u,
    price: +u.price
  }));
  const count = filteredProducts.length;
  const sortedProducts = _.orderBy(filteredProducts, [sortBy.path], [sortBy.order]);
  const productsCrop = paginate(sortedProducts, currentPage, pageSize);
  const clearFilter = () => {
    setSelectedProf(undefined);
  };

  return (
    <div className="container-fluid">
      <div className="row g-0">
        <input
            className="form-control w-100 mb-3"
            type="text"
            name="searchQuery"
            placeholder="Search..."
            onChange={handleSearchQuery}
            value={searchQuery}
        />
        {categories && !categoriesLoading && (
          <div className="col d-flex flex-column flex-shrink-0" style={{
            maxWidth: "250px",
            marginRight: "1rem"
          }}>
            <GroupList
                selectedItem={selectedProf}
                items={categories}
                onItemSelect={handleProfessionSelect}
            />
            <button
                className="btn btn-secondary mt-2"
                onClick={clearFilter}
            >
              Очиститть
            </button>
          </div>
        )}
        <div className="col d-flex flex-column">
          {count > 0 && (
            <>
              <div className="d-flex justify-content-center">
                <button className="btn btn-light mb-3" onClick={handleSort}>
                  Сортировать по стоимости
                  {renderSortArrow(sortBy)}
                </button>
              </div>
              <ProductList
                  products={productsCrop}
              />
            </>
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
ProductsListPage.propTypes = {
  products: PropTypes.array
};

export default ProductsListPage;
