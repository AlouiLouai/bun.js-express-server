import Image from 'next/image';
import { BackgroundBeamsWithCollision } from '../ui/background-beams-with-collision';
import { BackgroundLines } from '../ui/background-lines';

export function IntroLandingPage() {
  return (
    <section className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full h-full">
      {/* Left: Text */}
      <BackgroundBeamsWithCollision>
        <div className="flex-1 flex items-center justify-center h-full text-center sm:text-left">
          <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
              <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                <span className="">Empowering Education</span>
              </div>
              <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                <span className="">Empowering Education</span>
              </div>
            </div>
            Discover a seamless way for teachers to sell and students to
            purchase exclusive PDF documents
          </h2>
        </div>
      </BackgroundBeamsWithCollision>
      {/* Right: Image */}
      <BackgroundLines className="p-5">
        <div className="flex-1 flex items-center justify-center h-full">
          <Image
            src="/landing-1.png" // Replace with your image path
            alt="Education Illustration"
            width={800}
            height={500}
            className="rounded-lg"
          />
        </div>
      </BackgroundLines>
    </section>
  );
}
