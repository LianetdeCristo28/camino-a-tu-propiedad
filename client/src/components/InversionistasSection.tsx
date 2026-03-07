import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LeadModal } from "@/components/LeadModal";
import { TrendingUp, DollarSign, ArrowRight } from "lucide-react";

function AnimatedNumber({ target, suffix = "", prefix = "", decimals = 0, duration = 1500 }: { target: number; suffix?: string; prefix?: string; decimals?: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return <span ref={ref}>{prefix}{decimals > 0 ? value.toFixed(decimals) : Math.round(value)}{suffix}</span>;
}

const dashboardItems = [
  {
    label: "ROI promedio",
    value: 8.2,
    suffix: "%",
    decimals: 1,
    type: "gauge" as const,
  },
  {
    label: "Cash Flow mensual",
    value: 1850,
    prefix: "$",
    suffix: "/mes",
    decimals: 0,
    type: "bar-green" as const,
  },
  {
    label: "Apreciación anual",
    value: 5.4,
    prefix: "+",
    suffix: "%",
    decimals: 1,
    type: "trending" as const,
  },
  {
    label: "Ocupación rental",
    value: 92,
    suffix: "%",
    decimals: 0,
    type: "progress" as const,
  },
  {
    label: "Margen flip promedio",
    value: 45,
    prefix: "$",
    suffix: "K",
    decimals: 0,
    type: "dollar" as const,
  },
];

export const InversionistasSection = () => {
  const [leadOpen, setLeadOpen] = useState(false);

  return (
    <section id="inversionistas" className="py-24 bg-[#F8F6F2]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Inversionistas</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#17140F] mb-6">
            Inversión Inmobiliaria con Visión Estratégica
          </h2>
          <p className="text-xl text-muted-foreground">
            Florida sigue siendo uno de los mercados más dinámicos de EE.UU. Invierte con datos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="grid grid-cols-2 gap-4">
            {dashboardItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white p-5 rounded-xl border border-[#BDB2A4]/20 hover:shadow-md transition-all duration-300 ${i === 4 ? "col-span-2" : ""}`}
                data-testid={`card-investor-metric-${i + 1}`}
              >
                {item.type === "gauge" && (
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center mb-3">
                      <span className="text-3xl font-bold text-[#17140F]">
                        <AnimatedNumber target={item.value} suffix={item.suffix} decimals={item.decimals} />
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                )}

                {item.type === "bar-green" && (
                  <div>
                    <p className="text-3xl font-bold text-[#17140F] mb-1">
                      <AnimatedNumber target={item.value} prefix={item.prefix} decimals={item.decimals} />
                      <span className="text-base font-normal text-muted-foreground">{item.suffix}</span>
                    </p>
                    <div className="w-full h-2 bg-emerald-100 rounded-full mt-2 overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "75%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-emerald-500 rounded-full"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{item.label}</p>
                  </div>
                )}

                {item.type === "trending" && (
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-3xl font-bold text-[#17140F]">
                        <AnimatedNumber target={item.value} prefix={item.prefix} suffix={item.suffix} decimals={item.decimals} />
                      </span>
                      <TrendingUp className="w-6 h-6 text-emerald-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                )}

                {item.type === "progress" && (
                  <div>
                    <p className="text-3xl font-bold text-[#17140F] mb-1">
                      <AnimatedNumber target={item.value} suffix={item.suffix} decimals={item.decimals} />
                    </p>
                    <div className="w-full h-2 bg-primary/20 rounded-full mt-2 overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "92%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{item.label}</p>
                  </div>
                )}

                {item.type === "dollar" && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-[#17140F]">
                        <AnimatedNumber target={item.value} prefix={item.prefix} suffix={item.suffix} decimals={item.decimals} />
                      </p>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#17140F] text-white rounded-2xl p-10 flex flex-col justify-between min-h-[480px] relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
            <div className="relative z-10 space-y-6">
              <p className="text-4xl text-[#D2B463] font-bold">
                127
                <span className="block text-base font-medium text-white/50 mt-1">inversiones asesoradas en 2024</span>
              </p>
              <p className="font-serif text-2xl leading-relaxed text-balance">
                "El mercado premia a quienes actúan con información, no con impulso."
              </p>
              <p className="text-white/60 leading-relaxed">
                Analizamos cada oportunidad con datos de mercado actualizados, proyecciones de rentabilidad y evaluación de riesgo para que tu capital trabaje de forma inteligente.
              </p>
            </div>

            <div className="relative z-10 mt-8 space-y-4">
              <Button
                data-testid="button-evaluar-inversion"
                onClick={() => setLeadOpen(true)}
                className="bg-[#D2B463] text-[#17140F] hover:bg-[#D2B463]/90 text-lg px-10 py-5 rounded-xl font-bold shadow-lg hover:scale-105 transition-all w-full"
              >
                Evaluar Mi Oportunidad de Inversión
              </Button>
              <p className="text-center">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setLeadOpen(true); }}
                  className="inline-flex items-center gap-1 text-[#D2B463] text-sm underline underline-offset-4 hover:text-[#D2B463]/80 transition-colors"
                  data-testid="link-caso-estudio"
                >
                  Ver caso de estudio: Inversión en Kissimmee con 11% ROI
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <LeadModal open={leadOpen} onOpenChange={setLeadOpen} context="inversionista" />
    </section>
  );
};
