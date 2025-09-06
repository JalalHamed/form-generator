export type ElementType = 'text' | 'checkbox';

export interface Choice {
  id: string;
  name: string;
}

export interface Element {
  id: string;
  type: ElementType;
  label: string;
  isRequired?: boolean;
  choices?: Choice[];
}

export interface Form {
  id: string;
  name: string;
  elements: Element[];
}

export interface Condition {
  targetElementId: string;
  valueToMatch: unknown;
}

export interface FormNameField {
  name: string;
}
