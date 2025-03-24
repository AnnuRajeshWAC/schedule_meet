import moment from "moment";
import Modal from "react-bootstrap/Modal";
import { Form } from "informed";
import CustomInput from "./informed/CustomInput";
import TimeSlot from "./informed/TimeSlot";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ValidtionRules } from "./ValidationRules";
import { useEditData } from "../customHooks/useEditData";

function EventModal({ open, handleClose, isLoading, event, handleDelete }) {
  const { handleEdit, edit, user, ev, date, editload, handleCancel } =
    useEditData(event, handleClose);

  return (
    <>
      <Modal show={open} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!edit ? (
            <div className="bg-white  rounded-2xl p-6 text-center max-w-md mx-auto">
              <h3 className="text-3xl font-semibold text-blue-600">
                {event?.title}
              </h3>

              <p className="text-gray-700 mt-2">
                <span className=" text-gray-900">Meeting by:</span>{" "}
                {event?.lead}
              </p>

              <p className="text-gray-700 mt-2">
                <span className=" text-gray-900">Number of Members:</span>{" "}
                {event?.members}
              </p>

              <p className="text-gray-700 mt-2">
                <span className=" text-gray-900">Conference Room:</span>{" "}
                {event?.room}
              </p>

              <span className="text-lg font-medium text-gray-800 bg-gray-200 px-3 py-1 rounded-lg mt-4 inline-block">
                {moment(event?.start).format("hh:mm A")} -{" "}
                {moment(event?.end).format("hh:mm A")}
              </span>
            </div>
          ) : (
            <Form initialValues={ev} onSubmit={handleEdit}>
              <Row className="g-3">
                <Col md={6}>
                  <CustomInput
                    type="text"
                    name="title"
                    label="Title"
                    required
                  />
                </Col>
                <Col md={6}>
                  <CustomInput
                    type="text"
                    name="members"
                    label="Number of Members"
                    validate={ValidtionRules.members}
                    required
                  />
                </Col>
                <TimeSlot slot={date} event={event} />
              </Row>

              <div className="mt-4 text-end">
                <button type="submit" className="bg-black text-white px-3 py-1" disabled={editload}>
                  {editload ? "Editing..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
          {user.email === event?.email && !edit && (
            <div className="flex gap-3 justify-center items-center">
              <p className=" font-bold text-lg">Do you want to delete? </p>
              <button
                onClick={handleDelete}
                 className="w-56 bg-gray-700 text-white py-1 font-bold"
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Yes"}
              </button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button  onClick={handleCancel} className="bg-zinc-500 text-white px-3 py-1">Cancel</button>
          {user.email === event?.email && !edit && (
            <button onClick={handleEdit} className="bg-black text-white px-3 py-1" >{"edit"}</button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EventModal;
