import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavData } from "../../customHooks/useNavData";
import { conference } from "../data/conferenceroom";

const Navbar = () => {
  const { user, isOpen, setOpen, handleLogout } = useNavData();
  if (user?.isLogin) {
    return (
      <div className="fixed top-0 bg-white right-0 w-full mb-12 px-2  flex flex-row justify-between">
        <h2>Meet Space</h2>
        <div className="flex gap-5 justify-center items-center ">
          {conference.map((item) => (
            <div
              key={item.value}
              className="flex justify-center items-center gap-3 "
            >
              <div
                className={`w-5 h-5 rounded-full m-1`}
                style={{ backgroundColor: item.color }}
              ></div>{" "}
              <p className="text-center  mt-3">{item.conf}</p>
            </div>
          ))}
        </div>
        <div className="flex m-1 justify-center items-center gap-2">
          <div className="relative p-1 group">
            <div className="flex gap-4 justify-center items-center">
              <img
                src={user?.imgUrl}
                alt="profile"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full cursor-pointer"
              />
            </div>

            <div className="absolute hidden group-hover:block top-12  transform h-fit -left-40 bg-black text-white text-center  rounded-lg shadow-lg z-50">
              <p className="font-bold">{user.name}</p>
              <p className="font-light">{user.email}</p>
            </div>
          </div>
          <button
            className="text-xs h-fit bg-black text-white px-5 py-1 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Log Out
          </button>
        </div>
        <Modal show={isOpen} onHide={() => setOpen(false)} centered>
          <Modal.Body className="text-center">
            <h4 className="fs-5">{user.name}, do you want to logout?</h4>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button variant="dark" onClick={handleLogout}>
                Yes
              </Button>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                No
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  } else {
    return (
      <div className="fixed top-0 right-0 w-100 px-2 py-4 shadow-lg d-flex flex-column align-items-center bg-dark text-white">
        <h1 className="fw-bold text-warning">📅 Calendar</h1>
        <h4 className="fs-4 mt-2">⚠️ Please Login First</h4>
      </div>
    );
  }
};

export default Navbar;
