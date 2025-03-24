import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "informed";
import CustomInput from "./informed/CustomInput";
import TimeSlot from "./informed/TimeSlot";
import { ValidtionRules } from "./ValidationRules";

const ScheduleForm = ({ handleSubmit, slot, loading }) => {
  return (
    <Form onSubmit={handleSubmit} className="p-3">
      <Row className="g-3">
        <Col md={6}>
          <CustomInput
            type="text"
            name="title"
            label="Title"
            required
            validateOn="change"
            showErrorIfDirty
          />
        </Col>
        <Col md={6}>
          <CustomInput
            type="text"
            name="members"
            label="Number of Members"
            validate={ValidtionRules.members}
            validateOn="change"
            showErrorIfDirty
            required
          />
        </Col>

        <TimeSlot slot={slot} />
      </Row>

      <div className="mt-4 text-end">
        <button
          type="submit"
          className="text-white bg-black px-4 py-1 font-bold"
          disabled={loading}
        >
          {loading ? "submitting" : "Submit"}
        </button>
      </div>
    </Form>
  );
};

export default ScheduleForm;
