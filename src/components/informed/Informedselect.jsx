import React from "react";
import { useCustomSelect } from "../../customHooks/usecustomSelect";

const InformedSelect = (props) => {
  const {
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
  } = useCustomSelect(props);

  return render(
    <div className="w-full">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        {...informed}
        {...rest}
        ref={ref}
        id={id}
        style={showError ? { ...baseStyle, ...errorStyle } : baseStyle}
      >
        {children}
      </select>
      {showError && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
    </div>
  );
};

export default InformedSelect;
