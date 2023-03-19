export interface IModal {
  isOpen: boolean;
  text: string;
  onClickOk: () => void;
  onClickCancel?: () => void;
  okText?: string;
  cancelText?: string;
}
