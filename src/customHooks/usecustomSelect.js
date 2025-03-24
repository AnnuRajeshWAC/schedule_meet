import { useField } from "informed";

export const useCustomSelect = (props) => {
  const { render, ref, informed, fieldState, fieldApi, userProps } = useField({
    type: "select",
    ...props,
  });
  const { id, label, children, ...rest } = userProps;
  const { value, error, showError } = fieldState;

  const baseStyle = {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    outline: "none",
    width: "100%",
    height: "40px",
    backgroundColor: "#fff",
  };

  const errorStyle = {
    border: "1px solid red",
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "200px",
      padding: "5px",
      borderRadius: "50px",
      border: showError ? "1px solid red" : "1px solid #ccc",
    }),
  };
  const handleChange = (option) => {
    fieldApi.setValue(option ? option.value : null);
  };
  return {
    render,
    ref,
    informed,
    id,
    label,
    children,
    rest,
    error,
    showError,
    baseStyle,
    errorStyle,
    customStyles,
    handleChange,
    value,
  };
};
