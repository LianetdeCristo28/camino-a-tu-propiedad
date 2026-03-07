import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LeadModal } from "@/components/LeadModal";
import { BarChart3, DollarSign, Camera, Handshake, CheckCircle, FileText } from "lucide-react";

const steps = [
  {
    num: 1,
    icon: BarChart3,
    title: "Evaluación de Mercado",
    desc: "CMA profesional con datos reales de tu zona.",
  },
  {
    num: 2,
    icon: DollarSign,
    title: "Estrategia de Precio",
    desc: "El precio correcto atrae las ofertas correctas.",
  },
  {
    num: 3,
    icon: Camera,
    title: "Marketing Profesional",
    desc: "Fotografía, videos, redes y MLS optimizado.",
  },
  {
    num: 4,
    icon: Handshake,
    title: "Negociación Experta",
    desc: "Defensa activa de tu precio y condiciones.",
  },
  {
    num: 5,
    icon: CheckCircle,
    title: "Cierre sin Sorpresas",
    desc: "Coordinación total hasta la mesa de cierre.",
  },
];

export const VendedoresSection = () => {
  const [leadOpen, setLeadOpen] = useState(false);

  return (
    <section id="vendedores" className="py-24 bg-gradient-to-b from-[#E5E1D8] via-[#F0EBE0] to-[#F8F6F2]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Vendedores</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#17140F] mb-6">
            Vende Estratégicamente, No Solo Rápido
          </h2>
          <p className="text-xl text-muted-foreground">
            Maximiza tu ganancia con análisis de mercado y marketing de alto nivel.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-lg font-medium text-center text-[#17140F]/70 mb-8"
        >
          Nuestros vendedores reciben en promedio un <span className="font-bold text-primary">3.2% más</span> que el precio de mercado
        </motion.p>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-primary/30" />
            <div className="grid grid-cols-5 gap-6 relative">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="flex flex-col items-center text-center"
                    data-testid={`card-seller-step-${step.num}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary text-[#17140F] flex items-center justify-center font-bold text-sm z-10 shrink-0 shadow-md">
                      {step.num}
                    </div>
                    <div className="mt-6 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-[#17140F] mt-3 mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: vertical timeline */}
        <div className="lg:hidden">
          <div className="relative pl-8">
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-primary/30" />
            <div className="space-y-8">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex gap-5 items-start"
                    data-testid={`card-seller-step-mobile-${step.num}`}
                  >
                    <div className="absolute -left-8 w-10 h-10 rounded-full bg-primary text-[#17140F] flex items-center justify-center font-bold text-sm z-10 shrink-0 shadow-md">
                      {step.num}
                    </div>
                    <div className="bg-[#F8F6F2] p-5 rounded-xl border border-[#BDB2A4]/20 shadow-sm flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="font-serif font-bold text-[#17140F]">{step.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button
            data-testid="button-solicitar-cma"
            onClick={() => setLeadOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-5 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
          >
            Solicitar Análisis CMA Gratuito
          </Button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-3">
            <FileText className="w-3.5 h-3.5" />
            Recibe tu reporte en 48 horas
          </p>
        </motion.div>
      </div>

      <LeadModal open={leadOpen} onOpenChange={setLeadOpen} context="vendedor" />
    </section>
  );
};
