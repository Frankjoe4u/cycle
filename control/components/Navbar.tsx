export default function Navbar() {
  return (
    <header
      className="w-full flex flex-col items-center px-4"
      style={{ paddingTop: "48px", paddingBottom: "40px" }}
    >
      <div
        className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#c084fc] shadow-lg shadow-purple-900/40"
        style={{ marginBottom: "32px" }}
      >
        <img
          src="/logo.png"
          alt="eve-care"
          className="w-full h-full object-cover"
        />
      </div>
      <h1
        className="text-3xl font-bold tracking-widest uppercase text-center"
        style={{ fontFamily: "var(--font-serif)", marginBottom: "16px" }}
      >
        CONTROL YOUR SEXLIFE
      </h1>
      <p className="text-sm text-[#c084fc] tracking-wide">
        Your gentle cycle companion
      </p>
    </header>
  );
}
