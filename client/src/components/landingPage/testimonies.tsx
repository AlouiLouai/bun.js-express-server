import { Card, CardContent } from '../ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

// Sample testimonials
const testimonials = [
  "This is the best service I've ever used!",
  'Amazing experience, I highly recommend it!',
  'The team was incredibly helpful and professional.',
  'I had such a smooth experience, will definitely use again!',
  'Top-notch service! Exceeded my expectations.',
];

export function TestimonialsLandingPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 w-full h-full">
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center sm:text-left">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl relative z-20 font-bold text-black dark:text-white font-sans tracking-tight">
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-green-500 via-teal-500 to-blue-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span>We love our customers feedback</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 py-4">
              <span>We love our customers feedback</span>
            </div>
          </div>
        </h2>
      </div>

      {/* Carousel placed under the text */}
      <div className="w-full">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full max-w-full"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      {/* Display random testimonial */}
                      <p className="text-lg font-semibold text-center">
                        {
                          testimonials[
                            Math.floor(Math.random() * testimonials.length)
                          ]
                        }
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
