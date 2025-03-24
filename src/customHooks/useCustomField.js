import { useField } from "informed";

export const useCustomfield = (props) => {
  const { fieldState, fieldApi, render, userProps, informed, ref } =
    useField(props);
  const { label } = props;
  const { error, showError } = fieldState;
  const { setValue } = fieldApi;
  const { onChange, onBlur, id, children, ...rest } = userProps;
  const baseStyle = {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    outline: "none",
    width: "100%",
    margin: "5px 5px 5px 5px",
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const errorStyle = {
    border: "1px solid red",
  };
  return {
    render,
    informed,
    fieldState,
    ref,
    error,
    showError,
    label,
    id,
    rest,
    baseStyle,
    errorStyle,
    children,
    handleChange,
  };
};
