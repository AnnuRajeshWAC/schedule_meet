import React from "react";
import { useCustomfield } from "../../customHooks/useCustomField";
const CustomInput = (props) => {
  const {
    render,
    informed,
    ref,
    error,
    showError,
    label,
    rest,
    baseStyle,
    errorStyle,
    handleChange,
  } = useCustomfield(props);

  return render(
    <div className="d-flex flex-column ">
      {label ? <label>{label}</label> : null}
      <input
        {...rest}
        {...informed}
        value={informed?.value ?? ""}
        ref={ref}
        style={showError ? { ...baseStyle, ...errorStyle } : { ...baseStyle }}
        onChange={handleChange}
      />
      {showError && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
    </div>
  );
};

export default CustomInput;
