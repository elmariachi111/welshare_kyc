export default function Restricted() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="text-2xl text-center mt-16 w-2/3">
        Due to regulatory restrictions, the WEL token is unfortunately not
        available in your country.
      </p>
      <p className="text-gray-400 sm:w-2/3 text-center">
        If you have already purchased vouchers, you will be eligible for a
        refund.
      </p>
    </div>
  );
}
