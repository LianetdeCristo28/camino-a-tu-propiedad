import { motion } from "framer-motion";
import { TrendingUp, Building2, Calculator } from "lucide-react";

export const InversionistasSection = () => {
  return (
    <section id="inversionistas" className="py-24 bg-[#17140F] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Inversión Inteligente</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">
            Multiplica tu patrimonio con datos, no con emociones
          </h2>
          <p className="text-xl text-white/70 text-balance">
            Identificamos propiedades con alto potencial de flujo de caja y apreciación a largo plazo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: TrendingUp,
              title: "Análisis de Rentabilidad",
              desc: "Proyecciones claras de ROI, Cap Rate y Cash-on-Cash para asegurar que los números tengan sentido desde el día uno."
            },
            {
              icon: Building2,
              title: "Propiedades Exclusivas",
              desc: "Acceso a oportunidades antes de que lleguen al mercado masivo y se conviertan en guerras de ofertas."
            },
            {
              icon: Calculator,
              title: "Estrategias de Financiamiento",
              desc: "Conexión con prestamistas especializados en inversionistas (DSCR, Fix & Flip, portfolio loans)."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <item.icon className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-serif font-bold mb-3">{item.title}</h3>
              <p className="text-white/60 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};