import Col from "react-bootstrap/Col";
import CustomTime from "./customTime";
import InformedSelect from "./Informedselect";
import { Option } from "informed";
import { conference } from "../data/conferenceroom";
import { useTimeslot } from "../../customHooks/useTimeSlot";
const TimeSlot = ({ slot, event }) => {
  const { start, cabin, validation, cabinValidation } = useTimeslot(
    slot,
    event
  );

  return (
    <>
      <Col xs={12}>
        <InformedSelect
          name="room"
          label="Conference Room"
          className="w-full"
          validateOn="change"
          validate={cabinValidation}
          showErrorIfDirty
          required
        >
          <Option value="" disabled>
            -- Choose an Option --
          </Option>
          {conference.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.conf}
            </Option>
          ))}
        </InformedSelect>
        {cabin && (
          <>
            <Col xs={12} md={6}>
              <CustomTime
                label="From:"
                name="start"
                required
                validate={validation}
                validateOn="change"
                showErrorIfDirty
              />
            </Col>
            <Col xs={12} md={6}>
              <CustomTime
                label="To:"
                name="end"
                min={start}
                required
                validate={validation}
                validateOn="change"
                showErrorIfDirty
              />
            </Col>
          </>
        )}
      </Col>
    </>
  );
};

export default TimeSlot;
