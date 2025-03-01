export const HeroSection = () => {
    return (
      <div className="bg-[#fdeae6] w-full flex flex-col lg:flex-row items-center justify-between px-2 sm:px-10 py-2 sm:py-10 rounded-4xl">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-900">
            Get involved in social change in India
          </h1>
          <p className="text-gray-600 mt-2">
            Discover and donate to fundraisers or start your own
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold">
              Start a Fundraiser
            </button>
            <button className="border-2 border-gray-900 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
              Donate to a fundraiser
            </button>
          </div>
        </div>
  
        {/* Right Image */}
        <div className="lg:w-1/2 flex justify-center mt-6 lg:mt-0">
          <div className="relative">
            <img
              src="https://cfstatic.give.do/85e743a3-46c7-4480-b97c-abd7d5354abf.webp"
              alt="Fundraiser"
              className="rounded-lg w-full max-w-md object-cover"
            />
            <div className="absolute inset-0 bg-white mix-blend-multiply rounded-lg" />
          </div>
        </div>
      </div>
    );
  };
  