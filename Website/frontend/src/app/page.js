import Benefits from "@/components/benefits/Benefits";
import Contact from "@/components/contact/Contact";
import CrimeDetector from "@/components/crimedetector/CrimeDetector";
import Features from "@/components/features/Features";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Topsection from "@/components/topsection/Topsection";


export default function Home() {
  
  return (
    <main className="">
      <div style={{backgroundImage: "url(/cctv1.jpeg)"}} className="min-h-screen bg-cover">
        <Navbar/>
        <Topsection/>
      </div>
      <Features/>
      <CrimeDetector/>
      <Benefits/>
      <Contact/>
      <Footer/>
    </main>
  )
}