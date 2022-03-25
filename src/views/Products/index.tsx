import axios from "axios";
import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../AppContext";
import Config from "../../config";
import { setLoading } from "../../stores/actions/AppAction";
import { Product, User } from "../../types";
import MainLayout from "../Layouts/Main";

const ProductItem = ({ product }: { product: Product }) => {
  const handleSubmit = (e: SyntheticEvent) => {
    console.log(e);
    e.preventDefault();
  };
  return (
    <tr className="p-4 my-4">
      <td className="border p-2 text-center">{product.name}</td>
      <td className="border p-2 text-right">{product.price}</td>
      <td className="border p-2 text-right">{product.quantity}</td>
      <td className="border p-2 text-center">
        <form onSubmit={handleSubmit}>
          <input
            required
            type="number"
            max={product.quantity}
            min={1}
            className="border rounded px-4 py-1"
          />
          <button className="border rounded px-4 py-1 bg-indigo-500 hover:bg-indigo-600 text-white">
            Buy
          </button>
        </form>
      </td>
    </tr>
  );
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const { dispatch } = useContext(AppContext);
  const params = useParams();

  const loadProducts = async () => {
    try {
      await dispatch(setLoading(true));
      const res1 = await axios.get(`${Config.API_URL}/products`);
      setProducts(res1.data);

      const res2 = await axios.get(
        `${Config.API_URL}/users/${params.username}`
      );
      setUser(res2.data);

      await dispatch(setLoading(false));
    } catch (e) {}
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto py-20 px-4">
        <div>
          <div>Name: {user?.name}</div>
          <div>Username: {user?.username}</div>
          <div>Email: {user?.email}</div>
          <div>Balance: {user?.balance}</div>
          <div>Products</div>
        </div>
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2 text-center">Name</th>
              <th className="border p-2 text-center">Price</th>
              <th className="border p-2 text-center">Qty in Stock</th>
              <th className="border p-2 text-center">Buy</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductItem product={product} key={product._id} />
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default Products;
