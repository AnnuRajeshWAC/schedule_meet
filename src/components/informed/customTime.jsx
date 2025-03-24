import { useField } from "informed";
import React from "react";

const CustomTime = (props) => {
  const { fieldState, fieldApi, render, informed, userProps,ref } = useField(props);
  const { value="",error,showError } = fieldState;
  const { setValue,setError } = fieldApi;
  const { label, ...rest } = userProps;
const handleChange=(e)=>{
    const input=e.target
    if(!input.validity.valid){
      
setError('enter valid time')        
    }
    else{
        setValue(e.target.value)
    }
}
  return render(
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <input
      ref={ref}
        {...informed}
        {...rest}
        value={value}
        type="time"
        onChange={handleChange}
        className={`form-control ${error ? "is-invalid" : "is-valid"}`}
      />
      {showError && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default CustomTime;
