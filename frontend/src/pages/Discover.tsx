import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { DonationCard } from "../components/DonateCard";
import { Footer } from "../components/Footer";
import { Images } from "../components/Image";
import SearchBar from "../components/SearchBar";
import { dummyData } from "../dummy-data/Dummy-data-DonataionCard";
export const Discover = () => {
    const [visibleCount, setVisibleCount] = useState(4); // Initial number of cards

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 3); // Load 6 more items each time
    };

    return (
        <div className="bg-white text-black overflow-auto min-h-screen">
            <Appbar />
            <div className="mt-20">
                <Images />
            </div>
            <div className="flex w-full items-center my-5 justify-center">
                <SearchBar />
            </div>
            <div className="grid grid-cols-1 mb-2 mt-4 lg:grid-cols-2 xl:grid-cols-3 place-items-center gap-2">
                {dummyData.slice(0, visibleCount).map((d, key) => (
                    <DonationCard
                        key={key}
                        title={d.title}
                        mission={d.mission}
                        receiverAddress={d.receiverAddress}
                        imageUrl={d.imageUrl}
                        raisedAmount={d.raisedAmount}
                        leftAmount={d.leftAmount}
                        donationsCount={d.donationsCount}
                        progress={d.progress}
                        taxBenefits={d.taxBenefits}
                    />
                ))}
            </div>
            {visibleCount < dummyData.length && (
                <div className="flex justify-center items-center my-6">
                    <button
                        onClick={handleLoadMore}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-lg font-semibold text-white transition"
                    >
                        Explore More
                    </button>
                </div>
            )}
            <Footer />
        </div>
    );
};
