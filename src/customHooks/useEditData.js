import { useAtom } from "jotai";
import { useState } from "react";
import { userAtom } from "../jotai/googleUser";
import axios from "axios";
import { toast } from "react-toastify";
import { useCalendarData } from "./useCalendarData";

export const useEditData = (event, handleClose) => {
  const { convertToDate, mutate } = useCalendarData();
  const [user] = useAtom(userAtom);
  const [edit, setEdit] = useState(false);
  const [editload, setEditLoad] = useState(false);
  const date = event?.date ? new Date(event.date) : null;
  const formatTime = (date) => {
    const slotDate = new Date(date);

    if (isNaN(slotDate?.getTime())) {
      return "Invalid Time";
    }

    const hours = slotDate.getHours().toString().padStart(2, "0");
    const minutes = slotDate.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };
  const start = formatTime(event?.start);
  const end = formatTime(event?.end);
  const ev = { ...event, start: start, end: end };

  //edit meeting
  const handleEdit = async ({ values }) => {
    if (!event.date) return null;
    if (edit) {
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
      const newvalues = {
        ...values,
        email: user.email,
        members: Number(values.members),
        room: Number(values.room),
        start: convertToDate(`${formattedDate},${values.start}`),
        end: convertToDate(`${formattedDate},${values.end}`),
        date: convertToDate(`${formattedDate}`),
      };
     
      setEditLoad(true);
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BASE_URL}/meetings/${event._id}`,
          newvalues
        );

        if (response.data.success) {
          setEditLoad(false);
          mutate();
          toast.success("meeting updated to calender successfully");
          handleClose();
        } else {
          setEditLoad(false);
          toast.error("error in updating meeting to the calendar");
        }
      } catch (error) {
        setEditLoad(false);

        console.log(error);
      }
      setEdit(false);
    } else {
      setEdit(true);
      return null;
    }
  };
  const handleCancel = () => {
    handleClose();
    if (edit) {
      setEdit((prev) => !prev);
    }
  };
  return { handleEdit, edit, setEdit, user, ev, date, editload, handleCancel };
};
