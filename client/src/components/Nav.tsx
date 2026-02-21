import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-[#BDB2A4]/10" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl md:text-2xl font-serif font-bold text-[#17140F]">
          Lianet Espinosa <span className="text-primary italic">Ojeda</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#core-path" className="text-sm font-medium text-[#17140F]/80 hover:text-primary transition-colors">Compradores</a>
          <a href="#vendedores" className="text-sm font-medium text-[#17140F]/80 hover:text-primary transition-colors">Vendedores</a>
          <a href="#inversionistas" className="text-sm font-medium text-[#17140F]/80 hover:text-primary transition-colors">Inversionistas</a>
          <Button className="bg-[#17140F] text-white hover:bg-[#17140F]/90 rounded-full">
            Hablar con Lianet
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#17140F]" /> : <Menu className="w-6 h-6 text-[#17140F]" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-[#BDB2A4]/20 p-6 flex flex-col gap-4 shadow-xl">
          <a href="#core-path" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#17140F]">Compradores</a>
          <a href="#vendedores" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#17140F]">Vendedores</a>
          <a href="#inversionistas" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#17140F]">Inversionistas</a>
          <Button className="bg-[#17140F] text-white w-full rounded-full mt-4 py-6">
            Hablar con Lianet
          </Button>
        </div>
      )}
    </nav>
  );
};