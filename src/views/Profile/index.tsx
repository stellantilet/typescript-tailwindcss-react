/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../AppContext";
import Config from "../../config";
import { setLoading } from "../../stores/actions/AppAction";
import { Receipt, User } from "../../types";
import MainLayout from "../Layouts/Main";
import moment from "moment";

const ReceiptItem = ({ receipt }: { receipt: Receipt }) => {
  return (
    <tr>
      <td className="border p-2 text-center">{receipt.product?.name}</td>
      <td className="border p-2 text-center">{receipt.price}</td>
      <td className="border p-2 text-center">{receipt.quantity}</td>
      <td className="border p-2 text-center">{receipt.amount}</td>
      <td className="border p-2 text-center">
        {moment(receipt.updatedAt).format("MMMM Do YYYY, h:mm:ss A")}
      </td>
    </tr>
  );
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const params = useParams();
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    await dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `${Config.API_URL}/users/${params.username}/details`
      );
      setUser(response.data);
    } catch (e) {}
    await dispatch(setLoading(false));
  };

  return (
    <MainLayout>
      {user && (
        <div className="max-w-5xl mx-auto py-20 px-4">
          <div>Name: {user.name}</div>
          <div>Username: {user.username}</div>
          <div>Email: {user.email}</div>
          <div>Balance: {user.balance}</div>
          <div>Receipts</div>
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-2 text-center">Product</th>
                <th className="border p-2 text-center">Price</th>
                <th className="border p-2 text-center">Qty</th>
                <th className="border p-2 text-center">Amount</th>
                <th className="border p-2 text-center">Date</th>
              </tr>
            </thead>
            <tbody>
              {user.receipts && user.receipts.length > 0 ? (
                user.receipts?.map((receipt) => (
                  <ReceiptItem receipt={receipt} key={receipt._id} />
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-2 text-center">
                    No receipts
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </MainLayout>
  );
};

export default Profile;
