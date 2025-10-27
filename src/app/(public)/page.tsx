import ContactForm from "@/components/main/ContactForm";
import Hero from "@/components/main/Hero";
import SearchBar from "@/components/main/SearchBar";
import Banners from "@/components/more/Banners";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <SearchBar />
      <Banners />
      <ContactForm />
    </div>
  );
}
