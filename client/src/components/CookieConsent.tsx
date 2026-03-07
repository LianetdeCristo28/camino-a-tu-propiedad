import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getConsentStatus, setConsent, loadAnalytics } from "@/lib/analytics";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const status = getConsentStatus();
    if (status === null) {
      setVisible(true);
    } else if (status === "accepted") {
      loadAnalytics();
    }
  }, []);

  const handleAccept = () => {
    setConsent("accepted");
    setVisible(false);
  };

  const handleReject = () => {
    setConsent("rejected");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
          data-testid="cookie-consent-banner"
        >
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-[#BDB2A4]/20 p-5 md:p-6 flex flex-col sm:flex-row items-center gap-4">
            <p className="text-sm text-[#17140F]/80 flex-1 text-center sm:text-left">
              Usamos cookies para mejorar tu experiencia y analizar el tráfico del sitio. ¿Aceptas?{" "}
              <a href="/privacidad" className="text-primary underline hover:text-primary/80">
                Política de privacidad
              </a>
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={handleReject}
                className="px-5 py-2.5 text-sm font-medium text-[#17140F]/70 bg-[#F8F6F2] hover:bg-[#E5E1D8] rounded-lg transition-colors duration-200"
                data-testid="button-cookie-reject"
              >
                Rechazar
              </button>
              <button
                onClick={handleAccept}
                className="px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200"
                data-testid="button-cookie-accept"
              >
                Aceptar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
