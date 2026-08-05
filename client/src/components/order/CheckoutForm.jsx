import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { checkoutSchema } from '../../utils/checkoutSchema';

export const CheckoutForm = ({ onSubmit, isSubmitting = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      notes: '',
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        id="name"
        label="Full name"
        placeholder="Jane Doe"
        error={errors.name?.message}
        {...register('name')}
      />
      <Input
        id="phone"
        label="Phone"
        placeholder="9876543210"
        error={errors.phone?.message}
        {...register('phone')}
      />
      <Input
        id="address"
        label="Delivery address"
        placeholder="Street, city, ZIP"
        error={errors.address?.message}
        {...register('address')}
      />
      <Input
        id="notes"
        as="textarea"
        label="Notes (optional)"
        placeholder="Gate code, allergies, etc."
        rows={3}
        error={errors.notes?.message}
        {...register('notes')}
      />

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Pay'}
      </Button>
    </form>
  );
};
