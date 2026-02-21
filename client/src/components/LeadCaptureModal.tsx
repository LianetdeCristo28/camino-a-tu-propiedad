import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const LeadCaptureModal = ({ open, onOpenChange }: { open: boolean, onOpenChange: (o: boolean) => void }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#F8F6F2] border border-[#BDB2A4]/20 p-0 overflow-hidden shadow-lg rounded-2xl">
        <div className="bg-[#17140F] p-6 text-[#F8F6F2] text-center">
            <DialogTitle className="text-2xl font-serif font-bold text-white">Hablemos de tus metas</DialogTitle>
            <DialogDescription className="text-white/70 mt-2">
              Déjanos tus datos y nos comunicaremos contigo en menos de 24 horas.
            </DialogDescription>
        </div>
        <div className="p-8">
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onOpenChange(false); }}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#17140F]">Nombre completo</label>
                <input type="text" className="w-full bg-white border border-[#BDB2A4]/20 rounded-lg p-3 outline-none focus:border-primary transition-all duration-300 shadow-sm" placeholder="Tu nombre" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#17140F]">Teléfono</label>
                <input type="tel" className="w-full bg-white border border-[#BDB2A4]/20 rounded-lg p-3 outline-none focus:border-primary transition-all duration-300 shadow-sm" placeholder="+1 (555) 000-0000" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#17140F]">Correo electrónico</label>
                <input type="email" className="w-full bg-white border border-[#BDB2A4]/20 rounded-lg p-3 outline-none focus:border-primary transition-all duration-300 shadow-sm" placeholder="correo@ejemplo.com" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#17140F]">¿En qué te podemos ayudar?</label>
                <select className="w-full bg-white border border-[#BDB2A4]/20 rounded-lg p-3 outline-none focus:border-primary transition-all duration-300 shadow-sm text-[#17140F]">
                  <option>Quiero comprar</option>
                  <option>Quiero vender</option>
                  <option>Busco invertir</option>
                  <option>Otra consulta</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-[#17140F] font-bold py-6 mt-4 rounded-full text-lg shadow-sm transition-all duration-300">
                Enviar Solicitud
              </Button>
            </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};