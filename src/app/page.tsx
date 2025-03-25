import { Desktop } from "./components/Desktop";
import BlogsShowcase from "./blogs/page";
import Footer from "./footer/page";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-3 bg-gray-100 gap-10">
      {/* Desktop Component */}
      <div className="w-full">
        <Desktop />
      </div>

      {/* Blogs Showcase */}
      <div className="w-full">
        <BlogsShowcase />
      </div>

        {/* Blogs Showcase */}
        <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
