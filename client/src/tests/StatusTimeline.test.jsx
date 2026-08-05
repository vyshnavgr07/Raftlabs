import { render, screen } from '@testing-library/react';
import { StatusTimeline } from '../components/order/StatusTimeline';
import { ORDER_STATUS } from '../constants/order';

describe('StatusTimeline', () => {
  test('highlights current status', () => {
    render(<StatusTimeline status={ORDER_STATUS.PREPARING} />);

    expect(screen.getByText('Preparing')).toBeInTheDocument();
    expect(screen.getByText('Current status')).toBeInTheDocument();
    expect(screen.getByLabelText(/order status timeline/i)).toBeInTheDocument();
  });
});
