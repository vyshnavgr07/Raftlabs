import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../components/ui/Modal';
import { showToast } from '../components/ui/Toast';
import toast from 'react-hot-toast';

vi.mock('react-hot-toast', () => ({
  default: Object.assign(vi.fn(), {
    success: vi.fn(),
    error: vi.fn(),
  }),
}));

describe('Modal and Toast', () => {
  test('Modal renders when open and closes', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal open title="Hello" onClose={onClose}>
        <p>Content</p>
      </Modal>,
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();

    await user.click(screen.getByLabelText(/close$/i));
    expect(onClose).toHaveBeenCalled();
  });

  test('Modal returns null when closed', () => {
    const { container } = render(
      <Modal open={false} title="Hidden" onClose={() => {}}>
        hidden
      </Modal>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  test('showToast helpers call toast', () => {
    showToast.success('ok');
    showToast.error('bad');
    showToast.info('info');

    expect(toast.success).toHaveBeenCalledWith('ok');
    expect(toast.error).toHaveBeenCalledWith('bad');
    expect(toast).toHaveBeenCalledWith('info');
  });
});
