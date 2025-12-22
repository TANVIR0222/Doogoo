export type Tab = {
  key: string;
  label: string;
};

export type AddGroupProps = {
  title?: string;
  addHeading?: string;
  setSearch?: (search: string) => void;
  search?: string;
  setNewPost: (newPost: boolean) => void; // required
};
export type JoinChallengeModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

export type Habit = {
  habitName: string;
  description: string;
  goal: string;
  duration: string;
  participants: string;
};

export type HabitProps = {
  id: number;
  name: string;
  count: string;
};

export type AddHabitModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (habit: Habit) => void;
  addHeading?: string;
  setNewPost: (newPost: boolean) => void; // required
};
export type AddSayHabitModalProps = {
  visible: boolean;
  onClose: () => void;
  // onSave: (habit: Habit) => void;
  // addHeading?: string;
};
export type RedeemModalProps = {
  viewModal: boolean;
  setViewModal: (viewModal: boolean) => void;
  id?: number;
  props?: string;
  partnaer_id?: number | string;
};

export type MiniTopProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  Heading?: string;
  pageName: string;
};
export type BackProfileProps = {
  title?: string;
};

export type Country = {
  name: string;
  code: string;
};
export type MemberProps = {
  memberIndex: number;
  habitIndex: number;
};

export type NewModalProps = {
  visible: boolean;
  onClose: () => void;
  // onSave: (habit: Habit) => void;
  // addHeading?: string;
};
export type NewModalPropsCon = {
  visible: boolean;
  onClose: () => void;
  prors: string;
  userId?: number;
  con_user_id?: number;
  chalange_id?: number | string;
};
