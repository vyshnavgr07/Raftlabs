import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { checkoutSchema } from '../../utils/checkoutSchema';
import { PAYMENT_METHODS } from '../../constants/order';

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
      paymentMethod: 'Cash On Delivery',
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
        placeholder="+1 555 000 1234"
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

      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-white/80">Payment method</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {PAYMENT_METHODS.map((method) => (
            <label
              key={method}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm font-medium text-white transition has-[:checked]:border-brand-500 has-[:checked]:bg-brand-600/20"
            >
              <input
                type="radio"
                value={method}
                className="accent-brand-600"
                {...register('paymentMethod')}
              />
              {method}
            </label>
          ))}
        </div>
        {errors.paymentMethod ? (
          <span className="text-xs text-red-600">{errors.paymentMethod.message}</span>
        ) : null}
      </fieldset>

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? 'Placing order...' : 'Place order'}
      </Button>
    </form>
  );
};
