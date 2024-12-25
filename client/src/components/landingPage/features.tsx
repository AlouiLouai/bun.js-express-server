import Image from 'next/image';

export function IntroLandingPage() {
  return (
    <section className="flex flex-col sm:flex-row items-center gap-8 w-full">
      {/* Left: Text */}
      <div className="flex-1 text-center sm:text-left">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
          Empowering Education
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Discover a seamless way for teachers to sell and students to purchase
          exclusive PDF documents. Easy, secure, and efficient for everyone.
        </p>
        <a
          href="/signup"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
        >
          Get Started
        </a>
      </div>
      {/* Right: Image */}
      <div className="flex-1">
        <Image
          src="/landing-1.png" // Replace with your image path
          alt="Education Illustration"
          width={800}
          height={500}
          className="rounded-lg"
        />
      </div>
    </section>
  );
}
