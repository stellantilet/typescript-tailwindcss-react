/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AppContext from "../../AppContext";
import Config from "../../config";
import { setLoading } from "../../stores/actions/AppAction";
import { Product, User } from "../../types";
import MainLayout from "../Layouts/Main";

const ProductItem = ({
  product,
  onSubmit = async () => {},
}: {
  product: Product;
  onSubmit?: (product: Product, quantity: number) => Promise<void>;
}) => {
  const [quantity, setQuantity] = useState<string>("");
  const handleQuantityChange = (e: SyntheticEvent) => {
    const el = e.target as HTMLInputElement;
    setQuantity(el.value);
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await onSubmit(product, parseInt(quantity, 10) + 0);
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
            // max={product.quantity}
            min={1}
            value={quantity}
            onChange={handleQuantityChange}
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
    await dispatch(setLoading(true));
    try {
      const res1 = await axios.get(`${Config.API_URL}/products`);
      setProducts(res1.data);

      const res2 = await axios.get(
        `${Config.API_URL}/users/${params.username}`
      );
      setUser(res2.data);
    } catch (e) {}
    await dispatch(setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleBuyProduct = async (product: Product, quantity: number) => {
    await dispatch(setLoading(true));
    try {
      await axios.post(
        `${Config.API_URL}/purchase/${params.username}/${product._id}`,
        {
          quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await loadProducts();
      toast.success("Order has been placed successfully.");
    } catch (e: any) {
      const { data, status } = e.response;
      switch (status) {
        case 400:
          toast.error(data.error);
          break;
        default:
          toast.error(e.message);
          break;
      }
    }
    await dispatch(setLoading(false));
  };

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
              <th className="border p-2 text-center">Product</th>
              <th className="border p-2 text-center">Price</th>
              <th className="border p-2 text-center">Qty in Stock</th>
              <th className="border p-2 text-center">Buy</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductItem
                product={product}
                key={product._id}
                onSubmit={handleBuyProduct}
              />
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default Products;
