import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'TreeVerse - Premium Trees & Plants Marketplace',
  description: 'Discover and purchase the finest trees and plants from verified sellers.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f1f0f] text-white overflow-x-hidden">
      {/* Modern Hero Section with Glassmorphic Design */}
      <section className="relative min-h-screen flex items-center justify-center p-8 overflow-hidden bg-gradient-to-br from-[#1a2f1a] to-[#0f1f0f]">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-[20%] w-[500px] h-[500px] bg-[#4a7c2d]/15 rounded-full blur-[100px] -translate-y-1/2"></div>
          <div className="absolute top-1/2 right-[20%] w-[500px] h-[500px] bg-[#2d5016]/15 rounded-full blur-[100px] -translate-y-1/2"></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-extrabold leading-tight drop-shadow-lg">
              Breath Natural
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-lg">
              Discover the perfect plants to transform your space into a natural paradise.
              Premium quality, verified sellers, delivered to your door.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="/trees"
                className="px-12 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-full text-white font-semibold hover:bg-white/20 hover:border-white/40 hover:-translate-y-1 transition-all duration-300 shadow-xl"
              >
                Explore
              </Link>
              <button className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                <span className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-all">
                  ▶
                </span>
                <span>Live Demo...</span>
              </button>
            </div>
          </div>

          {/* Hero Visuals */}
          <div className="relative h-[600px] hidden lg:block">
            {/* Large Plant */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[25rem] drop-shadow-2xl animate-float">
              🌿
            </div>

            {/* Testimonial Card */}
            <div className="absolute bottom-32 left-0 w-72 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl animate-fade-in-left">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <h4 className="font-semibold">Shahzaib</h4>
                  <div className="text-xs tracking-widest">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.
              </p>
            </div>

            {/* Featured Product Card */}
            <div className="absolute top-32 right-0 w-80 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl animate-fade-in-right text-center group">
              <div className="mb-4 text-[10rem] leading-none drop-shadow-xl group-hover:-translate-y-2 transition-transform duration-500">
                🪴
              </div>
              <p className="text-sm text-white/60 mb-2">Trendy House Plant</p>
              <h3 className="text-2xl font-bold mb-6">Calathea Plant</h3>
              <button className="w-full py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-semibold hover:bg-white/20 transition-all">
                Buy now
              </button>

              <button className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                →
              </button>

              <div className="flex justify-center gap-2 mt-6">
                <span className="w-6 h-2 rounded-full bg-white"></span>
                <span className="w-2 h-2 rounded-full bg-white/30"></span>
                <span className="w-2 h-2 rounded-full bg-white/30"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Trendy Plants Section */}
      <section className="relative py-24 px-8 overflow-hidden flex flex-col items-center bg-[#0f1f0f]">
        {/* Background Blur Plant */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 blur-sm pointer-events-none select-none">
          <div className="text-[40rem] leading-none">🌳</div>
        </div>

        <h2 className="relative z-10 text-5xl font-semibold mb-16 text-center">Our Trendy Plants</h2>

        <div className="relative z-10 w-full max-w-5xl flex flex-col gap-8">
          {/* Card 1 */}
          <div className="flex flex-col md:flex-row items-center justify-between p-12 rounded-[3rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:-translate-y-1 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex-1 flex justify-center">
              <div className="text-[12rem] drop-shadow-2xl animate-float group-hover:scale-110 transition-transform duration-500">
                🌿
              </div>
            </div>
            <div className="flex-1 md:pl-8 text-center md:text-left mt-8 md:mt-0">
              <h3 className="text-3xl font-medium mb-4">For Small Desk Ai Plant</h3>
              <p className="text-white/60 leading-relaxed mb-6 max-w-md">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore et dolore magna aliqua.
              </p>
              <div className="text-2xl font-semibold mb-6">Rs.599</div>
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <button className="px-8 py-3 border border-white/30 rounded-lg hover:bg-white hover:text-[#0f1f0f] transition-all duration-300">
                  Buy Now
                </button>
                <button className="w-12 h-12 border border-white/30 rounded-lg flex items-center justify-center hover:bg-white hover:border-white transition-all duration-300 text-xl">
                  🛍️
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-between p-12 rounded-[3rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:-translate-y-1 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex-1 md:pr-8 text-center md:text-left mt-8 md:mt-0">
              <h3 className="text-3xl font-medium mb-4">For Small Desk Ai Plant</h3>
              <p className="text-white/60 leading-relaxed mb-6 max-w-md">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore et dolore magna aliqua.
              </p>
              <div className="text-2xl font-semibold mb-6">Rs.599</div>
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <button className="px-8 py-3 border border-white/30 rounded-lg hover:bg-white hover:text-[#0f1f0f] transition-all duration-300">
                  Buy Now
                </button>
                <button className="w-12 h-12 border border-white/30 rounded-lg flex items-center justify-center hover:bg-white hover:border-white transition-all duration-300 text-xl">
                  🛍️
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="text-[12rem] drop-shadow-2xl animate-float group-hover:scale-110 transition-transform duration-500 delay-150">
                🌵
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Top Selling Section */}
      <section className="py-24 px-8 bg-[#0f1f0f]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header with Brackets */}
          <div className="flex justify-center mb-20">
            <h2 className="text-4xl md:text-5xl font-medium text-center relative inline-block px-8">
              <span className="absolute -top-2 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#4a7c2d]"></span>
              Our Top Selling
              <span className="absolute -top-2 -right-4 w-8 h-8 border-t-2 border-r-2 border-[#4a7c2d]"></span>
            </h2>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product Card 1 */}
            <div className="group relative bg-white/5 rounded-[2.5rem] p-6 border border-white/5 hover:border-white/20 transition-all duration-300 h-[450px] flex flex-col">
              {/* Curved Top Shape using SVG or CSS Mask */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent rounded-t-[2.5rem] opacity-50"></div>

              {/* Plant Image - Floating above card */}
              <div className="relative -mt-24 mb-4 flex justify-center z-10">
                <div className="text-[10rem] drop-shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  🪴
                </div>
              </div>

              {/* Content */}
              <div className="mt-auto space-y-3 px-2">
                <h3 className="text-2xl font-medium">Calathea Plant</h3>
                <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                </p>

                <div className="flex items-center justify-between pt-4">
                  <span className="text-xl font-semibold text-white/90">Rs.309%</span>
                  <button className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                    🛍️
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="group relative bg-white/5 rounded-[2.5rem] p-6 border border-white/5 hover:border-white/20 transition-all duration-300 h-[450px] flex flex-col">
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent rounded-t-[2.5rem] opacity-50"></div>
              <div className="relative -mt-24 mb-4 flex justify-center z-10">
                <div className="text-[10rem] drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 delay-75">
                  🌿
                </div>
              </div>
              <div className="mt-auto space-y-3 px-2">
                <h3 className="text-2xl font-medium">Desk Plant</h3>
                <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                </p>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-xl font-semibold text-white/90">Rs.309%</span>
                  <button className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                    🛍️
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="group relative bg-white/5 rounded-[2.5rem] p-6 border border-white/5 hover:border-white/20 transition-all duration-300 h-[450px] flex flex-col">
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent rounded-t-[2.5rem] opacity-50"></div>
              <div className="relative -mt-24 mb-4 flex justify-center z-10">
                <div className="text-[10rem] drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 delay-150">
                  🌵
                </div>
              </div>
              <div className="mt-auto space-y-3 px-2">
                <h3 className="text-2xl font-medium">Calathea ai Plant</h3>
                <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                </p>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-xl font-semibold text-white/90">Rs.309%</span>
                  <button className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                    🛍️
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 4 */}
            <div className="group relative bg-white/5 rounded-[2.5rem] p-6 border border-white/5 hover:border-white/20 transition-all duration-300 h-[450px] flex flex-col">
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent rounded-t-[2.5rem] opacity-50"></div>
              <div className="relative -mt-24 mb-4 flex justify-center z-10">
                <div className="text-[10rem] drop-shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  🌵
                </div>
              </div>
              <div className="mt-auto space-y-3 px-2">
                <h3 className="text-2xl font-medium">Cal 874 Plant</h3>
                <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                </p>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-xl font-semibold text-white/90">Rs.309%</span>
                  <button className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                    🛍️
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 5 */}
            <div className="group relative bg-white/5 rounded-[2.5rem] p-6 border border-white/5 hover:border-white/20 transition-all duration-300 h-[450px] flex flex-col">
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent rounded-t-[2.5rem] opacity-50"></div>
              <div className="relative -mt-24 mb-4 flex justify-center z-10">
                <div className="text-[10rem] drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 delay-75">
                  🪴
                </div>
              </div>
              <div className="mt-auto space-y-3 px-2">
                <h3 className="text-2xl font-medium">Show Plant</h3>
                <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                </p>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-xl font-semibold text-white/90">Rs.309%</span>
                  <button className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                    🛍️
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 6 */}
            <div className="group relative bg-white/5 rounded-[2.5rem] p-6 border border-white/5 hover:border-white/20 transition-all duration-300 h-[450px] flex flex-col">
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent rounded-t-[2.5rem] opacity-50"></div>
              <div className="relative -mt-24 mb-4 flex justify-center z-10">
                <div className="text-[10rem] drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 delay-150">
                  🌿
                </div>
              </div>
              <div className="mt-auto space-y-3 px-2">
                <h3 className="text-2xl font-medium">Calat 02 Plant</h3>
                <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                </p>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-xl font-semibold text-white/90">Rs.309%</span>
                  <button className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                    🛍️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Best 02 Section */}
      <section className="py-24 px-8 bg-[#0f1f0f]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header with Brackets */}
          <div className="flex justify-center mb-20">
            <h2 className="text-4xl md:text-5xl font-medium text-center relative inline-block px-8">
              <span className="absolute -top-2 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#4a7c2d]"></span>
              Our Best 02
              <span className="absolute -top-2 -right-4 w-8 h-8 border-t-2 border-r-2 border-[#4a7c2d]"></span>
            </h2>
          </div>

          {/* Large Feature Card */}
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[4rem] p-12 md:p-16 shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Plant Image */}
              <div className="relative flex justify-center">
                <div className="text-[20rem] drop-shadow-2xl animate-float">
                  🌿
                </div>
              </div>

              {/* Right: Content */}
              <div className="space-y-6">
                <h3 className="text-4xl md:text-5xl font-medium leading-tight">
                  We Have Small Best 02 plants collection,s
                </h3>
                
                <div className="space-y-4 text-white/60 leading-relaxed">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisching elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisching elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6">
                  <button className="px-10 py-3 border border-white/30 rounded-lg hover:bg-white hover:text-[#0f1f0f] transition-all duration-300 font-medium">
                    Explore
                  </button>
                  <span className="text-white/40 text-sm">(01/04)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose TreeVerse - Premium Dark Redesign */}
      <section className="relative py-32 px-8 overflow-hidden bg-gradient-to-br from-[#0f1f0f] via-[#1a2f1a] to-[#0f1f0f]">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-[#4a7c2d]/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-[#2d5016]/10 rounded-full blur-[100px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4a7c2d]/5 rounded-full blur-[150px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
              Why Choose TreeVerse?
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Experience the future of plant marketplace with premium features designed for your success
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '✅',
                title: 'Verified Sellers',
                desc: 'All our sellers are carefully vetted to ensure quality and reliability.',
                gradient: 'from-emerald-500/20 to-green-500/20'
              },
              {
                icon: '🌱',
                title: 'Premium Quality',
                desc: 'Handpicked selection of the healthiest and most beautiful trees.',
                gradient: 'from-green-500/20 to-lime-500/20'
              },
              {
                icon: '🚚',
                title: 'Safe Delivery',
                desc: 'Carefully packaged and delivered to your doorstep with tracking.',
                gradient: 'from-teal-500/20 to-emerald-500/20'
              },
              {
                icon: '💳',
                title: 'Secure Payment',
                desc: 'Stripe-powered payments ensure your transactions are safe.',
                gradient: 'from-cyan-500/20 to-teal-500/20'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 group-hover:blur-lg" />

                {/* Card */}
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-green-500/10">
                  {/* Icon with Animation */}
                  <div className="mb-6 flex justify-center">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      <div className="relative text-7xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 filter drop-shadow-2xl">
                        {feature.icon}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-center leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {feature.desc}
                  </p>

                  {/* Decorative Bottom Line */}
                  <div className="mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full transition-all duration-500 mx-auto" />
                </div>
              </div>
            ))}
          </div>

          {/* Decorative Element */}
          <div className="mt-20 flex justify-center">
            <div className="text-[15rem] opacity-10 blur-sm select-none pointer-events-none animate-float">
              🌳
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-8 bg-white text-[#1a2f1a]">
        <h2 className="text-4xl font-bold text-center mb-16 text-[#2d5016]">Popular Categories</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '🍎', title: 'Fruit Trees', desc: 'Apple, Orange, Mango & more' },
            { icon: '🌸', title: 'Ornamental', desc: 'Cherry Blossom, Magnolia & more' },
            { icon: '🌲', title: 'Evergreen', desc: 'Pine, Spruce, Fir & more' },
            { icon: '🌳', title: 'Shade Trees', desc: 'Oak, Maple, Birch & more' }
          ].map((cat, i) => (
            <Link
              href={`/trees?category=${cat.title.toLowerCase().split(' ')[0]}`}
              key={i}
              className="group bg-gradient-to-br from-white to-[#f8faf6] p-10 rounded-2xl text-center border-2 border-[#e8f0e3] hover:border-[#4a7c2d] hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-[#2d5016]">{cat.title}</h3>
              <p className="text-sm text-gray-600">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#2d5016] to-[#4a7c2d] rounded-[2rem] p-16 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Garden Journey?</h2>
          <p className="text-xl opacity-90 mb-8">Join thousands of happy customers who have transformed their spaces.</p>
          <Link
            href="/trees"
            className="inline-block px-12 py-4 bg-white text-[#2d5016] rounded-lg font-bold hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            Explore Our Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
