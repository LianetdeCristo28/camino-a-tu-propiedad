import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const VendedoresSection = () => {
  return (
    <section id="vendedores" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm">Para Vendedores</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#17140F] leading-tight">
            Vender al precio correcto no es suerte. Es estrategia.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">
            El mercado cambia cada mes. Ponemos tu propiedad frente a los compradores correctos usando marketing digital avanzado, preparación estratégica y negociación experta para maximizar tu retorno.
          </p>
          <Button className="bg-[#17140F] text-white hover:bg-[#17140F]/90 text-lg px-8 py-6 rounded-full shadow-sm transition-all duration-300">
            Obtener Análisis de Valor Gratis
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-[#E5E1D8] border border-[#BDB2A4]/20"
        >
           <div className="absolute inset-0 bg-gradient-to-tr from-[#BDB2A4]/40 to-transparent" />
           <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-[#BDB2A4]/20">
             <p className="font-serif font-bold text-3xl text-primary">Alto Rendimiento</p>
             <p className="text-sm text-[#17140F] font-medium mt-1">Ventas consistentemente superiores al promedio del mercado local.</p>
           </div>
        </motion.div>
      </div>
    </section>
  );
};