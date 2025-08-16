"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Base/Button";
import Input from "@/components/ui/Base/Input";
import { useToast } from "@/hooks/use-toast";

interface NewsletterSectionProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

const NewsletterSection: React.FC<NewsletterSectionProps> = ({
  title = "Rimani aggiornato con le ultime novità",
  description = "Iscriviti alla nostra newsletter e ricevi aggiornamenti esclusivi su servizi, eventi e opportunità per far crescere il tuo business.",
  placeholder = "La tua email",
  buttonText = "Iscriviti",
  className = ""
}) => {
  const [email, setEmail] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  
  const { toast } = useToast();

  // Validazione email HTML5 avanzata
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validazione client-side
    if (!email.trim()) {
      toast({
        title: "Campo obbligatorio",
        description: "Devi inserire la tua email per iscriverti alla newsletter.",
        variant: "error",
        duration: 4000
      });
      return;
    }
    
    if (!validateEmail(email)) {
      toast({
        title: "Email non valida",
        description: "Controlla il formato dell'indirizzo email inserito.",
        variant: "error",
        duration: 4000
      });
      return;
    }

    setSubmissionState('loading');

    try {
      // Mock della chiamata API
      console.log('Newsletter subscription for:', email);
      
      // Simula una chiamata API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmissionState('success');
      setEmail(""); // Reset del campo
      
      // Toast di successo
      toast({
        title: "Iscrizione completata!",
        description: "Ti abbiamo inviato una email di conferma. Controlla la tua casella di posta.",
        variant: "success",
        duration: 5000
      });
      
      // Auto-reset dopo 2 secondi
      setTimeout(() => {
        setSubmissionState('idle');
      }, 2000);
      
    } catch (error) {
      console.error('Subscription error:', error);
      setSubmissionState('error');
      
      // Toast di errore
      toast({
        title: "Errore durante l'iscrizione",
        description: "Si è verificato un problema. Riprova tra qualche istante.",
        variant: "error",
        duration: 4000
      });
      
      // Auto-reset dopo 2 secondi
      setTimeout(() => {
        setSubmissionState('idle');
      }, 2000);
    }
  };

  // Gestione invio con Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && submissionState === 'idle') {
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <section
      className={`py-14 lg:py-24 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Titolo principale */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-regular text-primary mb-4">
            {title}
          </h2>
          
          {/* Descrizione */}
          <p className="font-sans text-lg md:text-xl text-gray-600 mb-12">
            {description}
          </p>

          {/* Form di iscrizione */}
          <div className="max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Campo email senza icona */}
              <div className="relative">
                <Input
                  type="email"
                  name="newsletter-email"
                  value={email}
                  onChange={handleEmailChange}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  label=""
                  error=""
                  disabled={submissionState === 'loading'}
                  className="text-center md:text-left py-4 px-6 bg-transparent transition-all duration-300 focus:shadow-lg focus:shadow-primary/10"
                  variant="gray-400"
                  aria-describedby="newsletter-description"
                />
              </div>

              {/* Pulsante di iscrizione */}
              <div>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={submissionState === 'loading' || !email.trim()}
                  className={`w-full rounded-full py-4 px-8 text-lg font-medium transition-all duration-300 ${
                    submissionState === 'loading' 
                      ? 'opacity-75 cursor-not-allowed' 
                      : 'hover:shadow-lg hover:shadow-primary/25'
                  }`}
                >
                  {submissionState === 'loading' ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Iscrizione...</span>
                    </div>
                  ) : (
                    buttonText
                  )}
                </Button>
              </div>
            </form>

            {/* Note legali */}
            <p className="mt-6 text-xs text-gray-500 font-sans leading-relaxed">
              Iscrivendoti accetti la nostra{" "}
              <a 
                href="/privacy" 
                className="text-primary hover:underline transition-colors duration-200"
              >
                Privacy Policy
              </a>
              . Puoi annullare l&apos;iscrizione in qualsiasi momento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;