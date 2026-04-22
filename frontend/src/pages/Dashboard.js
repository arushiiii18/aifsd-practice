import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [course, setCourse] = useState("");
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Fetch user data
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get("https://aifsd-practice.onrender.com/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
        setCourse(res.data.course);
      } catch (err) {
        alert("Unauthorized");
        navigate("/");
      }
    };

    fetchData();
  }, []);

  // Update course
  const updateCourse = async () => {
    try {
      await axios.put(
        "https://aifsd-practice.onrender.com/api/update-course",
        { course },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Course updated");
    } catch {
      alert("Error updating course");
    }
  };

  // Update password
  const updatePassword = async () => {
    try {
      await axios.put(
        "https://aifsd-practice.onrender.com/api/update-password",
        passwords,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Password updated");
    } catch {
      alert("Error updating password");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="container">
      <div className="card" style={{ width: "400px" }}>
        <h2>Dashboard</h2>

        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>

        <hr />

        <h3>Update Course</h3>
        <input
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <button onClick={updateCourse}>Update Course</button>

        <hr />

        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="Old Password"
          onChange={(e) =>
            setPasswords({ ...passwords, oldPassword: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) =>
            setPasswords({ ...passwords, newPassword: e.target.value })
          }
        />
        <button onClick={updatePassword}>Update Password</button>

        <hr />

        <button
          onClick={logout}
          style={{ background: "#ef4444", marginTop: "10px" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;