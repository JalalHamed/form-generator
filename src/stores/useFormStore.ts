import type { Element, Form } from 'types';
import { v4 as uuid } from 'uuid';
import { create } from 'zustand';

interface FormState extends Partial<Form> {
  elements: Element[];
  addElement: (element: Element) => void;
  removeElement: (id: string) => void;
  resetElements: () => void;
  setElements: (elements: Element[]) => void;
}

const useFormStore = create<FormState>((set) => ({
  id: uuid(),
  name: '',
  elements: [],
  addElement: (element) =>
    set((state) => ({ elements: [...state.elements, element] })),
  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
    })),
  resetElements: () => set({ elements: [] }),
  setElements: (elements) => set({ elements }),
}));

export default useFormStore;
