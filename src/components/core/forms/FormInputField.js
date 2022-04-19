import { useFormContext } from "react-hook-form";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 8px;
  box-sizing: border-box;
  border-radius: 10px;
  border-color: #bfbfbf;
  border-style: solid;
  border-width: 0.5px;
`;

const StyledErrorMessage = styled.span`
  color: red;
  margin-bottom: 20px;
  min-height: 20px;
  margin-left: 8px;
`;

const FormInputField = ({ name, errors, validations = {}, ...rest }) => {
  // Get form context passed down from FormProvider
  const { register } = useFormContext();
  const displayError = errors && name in errors;
  return (
    <>
      <StyledInput {...register(name, validations)} {...rest} />
      <StyledErrorMessage>
        {displayError ? errors[name]?.message : ""}
      </StyledErrorMessage>
    </>
  );
};

export default FormInputField;
