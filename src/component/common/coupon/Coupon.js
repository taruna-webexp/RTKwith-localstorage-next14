"use client";
export default function Coupon({ handleApplyCoupon, coupon, setCoupon }) {
  return (
    <>
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Apply Coupon</h2>
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="border p-2 rounded w-full mt-2"
          placeholder="Enter coupon code(0000)"
        />
        <button
          onClick={handleApplyCoupon}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Apply Coupon
        </button>
      </div>
    </>
  );
}
