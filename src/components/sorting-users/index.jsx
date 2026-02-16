import { useEffect, useMemo, useState } from "react";
import "./style.css";

function SortUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(() => {
    return localStorage.getItem("sortOrder") || "";
  });

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  // ✅ Correct useMemo usage (top level only)
  const sortedUsers = useMemo(() => {
    if (!sortOrder) return users;

    const copiedUsers = [...users];

    return copiedUsers.sort((a, b) =>
      sortOrder === "ascending"
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName),
    );
  }, [users, sortOrder]);

  useEffect(() => {
    localStorage.setItem("sortOrder", sortOrder);
  }, [sortOrder]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="sort-container">
      <h2>Sort Users</h2>

      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="">Please Select Option</option>
        <option value="ascending">Sort A - Z</option>
        <option value="descending">Sort Z - A</option>
      </select>

      <ul>
        {sortedUsers.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SortUsers;
