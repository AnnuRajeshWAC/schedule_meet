import Offcanvas from "react-bootstrap/Offcanvas";
import ScheduleForm from "./ScheduleForm";

function OffCanvasRes({ show, handleClose, handleSubmit, slot,loading }) {
  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Schedule Meeting</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ScheduleForm handleSubmit={handleSubmit} slot={slot}  loading={loading}/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvasRes;
