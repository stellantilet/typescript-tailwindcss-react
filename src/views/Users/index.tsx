import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import Config from "../../config";
import { setLoading } from "../../stores/actions/AppAction";
import { User } from "../../types";

const UserItem = ({ user }: { user: User }) => {
  return (
    <div className="border p-4 my-4 rounded shadow">
      <div className="mb-2">
        {user.name}({user.username})
      </div>
      <div className="mb-2">{user.email}</div>
      <Link
        to={`/${user.username}/products`}
        className="border rounded px-4 py-1 bg-indigo-500 hover:bg-indigo-600 text-white"
      >
        Enter
      </Link>
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      await dispatch(setLoading(true));
      const response = await axios.get(`${Config.API_URL}/users`);
      await dispatch(setLoading(false));
      setUsers(response.data);
    } catch (e) {}
  };

  return (
    <div className="max-w-xl mx-auto py-20 px-4">
      {users.map((user) => (
        <UserItem user={user} key={user._id} />
      ))}
    </div>
  );
};

export default Users;
