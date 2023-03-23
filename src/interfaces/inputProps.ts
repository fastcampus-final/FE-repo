export interface IInputProps {
  type: string;
  placeholder?: string;
  label?: string;
  id?: string;
  register?: { name: string };
  error?: string;
  email?: string;
  emailCheck?: boolean;
  setEmailCheck?: React.Dispatch<React.SetStateAction<boolean>>;
}
