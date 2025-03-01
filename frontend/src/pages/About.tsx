
import { FaHandHoldingHeart, FaShieldAlt, FaGlobe, FaRocket } from "react-icons/fa";
import { Appbar } from "../components/Appbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/Card";


export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar />
      <div className="container mx-auto px-6 pt-24 py-16">
        <motion.h1 
          className="text-4xl font-bold text-center text-gray-800 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Revolutionizing Charity Donations with Blockchain
        </motion.h1>

        <motion.p 
          className="text-lg text-center text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          At Donor Chain, we are redefining the way charity donations are made by introducing a secure, transparent, and decentralized blockchain-based system. 
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <FaShieldAlt className="text-5xl text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold">100% Transparency</h2>
              <p className="text-gray-600">Every transaction is publicly verifiable on the blockchain.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <FaHandHoldingHeart className="text-5xl text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold">Fraud Prevention</h2>
              <p className="text-gray-600">Smart contracts ensure funds are used for their intended purpose.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <FaGlobe className="text-5xl text-yellow-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold">Decentralized Giving</h2>
              <p className="text-gray-600">Donors have direct control over their contributions without intermediaries.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <FaRocket className="text-5xl text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold">Instant & Secure</h2>
              <p className="text-gray-600">No delays, no hidden fees, just seamless donations.</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <motion.h2 
            className="text-3xl font-bold text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Join the Future of Charitable Giving
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Be part of a revolution that ensures every dollar makes a real difference. Whether you are an individual donor, a charity organization, or a corporate partner, your generosity fuels real impact.
          </p>
          <button className="mt-6 px-6 py-3 text-lg bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}