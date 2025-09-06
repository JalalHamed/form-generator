import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFormStore } from 'stores';
import { expect, vi, type Mock } from 'vitest';
import AddTextFieldDialog from './AddTextField';

interface FormStoreState {
  addElement: (...args: unknown[]) => void;
  elements: { id: string; label: string }[];
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
  render(<AddTextFieldDialog open={true} handleClose={mockHandleClose} />);
  expect(screen.getByText('Add Text Field')).toBeInTheDocument();

  await userEvent.click(screen.getByText('Cancel'));
  expect(mockHandleClose).toHaveBeenCalled();
});

test('can submit with valid data', async () => {
  render(<AddTextFieldDialog open={true} handleClose={mockHandleClose} />);

  await userEvent.type(screen.getByLabelText('Label'), 'My Label');
  await userEvent.click(screen.getByText('Add'));

  expect(mockAddElement).toHaveBeenCalled();
  expect(mockHandleClose).toHaveBeenCalled();
});

test('can toggle conditional rendering fields', async () => {
  (useFormStore as unknown as Mock).mockImplementation(
    (selector: (state: FormStoreState) => unknown) => {
      const state: FormStoreState = {
        addElement: mockAddElement,
        elements: [{ id: '1', label: 'Existing Field' }],
      };
      return selector(state);
    }
  );

  render(<AddTextFieldDialog open={true} handleClose={mockHandleClose} />);
  const condButton = screen.getByText('Add Conditional Rendering');

  expect(screen.queryByLabelText('Based on')).not.toBeInTheDocument();

  await userEvent.click(condButton);

  expect(screen.getByLabelText('Based on')).toBeInTheDocument();
  expect(screen.getByLabelText('If value equals to')).toBeInTheDocument();
});
