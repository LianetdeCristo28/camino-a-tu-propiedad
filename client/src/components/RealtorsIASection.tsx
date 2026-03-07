import { motion } from "framer-motion";
import { Bot, Settings, Database, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const cards = [
  {
    icon: Bot,
    title: "Automatización con IA",
    desc: "Flujos inteligentes que trabajan 24/7 por ti.",
  },
  {
    icon: Settings,
    title: "Implementación n8n",
    desc: "Workflows personalizados sin código complejo.",
  },
  {
    icon: Database,
    title: "CRM con Supabase",
    desc: "Base de datos real, tus leads bajo control total.",
  },
  {
    icon: UserCircle,
    title: "Agente Ana",
    desc: "Tu asistente IA que responde, califica y agenda por ti.",
  },
];

export const RealtorsIASection = () => {
  const { toast } = useToast();

  const scheduleConsultancy = () => {
    console.log("scheduleConsultancy: usuario solicitó consultoría de IA");
    toast({
      title: "Próximamente",
      description: "Agenda tu consultoría de IA. Esta función estará disponible muy pronto.",
    });
  };

  return (
    <section id="realtors-ia" className="py-24 bg-gradient-to-br from-[#17140F] via-[#1E1B15] to-[#2A2520]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-[#D2B463] text-[#17140F] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Exclusivo para Realtors
          </span>
          <span className="text-[#D2B463] font-bold tracking-widest uppercase text-sm mb-4 block">Realtors IA</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Realtors: Trabaja con IA, Escala sin Límites
          </h2>
          <p className="text-xl text-white/70">
            Automatiza tu negocio, elimina tareas repetitivas y enfócate en cerrar más.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                data-testid={`card-realtor-ia-${i + 1}`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#D2B463]/10 flex items-center justify-center text-[#D2B463] mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-white text-lg mb-2">{card.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Button
            data-testid="button-agendar-consultoria"
            onClick={scheduleConsultancy}
            className="bg-[#D2B463] text-[#17140F] hover:bg-[#D2B463]/90 text-xl px-12 py-8 rounded-full shadow-[0_0_20px_rgba(210,180,99,0.3)] hover:scale-105 transition-all font-bold"
          >
            Agendar Consultoría de IA
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
