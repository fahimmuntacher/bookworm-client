import Navbar from "./Components/Navbar";
import { PublicLayouts } from "./Layouts/PublicLayouts";

export default function Home() {
  return (
    <PublicLayouts>
      <div className="flex flex-col gap-12 py-8">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900">
            Welcome to <span className="text-gradient">BookWorm</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover, read, and explore the world of books. Your next favorite book is just a click away.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <button className="btn-primary px-8 py-3">Get Started</button>
            <button className="btn-outline px-8 py-3">Learn More</button>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Vast Library",
              description: "Access thousands of books across various genres",
              icon: "📚",
            },
            {
              title: "Easy Reading",
              description: "Read books online with a smooth, distraction-free experience",
              icon: "📖",
            },
            {
              title: "Community",
              description: "Share reviews and connect with fellow book lovers",
              icon: "👥",
            },
          ].map((feature, idx) => (
            <div key={idx} className="card p-6 text-center hover:scale-105">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </section>
      </div>
    </PublicLayouts>
  );
}
