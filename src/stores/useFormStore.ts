import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import type { Element, Form } from '../types';

interface FormState extends Form {
  addElement: (element: Element) => void;
  removeElement: (id: string) => void;
  resetElements: () => void;
}

const useFormStore = create<FormState>((set) => ({
  id: uuid(),
  name: '',
  elements: [],
  addElement: (element) =>
    set((state) => ({ elements: [...state.elements, element] })),
  removeElement: (id) =>
    set((state) => ({ elements: state.elements.filter((el) => el.id !== id) })),
  resetElements: () => set({ elements: [] }),
}));

export default useFormStore;
