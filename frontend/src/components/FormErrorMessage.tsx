import { FieldError } from "react-hook-form";

interface Props {
  message: FieldError | undefined;
}

const FormErrorMessage = ({ message }: Props) => {
  return message ? <span className="w-full text-red-500">{message.message}</span> : null;
};

export default FormErrorMessage;
