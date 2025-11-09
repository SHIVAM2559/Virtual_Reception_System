import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-4xl font-extrabold mb-6 text-center">
        Central Electricity Authority (Reception)
      </h1>
      <p className="text-lg text-gray-300 mb-12 text-center">
        Welcome to the Gatepass Management System <br />
        Select a section to continue:
      </p>

      {/* Grid of Navigation Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl w-full">
        <Link
          href="/login"
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-600 hover:to-cyan-600 transition-all rounded-xl p-6 text-center font-semibold text-lg shadow-lg hover:scale-105"
        >
          Login Page
        </Link>

        <Link
          href="/signup"
          className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-green-600 hover:to-emerald-600 transition-all rounded-xl p-6 text-center font-semibold text-lg shadow-lg hover:scale-105"
        >
          Signup Page
        </Link>

        <Link
          href="/gatepass"
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 transition-all rounded-xl p-6 text-center font-semibold text-lg shadow-lg hover:scale-105"
        >
          Gatepass Page
        </Link>

        <Link
          href="/guestupdate"
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-rose-600 hover:to-pink-600 transition-all rounded-xl p-6 text-center font-semibold text-lg shadow-lg hover:scale-105"
        >
          Guest Update Page
        </Link>

        <Link
          href="/addmore"
          className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-yellow-600 hover:to-orange-600 transition-all rounded-xl p-6 text-center font-semibold text-lg shadow-lg hover:scale-105"
        >
          Add More Guest
        </Link>

        <Link
          href="/api/users"
          className="bg-gradient-to-r from-gray-500 to-slate-500 hover:from-slate-600 hover:to-gray-600 transition-all rounded-xl p-6 text-center font-semibold text-lg shadow-lg hover:scale-105"
        >
          Logout
        </Link>

        <Link
          href="/api/users"
          className="bg-gradient-to-r from-gray-500 to-slate-500 hover:from-slate-600 hover:to-gray-600 transition-all rounded-xl p-6 text-center font-semibold text-lg shadow-lg hover:scale-105"
        >
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-400 text-sm">
        © 2025 Central Electricity Authority — Reception System
      </footer>
    </main>
  );
}
