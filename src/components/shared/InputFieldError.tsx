import { getInputFieldError, IInputErrorState } from "@/utils/getInputFieldError";


interface InputFieldErrorProps {
  field: string;
  state: IInputErrorState | null | undefined;
}

const InputFieldError = ({ field, state }: InputFieldErrorProps) => {
  if (!state) return null;

  const errorMessage = getInputFieldError(field, state);

  if (errorMessage) {
    return (
      <div className="invalid-feedback d-block" style={{ fontSize: "13px", marginTop: "5px", color: "#dc3545" }}>
        {errorMessage}
      </div>
    );
  }

  return null;
};

export default InputFieldError;