import axios from "axios";
import React from "react";
import { Form, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { exit, signIn } from "../slices/signInSlice";
import Modal from "../components/Modal";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.signIn.email);

  const [list, setList] = React.useState([]);
  const [modalEdit, setModalEdit] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);

  const [id, setId] = React.useState(0);
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [thname, setThname] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone_number, setPhone_number] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    if (!location.state) {
      navigate("/login", { state: "неверный логин или пароль" });
    } else if (data === null) {
      navigate("/login");
    }
    dispatch(signIn(location.state));
    console.log(location.state);
    axios
      .get(`http://localhost:8080/api/user/${location.state.position}`)
      .then((response) => setList(response.data));
    console.log(list);
  }, []);

  const signOut = () => {
    dispatch(exit);
    navigate("/login");
  };

  const handleSubmit = (event) => {
    const user = {
      id: id,
      name: name,
      surname: surname,
      thname: thname,
      position: position,
      address: address,
      phone_number: phone_number,
      email: email,
      password: password,
    };

    axios
      .put("http://localhost:8080/api/user/director", user)
      .then((response) => localStorage.setItem("login", response.data));
    setModalEdit(false);
    navigate(0);
    event.preventDefault();
  };

  const handleSubmitDelete = (event) => {
    const user = {
      id: id,
    };

    axios
      .delete(`http://localhost:8080/api/user/${id}`, { params: user })
      .then((response) => console.log(response.data));
    setModalDelete((prev) => !prev);
    navigate(0);
    event.preventDefault();
  };

  return (
    <div className="flex bg-slate-800 h-screen justify-center items-start gap-5">
      <table className="bg-white flex-col w-[90%] mt-5 rounded table-auto border-separate">
        <tr className="">
          <th className="border rounded">id</th>
          <th className="border rounded">name</th>
          <th className="border rounded">surname</th>
          <th className="border rounded">thname</th>
          <th className="border rounded">position</th>
          {(location.state.position === "Director" ||
            location.state.position == "DeputyDirector") && (
            <>
              <th className="border rounded">address</th>
              <th className="border rounded">phone number</th>
            </>
          )}
          {(location.state.position === "Director" ||
            location.state.position === "DeputyDirector" ||
            location.state.position === "Secretary") && (
            <>
              <th className="border rounded">email</th>
            </>
          )}

          {location.state.position === "Director" && (
            <>
              <th className="border rounded">password</th>
              <th className="border rounded">~</th>
            </>
          )}
        </tr>
        {list.map((user) => {
          return (
            <tr key={user.id} className="">
              <td className="border rounded">{user.id}</td>
              <td className="border rounded">{user.name}</td>
              <td className="border rounded">{user.surname}</td>
              <td className="border rounded">{user.thname}</td>
              <td className="border rounded">{user.position}</td>
              {(location.state.position === "Director" ||
                location.state.position == "DeputyDirector") && (
                <>
                  <td className="border rounded">{user.address}</td>
                  <td className="border rounded">{user.phone_number}</td>
                </>
              )}
              {(location.state.position === "Director" ||
                location.state.position == "DeputyDirector" ||
                location.state.position == "Secretary") && (
                <>
                  <td className="border rounded">{user.email}</td>
                </>
              )}

              {location.state.position == "Director" && (
                <>
                  <td className="border rounded">{user.password}</td>
                  <td className="border rounded">
                    <button
                      className="w-1/2 h-auto"
                      onClick={() => {
                        setId(user.id);
                        setName(user.name);
                        setSurname(user.surname);
                        setThname(user.thname);
                        setPosition(user.position);
                        setAddress(user.address);
                        setPhone_number(user.phone_number);
                        setEmail(user.email);
                        setPassword(user.password);

                        setModalEdit((prev) => !prev);
                      }}
                    >
                      &#9998;
                    </button>
                    <button
                      className="w-1/2 h-auto"
                      onClick={() => {
                        setId(user.id);
                        setName(user.name);
                        setSurname(user.surname);
                        setThname(user.thname);
                        setPosition(user.position);
                        setAddress(user.address);
                        setPhone_number(user.phone_number);
                        setEmail(user.email);
                        setPassword(user.password);

                        setModalDelete((prev) => !prev);
                      }}
                    >
                      &#10005;
                    </button>
                  </td>
                </>
              )}
            </tr>
          );
        })}
      </table>
      {modalEdit ? (
        <Modal>
          <span
            className="absolute top-3 right-3 cursor-pointer"
            onClick={() => setModalEdit((prev) => !prev)}
          >
            &#10005;
          </span>
          <Form action={`/user/director`} method="put" onSubmit={handleSubmit}>
            <span className="flex h-1/4 w-full justify-center items-center">
              <p className="text-3xl text-center">Put</p>
            </span>
            <div className="h-1/3 flex-col justify-center items-center pt-10">
              <span className="relative flex items-center justify-center mb-4">
                <label className="absolute text-[10px] bottom-6">Name</label>
                <input
                  value={name}
                  className="border rounded"
                  onChange={(e) => setName(e.target.value)}
                />
              </span>
              <span className="relative flex items-center justify-center mb-4">
                <label className="absolute text-[10px] bottom-6">Surname</label>
                <input
                  value={surname}
                  className="border rounded"
                  onChange={(e) => setSurname(e.target.value)}
                />
              </span>
              <span className="relative flex items-center justify-center mb-4">
                <label className="absolute text-[10px] bottom-6">Thname</label>
                <input
                  value={thname}
                  className="border rounded"
                  onChange={(e) => setThname(e.target.value)}
                />
              </span>
              <span className="relative flex items-center justify-center mb-4">
                <label className="absolute text-[10px] bottom-6">
                  Position
                </label>
                {/* <input
                  value={position}
                  className="border rounded"
                  onChange={(e) => setPosition(e.target.value)}
                /> */}
                <select
                  className="border rounded"
                  name="position"
                  onChange={(e) => setPosition(e.target.value)}
                >
                  <option value="Guest">Guest</option>
                  <option value="Secretary">Secretary</option>
                  <option value="DeputyDirector">DeputyDirector</option>
                </select>
              </span>
              <span className="relative flex items-center justify-center mb-4">
                <label className="absolute text-[10px] bottom-6">Address</label>
                <input
                  value={address}
                  className="border rounded"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </span>
              <span className="relative flex items-center justify-center mb-4">
                <label className="absolute text-[10px] bottom-6">
                  Phone number
                </label>
                <input
                  value={phone_number}
                  className="border rounded"
                  onChange={(e) => setPhone_number(e.target.value)}
                />
              </span>
              <span className="relative flex items-center justify-center mb-4">
                <label className="absolute text-[10px] bottom-6">Email</label>
                <input
                  value={email}
                  className="border rounded"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
              <span className="relative flex items-center justify-center mb-4">
                <label className="absolute text-[10px] bottom-6">
                  Password
                </label>
                <input
                  value={password}
                  className="border rounded"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </span>
            </div>
            <span className="flex h-1/4 justify-center gap-8 my-8">
              <button type="submit" className="w-1/4 h-1/3 border rounded">
                change
              </button>
            </span>
          </Form>
        </Modal>
      ) : (
        <></>
      )}

      {modalDelete ? (
        <Modal>
          <span
            className="absolute top-3 right-3 cursor-pointer"
            onClick={() => setModalDelete((prev) => !prev)}
          >
            &#10005;
          </span>
          <Form
            action={`/user/${id}`}
            method="delete"
            onSubmit={handleSubmitDelete}
          >
            <span className="flex h-1/4 w-full justify-center items-center">
              <p className="text-3xl text-center">Are you sure?</p>
            </span>
            <span className="flex justify-center items-center gap-4 py-5">
              <button type="submit" className="w-1/4 h-1/3 border rounded">
                Yes
              </button>
              <button
                onClick={() => {
                  setModalDelete((prev) => !prev);
                }}
                className="w-1/4 h-1/3 border rounded"
              >
                No
              </button>
            </span>
          </Form>
        </Modal>
      ) : (
        <></>
      )}
      <button
        onClick={signOut}
        className="w-[6%] h-10%] border rounded mt-5 bg-white"
      >
        Sign Out
      </button>
    </div>
  );
};

export default HomePage;
