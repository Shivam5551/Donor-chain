import { Appbar } from "../components/Appbar";
import { DashboardCharts } from "../components/DashboardCharts";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
// import { Images } from "../components/Image";
import { MovingCurrentDonation } from "../components/MovingCurrentDonation";
import SearchBar from "../components/SearchBar";
import { ConnectWallet } from "../components/ConnectWallet";
import { useWallet } from "../hooks/use-wallet";
import { ArrowRight, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";

export const Home = () => {
  const { walletAddress } = useWallet(); // Use walletAddress instead of isConnected

  return (
    <div className="bg-white min-h-screen">
      <Appbar />
      <div className="pt-20 ">
        {/* <Images /> */}
        <section className="min-h-[80vh] flex items-center pt-16 pb-24 bg-gradient-to-b from-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-black">
                  Transparent Charity Through Blockchain
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Make secure donations and track your impact in real-time using 
                  blockchain technology.
                </p>
                <div className="space-x-4">
                  {walletAddress ? (
                    <button className="bg-black text-white px-6 py-2 rounded-md text-lg font-semibold transition">
                      <Link className="text-lg flex justify-center items-center font-semibold" to="/dashboard/user">
                        Go to Dashboard
                        <ArrowRight className=" ml-2 h-5 w-5 relative " />
                      </Link>
                    </button>
                  ) : (
                    <ConnectWallet />
                  )}
                  <button className="bg-primary text-black  hover:underline hover:cursor-pointer px-6 py-2 rounded-md text-lg font-semibold transition">
                    <Link to="/about">Learn More</Link>
                  </button>
                </div>
              </div>
              <div className="hidden lg:flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full  bg-gradient-to-r from-primary to-primary/20 blur-2xl opacity-20" />
                  <div className="relative bg-muted shadow-2xl shadow-gray-200 p-8 rounded-full">
                    <HandHeart className="w-48 h-48 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>  
      </div>
      <div className="p-4">
        <DashboardCharts />
      </div>
      <div className="w-full flex items-center justify-center text-white">
        <SearchBar />
      </div>
      <div className="sm:p-10 p-5 sm:px-20 flex items-center justify-center">
        <HeroSection />
      </div>
      <MovingCurrentDonation />
      <Footer />
    </div>
  );
};
