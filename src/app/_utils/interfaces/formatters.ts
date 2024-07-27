interface OnChangeTargetProps {
  name: String;
  value: string;
}

interface OnChangeEventProps {
  target: OnChangeTargetProps;
}

export interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
