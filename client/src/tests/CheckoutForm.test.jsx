import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckoutForm } from '../components/order/CheckoutForm';

describe('CheckoutForm', () => {
  test('validates required fields', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<CheckoutForm onSubmit={onSubmit} />);
    await user.click(screen.getByRole('button', { name: /^pay$/i }));

    expect(await screen.findByText(/name must be at least 2 characters/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('submits valid form data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<CheckoutForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/^phone$/i), '+1 555 123 4567');
    await user.type(screen.getByLabelText(/delivery address/i), '123 Market Street');
    await user.click(screen.getByRole('button', { name: /^pay$/i }));

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      name: 'Jane Doe',
      phone: '+1 555 123 4567',
      address: '123 Market Street',
    });
  });
});
