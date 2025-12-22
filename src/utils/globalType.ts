export type Item = {
  key: string;
  label: string;
  height: number;
  width: number;
  backgroundColor: string;
  description: string;
};

export type DraggableItemProps = {
  item: Item;
  drag: () => void;
  isActive: boolean;
  deleted: boolean;
  onDelete: () => void;
  onArchive: () => void;
  handleDone: () => void;
  isEdited: boolean;
};

export type HabitItem = {
  id: number;
  name: string;
};

export interface MyFormValues {
  current_password: string;
  password: string;
  password_confirmation: string;
}
