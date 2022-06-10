import { useFormContext } from "react-hook-form";
import { Input, ErrorMessage } from "./FormInputField.style";

const FormInputField = ({ name, errors, validations = {}, ...rest }) => {
  // Get form context passed down from FormProvider
  const { register } = useFormContext();
  const displayError = errors && name in errors;
  return (
    <>
      <Input {...register(name, validations)} {...rest} />
      <ErrorMessage>{displayError ? errors[name]?.message : ""}</ErrorMessage>
    </>
  );
};

export default FormInputField;
