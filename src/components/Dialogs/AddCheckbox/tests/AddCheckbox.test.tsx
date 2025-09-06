import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFormStore } from 'stores';
import { expect, vi, type Mock } from 'vitest';
import AddCheckboxDialog from '../AddCheckbox';

interface FormStoreState {
  addElement: (...args: unknown[]) => void;
  elements: unknown[];
}

const mockAddElement = vi.fn();
const mockHandleClose = vi.fn();

vi.mock('stores', () => ({
  useFormStore: vi.fn(),
}));

beforeEach(() => {
  (useFormStore as unknown as Mock).mockImplementation(
    (selector: (state: FormStoreState) => unknown) => {
      const state: FormStoreState = {
        addElement: mockAddElement,
        elements: [],
      };
      return selector(state);
    }
  );
  vi.clearAllMocks();
});

test('renders dialog and can close', async () => {
  render(<AddCheckboxDialog open={true} handleClose={mockHandleClose} />);
  expect(screen.getByText('Add Checkbox Field')).toBeInTheDocument();
  await userEvent.click(screen.getByText('Cancel'));
  expect(mockHandleClose).toHaveBeenCalled();
});

test('can submit with valid data', async () => {
  render(<AddCheckboxDialog open={true} handleClose={mockHandleClose} />);
  await userEvent.type(screen.getByLabelText('Label'), 'My Label');
  await userEvent.type(screen.getByLabelText('Option 1'), 'Option 1');
  await userEvent.click(screen.getByText('Add'));
  expect(mockAddElement).toHaveBeenCalled();
  expect(mockHandleClose).toHaveBeenCalled();
});

test('can add and remove options', async () => {
  render(<AddCheckboxDialog open={true} handleClose={mockHandleClose} />);
  await userEvent.click(screen.getByText('Add Option'));

  const deleteButtons = screen.getAllByLabelText('Delete option');
  expect(deleteButtons.length).toBeGreaterThan(0);

  await userEvent.click(deleteButtons[0]);
});
