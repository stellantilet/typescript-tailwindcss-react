import axios from "axios";
import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../AppContext";
import Config from "../../config";
import { setLoading } from "../../stores/actions/AppAction";
import { Receipt, User } from "../../types";
import MainLayout from "../Layouts/Main";

const ReceiptItem = ({ receipt }: { receipt: Receipt }) => {
  return (
    <div className="border p-4 my-4 rounded shadow">
    </div>
  );
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const params = useParams();
  console.log(params);
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    await dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `${Config.API_URL}/users/${params.username}`
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
        </div>
      )}
    </MainLayout>
  );
};

export default Profile;
