import React, { useState, useEffect } from "react";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, removeProduct } from "../../store/products";
import { getCategories, getCategoriesLoadingStatus } from "../../store/categories";
import AddForm from "./addForm";
import { Link } from "react-router-dom";
import Category from "./category";
import ProductsLoader from "./hoc/productsLoader";
import { formatPrice } from "../../utils/formatPrice";

const AddProductTable = () => {
  const products = useSelector(getProducts());
  const dispatch = useDispatch();
  const [product, setProduct] = useState("");
  const [editMode, setEditMode] = useState(false);
  const categories = useSelector(getCategories());
  const categoriesLoading = useSelector(getCategoriesLoadingStatus());
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProf, setSelectedProf] = useState();
  const pageSize = 8;

  const handleDelete = (productId) => {
    dispatch(removeProduct(productId));
    setEditMode(false);
  };

  const handleEdit = (prod) => {
    setProduct(prod);
    setEditMode(true);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined);
    setSearchQuery(target.value);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const renderContent = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    return _.get(item, columns[column].path);
  };

  function filterProducts(data) {
    return searchQuery
        ? data.filter((product) => product.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
        : data;
  }

  const columns = {
    name: {
      path: "name",
      name: "Наименование",
      component: (product) => (
          <Link className="small" to={`/product/${product._id}`}>{product.name}</Link>
      )
    },
    description: {
      name: "Описание",
      component: (product) => <p className="small" style={{
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: "3",
        WebkitBoxOrient: "vertical"
      }}>{product.description}</p>
    },
    price: {
      name: "Цена",
      component: (product) => <p className="small text-nowrap">{formatPrice(+product.price)}</p>
    },
    category: {
      name: "Категория",
      component: (product) => <Category id={product.category}/>
    },
    quantity: {
      name: "Количество",
      component: (product) => <p className="small text-center">{product.quantity}</p>
    },
    photo: {
      name: "Фото",
      component: (product) => (
          <div style={{ width: "100px" }}>
            <img src={product.photo} alt="photo" className="img-fluid"/>
          </div>
      )
    },
    actions: {
      path: "photo",
      name: "Действия",
      component: (product) => (
          <div className="d-flex align-items-center justify-content-end">
            <i style={{ color: "blue" }} role="button" className="bi bi-pencil-fill mx-2"
               onClick={() => handleEdit(product._id)}/>
            <i style={{ color: "red" }} role="button" className="bi bi-x-circle-fill"
               onClick={() => handleDelete(product._id)}/>
          </div>
      )
    }
  };
  const filteredUsers = filterProducts(products);
  const count = filteredUsers ? filteredUsers.length : 0;
  const usersCrop = paginate(filteredUsers, currentPage, pageSize);

  return (
    <>
      <ProductsLoader>
        <div className="container-fluid">
          <div className="row g-0">
            {categories && !categoriesLoading && (
                <div className="col d-flex flex-column flex-shrink-0 p-3" style={{
                  maxWidth: "300px",
                  marginRight: "1rem"
                }}>
                  <AddForm productId={product} edit={editMode} onCancel={handleCancel}/>
                </div>
            )}
            <div className="col d-flex flex-column">
              <input
                  className="form-control w-100 mb-3"
                  type="text"
                  name="searchQuery"
                  placeholder="Search..."
                  onChange={handleSearchQuery}
                  value={searchQuery}
              />
              {count > 0 && (
                  <table className="table">
                    <thead>
                    <tr>
                      {Object.keys(columns).map((column) => (
                          <th
                              key={column}
                              {...{ role: columns[column].path && "button" }}
                              scope="col"
                          >
                            {columns[column].name}{" "}
                          </th>
                      ))}
                    </tr>
                    </thead>
                    <tbody>
                    {usersCrop.map((item) => (
                        <tr key={item._id}>
                          {Object.keys(columns).map((column) => (
                              <td key={column}>{renderContent(item, column)}</td>
                          ))}
                        </tr>
                    ))}
                    </tbody>
                  </table>
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
      </ProductsLoader>
    </>
  );
};

export default AddProductTable;
