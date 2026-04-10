export default function Navbar() {
  return (
    <header className="w-full flex flex-col items-center pt-10 pb-6 px-4">
      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#c084fc] shadow-lg shadow-purple-900/40 mb-4">
        <img
          src="/logo.png"
          alt="FJ Tracker Logo"
          className="w-full h-full object-cover"
        />
      </div>
      <h1
        className="text-2xl md:text-3xl font-bold tracking-widest uppercase text-center"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        CONTROL YOUR SEXLIFE
      </h1>
      <p className="text-sm text-[#c084fc] mt-1 tracking-wide">
        Your gentle cycle companion
      </p>
    </header>
  );
}
