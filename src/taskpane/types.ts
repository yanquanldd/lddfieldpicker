export interface InsertionProps {
  insertText: (value: string) => void;
  replaceText?: (value: string) => void;
  editMode?: boolean;
  decodedFields?: any;
  updateEditType?: () => void;
}

export enum CodeType {
  PRINT = "print",
  COMMENT = "comment",
  CONDITION = "condition",
  LOOP = "loop",
  Include = "include",
  NONE = "none",
}

export enum CommentActionTypes {
  Custom = "Custom",
}

export enum ConditionTypes {
  If = "if",
  Else = "else",
  Elif = "elseif",
  Endif = "endif",
}

export enum ConditionActionTypes {
  Condition = "Condition action",
  Operator = "Operator",
  Field = "Field",
  Custom = "Custom",
}

export enum LoopActionTypes {
  BlockOptions = "Block options",
  Limit = "Limit",
  Field = "Field",
  Custom = "Custom",
}

export interface JsonTreeSelectListProps {
  data: any;
  updateChecked: (checked) => void;
  isLoop?: boolean;
}
