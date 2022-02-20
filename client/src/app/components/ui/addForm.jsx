import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/categories";
import { nanoid } from "nanoid";
import { createProduct, getProducts, updateProduct } from "../../store/products";
import PropTypes from "prop-types";

const AddForm = ({ productId, edit, onCancel }) => {
  const dispatch = useDispatch();
  const products = useSelector(getProducts());
  const initialState = {
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    photo: ""
  };
  const [data, setData] = useState(initialState);
  useEffect(() => {
    const product = products.find(p => p._id === productId);
    if (product) {
      setData({
        ...product
      });
    }
  }, [productId]);

  const categories = useSelector(getCategories());
  const categoriesList = categories.map((p) => ({
    label: p.name,
    value: p._id
  }));
  const [errors, setErrors] = useState({});

  const handleCancel = () => {
    onCancel();
    setData(initialState);
  };

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const validatorConfig = {
    name: {
      isRequired: {
        message: "Название обязательно для заполнения"
      },
      min: {
        message: "Название должено состаять миниму из 3 символов",
        value: 3
      }
    },
    description: {
      isRequired: {
        message: "Описание обязательно для заполнения"
      },
      min: {
        message: "Описание должено состаять миниму из 3 символов",
        value: 3
      }
    },
    price: {
      isRequired: {
        message: "Стоимость обязательна для заполнения"
      }
    },
    quantity: {
      isRequired: {
        message: "Количество обязательн для заполнения"
      }
    },
    category: {
      isRequired: {
        message: "Обязательно выберите категорию"
      }
    },
    photo: {
      isRequired: {
        message:
            "Ссылка на фото обязательна"
      },
      isUrl: {
        message: "Данная ссылка содержит ошибку"
      }
    }
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    if (edit) {
      dispatch(updateProduct(data));
      onCancel();
    } else {
      const newData = {
        ...data,
        _id: nanoid()
      };
      dispatch(createProduct(newData));
     }
    setData(initialState);
  };

  return (
      <form onSubmit={handleSubmit}>
        <TextField
            label="Наименование"
            name="name"
            value={data.name}
            onChange={handleChange}
            error={errors.name}
        />
        <TextField
            label="Описание"
            name="description"
            value={data.description}
            onChange={handleChange}
            error={errors.description}
        />
        <TextField
            label="Стоимость"
            type="number"
            name="price"
            value={data.price}
            onChange={handleChange}
            error={errors.price}
        />
        <SelectField
            label="Категория"
            defaultOption="Choose..."
            name="category"
            options={categoriesList}
            onChange={handleChange}
            value={data.category}
            error={errors.category}
        />
        <TextField
            label="Количество"
            type="number"
            name="quantity"
            value={data.quantity}
            onChange={handleChange}
            error={errors.quantity}
        />
        <TextField
            label="Фото"
            type="text"
            name="photo"
            value={data.photo}
            onChange={handleChange}
            error={errors.photo}
        />
        <button
            type="submit"
            disabled={!isValid}
            className="btn btn-primary w-100 mx-auto"
        >
          {edit ? "Сохранить" : "Добавить"}
        </button>
        {edit && <button className="btn btn-danger w-100 mx-auto my-2" type="button" onClick={handleCancel}>Отмена</button>}
      </form>
  );
};

AddForm.propTypes = {
  productId: PropTypes.string,
  edit: PropTypes.bool,
  onCancel: PropTypes.func
};

export default AddForm;
