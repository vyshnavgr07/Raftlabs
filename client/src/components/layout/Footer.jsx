export const Footer = () => (
  <footer className="mt-auto border-t border-orange-100 bg-gradient-to-r from-orange-50 via-white to-amber-50">
    <div className="container-app flex flex-col items-center justify-between gap-3 py-8 text-center sm:flex-row sm:text-left">
      <div>
        <p className="font-bold text-slate-800">FreshBite</p>
        <p className="text-sm text-slate-500">Fresh food. Fast delivery. Live order tracking.</p>
      </div>
      <p className="text-xs text-slate-400">© {new Date().getFullYear()} FreshBite. All rights reserved.</p>
    </div>
  </footer>
);
