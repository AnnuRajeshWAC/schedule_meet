import React from "react";
import { Calendar } from "react-big-calendar";
import moment from "moment";
import OffCanvasRes from "./OffCanvasRes";
import { colors } from "./data/conferenceroom";
import EventModal from "./EventModal";
import { ToastContainer } from "react-toastify";
import { useCalendarData } from "../customHooks/useCalendarData";
import Spinner from "react-bootstrap/esm/Spinner";
import "react-big-calendar/lib/css/react-big-calendar.css";

const MyCalender = () => {
  const {
    localizer,
    views,
    slot,
    selectedEvent,
    deleteEvent,
    handleSubmit,
    show,
    open,
    handleClose,
    handleEventClose,
    handleShow,
    handleEventShow,
    currentDate,
    setCurrentDate,
    currentView,
    setCurrentView,
    events,
    isLoading,
    loading,
    deleteload,
  } = useCalendarData();
  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  return (
    <div
      style={{ height: "800px",pointerEvents:"auto" }}
      className="  px-3 mt-20 mx-10 -bg-conic -z-10 "
      
    >
      <Calendar
        className="-z-10"
        localizer={localizer}
        events={events?.length > 0 ? events : []}
        startAccessor={(event) => new Date(event.start)}
        endAccessor={(event) => new Date(event.end)}
        view={currentView}
        views={views}
        date={currentDate}
        selectable={true}
        onSelectSlot={handleShow}
        onSelectEvent={handleEventShow}
        components={{
          event: CustomEvent,
          eventWrapper: CustomEventWrapper,
          eventContainerWrapper: CustomEventContainerWrapper,
        }}
        eventPropGetter={eventPropGetter}
        onView={(view) => {
          setCurrentView(view);
        }}
        defaultDate={new Date()}
        onNavigate={(date, view) => {
          setCurrentDate(date);
        }}
        popup={true}
      />
      <OffCanvasRes
        show={show}
        slot={slot}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        events={events}
        loading={loading}
      />
      <EventModal
        open={open}
        handleClose={handleEventClose}
        event={selectedEvent}
        handleDelete={() => deleteEvent(selectedEvent)}
        isLoading={deleteload}
      />
      <ToastContainer />
    </div>
  );
};

export default MyCalender;
export const CustomEvent = ({ event }) => {
  return (
    <div className="flex gap-2 px-1  justify-between items-center text-white bg-black">
      <strong>{event.title}</strong>

      <span>{moment(event.start).format("hh:mm A")}</span>
      <div
        className={`w-3 h-3 rounded-full `}
        style={{ backgroundColor: colors[String(event.room)] }}
      ></div>
    </div>
  );
};
const CustomEventWrapper = ({ children }) => {
  return <div className="p-0">{children}</div>;
};

const CustomEventContainerWrapper = ({ children }) => {
  return <div className="p-0 ">{children}</div>;
};
const eventPropGetter = (event) => {
  return {style:{
    backgroundColor:'black',
    color:'white'
  }}
};
