import Image from 'next/image';

export function FeaturesLandingPage() {
  return (
    <section className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full h-full overflow-auto">
      {/* Left: Feature Image */}
      <div className="flex-1 flex items-center justify-center h-full">
        <Image
          src="/landing-2.png" // Replace with your image path
          alt="App Features Illustration"
          width={800}
          height={500}
          className="rounded-lg"
        />
      </div>

      {/* Right: Features Description */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center sm:text-left">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl relative z-20 font-bold text-black dark:text-white font-sans tracking-tight">
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-green-500 via-teal-500 to-blue-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="">
                Discover tools that enable seamless interaction:
              </span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 py-4">
              <span className="">
                Discover tools that enable seamless interaction:
              </span>
            </div>
          </div>
          <ul className="text-left text-gray-700 dark:text-gray-300 font-medium space-y-2">
            <li>💡 Consult and sell documents for students and parents</li>
            <li>📤 Upload and share documents for teachers</li>
            <li>📚 Centralized platform for educational resources</li>
          </ul>
        </h2>
      </div>
    </section>
  );
}
