import { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../jotai/googleUser";
import { useLoginData } from "../customHooks/useLoginData";
import axios from "axios";
import useSWR from "swr";
import { toast } from "react-toastify";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";

export const useCalendarData = () => {
  const [user] = useAtom(userAtom);
  const localizer = momentLocalizer(moment);
  const [slot, setslot] = useState(null);

  const {
    data: meetings,
    mutate,
    isLoading,
  } = useSWR(`${import.meta.env.VITE_BASE_URL}/meetings`, {
    revalidateOnFocus: false,
  
  });
  const {
    data: holidays,
  } = useSWR(`${import.meta.env.VITE_BASE_URL}/holidays`, {
    revalidateOnFocus: false,
  
  });
  // const events = meetings?.data.filter(
  //   (item) => new Date(item.end) >= new Date(Date.now)
  // );
  const now = Date.now();  
  const events = meetings?.data.filter(
      (item) => new Date(item.end).getTime() >= now
  ).concat(holidays.data)
  console.log(events);
  
  const [show, setShow] = useState(false);
  const [currentView, setCurrentView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const { admins } = useLoginData();
  const [deleteload, setDelete] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (slot) => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const formattedDate = slot.slots[0].toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
    const selectedDate = new Date(formattedDate);
    if (admins.data.some((item) => item.designation === user.designation)) {

    if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
      toast.error("cannot select weekend to schedule meeting");
      return null;
    }
    if (selectedDate < date - 1) {
      toast.error("cannot select past dates to schedule meeting");
      return null;
    }
    setslot(slot.slots[0]);

      setShow(true);
    } else {
      return null;
    }
  };
  const [open, setOpen] = useState(false);

  const handleEventClose = () => setOpen(false);
  const handleEventShow = (e) => {
    setOpen(true);
    setSelectedEvent(e);
  };
  const convertToDate = (dateTimeStr) => {
    return new Date(dateTimeStr);
  };
  //add meeting
  const handleSubmit = async ({ values }) => {
    if (!slot) return null;
    const formattedDate = slot.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
    const newvalues = {
      ...values,
      email: user.email,
      lead: user.name,
      members: Number(values.members),
      room: Number(values.room),
      start: convertToDate(`${formattedDate},${values.start}`),
      end: convertToDate(`${formattedDate},${values.end}`),
      date: convertToDate(`${formattedDate}`),
    };
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/meeting`,
        newvalues
      );
      if (response.data.success) {
        setLoading(false);
        mutate();
        toast.success("meeting added to calender successfully");
        setShow(false);
      } else {
        setLoading(false);
        toast.error("error in adding meeting to the calendar");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  //delete event
  const deleteEvent = async (e) => {
    setDelete(true);
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/delete/${e._id}`
    );

    if (response.data.success) {
      setDelete(false);
      toast.warn("meeting deleted successfully");
      mutate();

      handleEventClose();
    } else {
      toast.error("error in deleting ");
      setDelete(false);
    }
  };
  const views = ["month", "day", "agenda"];
  return {
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
    convertToDate,
    mutate,
  };
};
