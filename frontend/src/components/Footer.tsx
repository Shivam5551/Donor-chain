import { Link } from "react-router-dom";
import { MobileSocials } from "./MobileSocials";
import Socials from "./Socials";

import { Link2 } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">

            <span className="flex hover:cursor-pointer items-center gap-2">
                <img src="https://media.discordapp.net/attachments/1340715049362128919/1345093975794651257/Donor_Chain-removebg-preview.png?ex=67c34be2&is=67c1fa62&hm=9cecf3b11f4a34086d7e24fe52f49e6bf07d04101a513a4eee8091b8d4b75550&=&format=webp&quality=lossless&width=625&height=625" className="h-8 lg:h-12 rounded-3xl w-8 lg:w-12" />
                <Link to="/" className="text-sm text-black font-medium">
                    DonorChain
                </Link>
            </span>
            <p className="text-sm text-muted-foreground">
              Making charitable giving transparent and secure through blockchain technology.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/dashboard">
                <button className="h-auto p-0">Dashboard</button>
              </Link>
              <br />
              <Link to="/donate">
                <button className="h-auto p-0">Donate</button>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <Link to="/privacy">
                <button className="h-auto p-0">Privacy Policy</button>
              </Link>
              <br />
              <Link to="/terms">
                <button className="h-auto p-0">Terms of Service</button>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <div className="mt-6 hidden md:block md:mt-0">
                <Socials />
              </div>
              <div className="md:hidden block mt-6">
                <MobileSocials />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DonorChain. All rights reserved.</p>
        </div>



      </div>
    </footer>
  );
}