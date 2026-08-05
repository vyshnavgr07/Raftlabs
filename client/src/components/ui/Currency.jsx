import { formatCurrencyAmount } from '../../utils/format';

/**
 * Renders INR amounts with the rupee mark optically aligned to digits.
 * (The ₹ glyph sits high in many fonts when left as plain text.)
 */
export const Currency = ({ value, className = '' }) => (
  <span className={`inline-flex items-center tabular-nums ${className}`.trim()}>
    <span className="relative top-[0.14em] mr-[0.06em] text-[0.88em] leading-none">₹</span>
    <span className="leading-none">{formatCurrencyAmount(value)}</span>
  </span>
);
