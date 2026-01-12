import Image from "next/image";
import Navbar from "./src/Components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
       <Navbar></Navbar>
    </div>
  );
}
