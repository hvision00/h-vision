"use client";

import React, { useState } from 'react';
import { Award, Shield, Users, Zap, Star, Check, Phone, Mail, MessageCircle, GraduationCap, Target, Briefcase } from 'lucide-react';

// Import dei componenti
import ServiceIntroSection from '@/components/Layout/ServiceIntroSection/ServiceIntroSection';
import CatalogCtaSection from '@/components/Layout/CatalogCtaSection/CatalogCtaSection';
import ServiceOfferingsSection from '@/components/Layout/ServiceOfferingsSection/ServiceOfferingsSection';
import ServiceDetailsModal from '@/components/Layout/ServiceDetailsModal/ServiceDetailsModal';
import WhyChooseUsSection from '@/components/Layout/WhyChooseUsSection/WhyChooseUsSection';

export default function FormazionePage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Dati per le card dei servizi
  const serviceCards = [
    {
      images: [
        { src: "/img/Services/formazione-sicurezza-1.jpg", alt: "Formazione Sicurezza Sul Lavoro" },
        { src: "/img/Services/formazione-sicurezza-2.jpg", alt: "Corsi Antincendio" },
        { src: "/img/Services/formazione-sicurezza-3.jpg", alt: "Primo Soccorso" }
      ],
      title: "Formazione Sicurezza",
      description: "Corsi obbligatori per la sicurezza sul lavoro, antincendio, primo soccorso e aggiornamenti normativi secondo D.Lgs 81/08",
      onDetailsClick: () => setActiveModal('sicurezza')
    },
    {
      images: [
        { src: "/img/Services/formazione-qualita-1.jpg", alt: "Sistemi Qualità" },
        { src: "/img/Services/formazione-qualita-2.jpg", alt: "Certificazioni ISO" },
        { src: "/img/Services/formazione-qualita-3.jpg", alt: "Audit Interni" }
      ],
      title: "Qualità e Certificazioni",
      description: "Percorsi formativi su sistemi di gestione qualità, certificazioni ISO 9001, ISO 14001, ISO 45001 e audit interni",
      onDetailsClick: () => setActiveModal('qualita')
    },
    {
      images: [
        { src: "/img/Services/formazione-digitale-1.jpg", alt: "Competenze Digitali" },
        { src: "/img/Services/formazione-digitale-2.jpg", alt: "Trasformazione Digitale" },
        { src: "/img/Services/formazione-digitale-3.jpg", alt: "Digital Skills" }
      ],
      title: "Competenze Digitali",
      description: "Training avanzati su trasformazione digitale, cybersecurity awareness, industria 4.0 e nuove tecnologie",
      onDetailsClick: () => setActiveModal('digitale')
    }
  ];

  // Dati per i modal delle specifiche
  const modalData = {
    sicurezza: {
      title: "Formazione Sicurezza Sul Lavoro",
      details: [
        {
          title: "Corsi Obbligatori Base",
          description: "Formazione generale e specifica per lavoratori secondo l'art. 37 del D.Lgs 81/08, con rilascio di attestato valido su tutto il territorio nazionale.",
          features: [
            "Formazione generale 4 ore per tutti i settori",
            "Formazione specifica da 4, 8 o 12 ore in base al rischio",
            "Aggiornamento quinquennale 6 ore",
            "Modalità e-learning dove consentito dalla normativa"
          ],
          benefits: [
            "Conformità normativa garantita",
            "Riduzione del rischio di sanzioni",
            "Miglioramento della cultura della sicurezza",
            "Attestati riconosciuti da tutti gli enti"
          ],
          imageSrc: "/img/formazione/sicurezza-base.jpg",
          imageAlt: "Aula formazione sicurezza"
        },
        {
          title: "Formazione Figure Specializzate",
          description: "Corsi per preposti, dirigenti, RLS, RSPP e coordinatori della sicurezza con programmi specifici e aggiornamenti periodici.",
          features: [
            "Corso preposti 8 ore + aggiornamento 5 anni",
            "Corso dirigenti 16 ore + aggiornamento 5 anni", 
            "Formazione RLS 32 ore + aggiornamento annuale",
            "Percorsi RSPP moduli A, B, C specifici per settore"
          ],
          benefits: [
            "Competenze specialistiche certificate",
            "Responsabilità legali ben definite",
            "Aggiornamento continuo garantito",
            "Network di professionisti qualificati"
          ],
          imageSrc: "/img/formazione/sicurezza-specializzata.jpg",
          imageAlt: "Formazione figure specializzate"
        }
      ]
    },
    qualita: {
      title: "Qualità e Certificazioni",
      details: [
        {
          title: "Sistemi di Gestione ISO",
          description: "Formazione completa sui principali standard internazionali per implementare e mantenere sistemi di gestione efficaci.",
          features: [
            "ISO 9001:2015 Gestione Qualità",
            "ISO 14001:2015 Gestione Ambientale",
            "ISO 45001:2018 Salute e Sicurezza",
            "Integrated Management Systems (IMS)"
          ],
          benefits: [
            "Miglioramento dei processi aziendali",
            "Riduzione dei costi operativi",
            "Maggiore competitività sul mercato",
            "Soddisfazione clienti aumentata"
          ],
          imageSrc: "/img/formazione/iso-standards.jpg",
          imageAlt: "Formazione ISO"
        },
        {
          title: "Audit e Valutazioni",
          description: "Percorsi per formare auditor interni qualificati e implementare sistemi di autovalutazione efficaci.",
          features: [
            "Tecniche di audit secondo ISO 19011",
            "Conduzione di audit interni efficaci",
            "Gestione delle non conformità",
            "Piani di miglioramento continuo"
          ],
          benefits: [
            "Autonomia nelle verifiche interne",
            "Identificazione proattiva delle criticità",
            "Preparazione agli audit esterni",
            "Cultura del miglioramento continuo"
          ],
          imageSrc: "/img/formazione/audit-training.jpg",
          imageAlt: "Formazione audit"
        }
      ]
    },
    digitale: {
      title: "Competenze Digitali",
      details: [
        {
          title: "Trasformazione Digitale",
          description: "Percorsi formativi per guidare il cambiamento digitale in azienda e sviluppare nuove competenze per il futuro.",
          features: [
            "Digital Strategy e Business Model Innovation",
            "Change Management per la digitalizzazione",
            "Gestione progetti di trasformazione digitale",
            "Cultura digitale e mindset innovation"
          ],
          benefits: [
            "Accelerazione dei processi di cambiamento",
            "Maggiore efficienza operativa",
            "Nuove opportunità di business",
            "Team più agili e reattivi"
          ],
          imageSrc: "/img/formazione/digital-transformation.jpg",
          imageAlt: "Trasformazione digitale"
        },
        {
          title: "Cybersecurity Awareness",
          description: "Formazione essenziale per proteggere l'azienda dalle minacce informatiche attraverso la consapevolezza dei dipendenti.",
          features: [
            "Riconoscimento minacce cyber (phishing, malware)",
            "Best practices per la sicurezza informatica",
            "Gestione password e autenticazione sicura",
            "Compliance GDPR e privacy"
          ],
          benefits: [
            "Riduzione del rischio cyber dell'80%",
            "Conformità alle normative vigenti",
            "Protezione dati aziendali e clienti",
            "Reputazione aziendale salvaguardata"
          ],
          imageSrc: "/img/formazione/cybersecurity-awareness.jpg",
          imageAlt: "Cybersecurity training"
        }
      ]
    }
  };

  // Dati per la sezione "Perché sceglierci"
  const whyChooseUsItems = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Docenti Certificati",
      description: "Formatori qualificati e aggiornati continuamente, con esperienza pluriennale nei rispettivi settori di competenza",
      highlight: "100% qualificati"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Attestati Riconosciuti",
      description: "Certificazioni valide su tutto il territorio nazionale e riconosciute da enti preposti e organismi di controllo",
      highlight: "Validità garantita"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Formazione Su Misura",
      description: "Programmi personalizzati in base alle specifiche esigenze aziendali e ai settori di appartenenza",
      highlight: "100% personalizzato"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Supporto Continuo",
      description: "Assistenza post-corso per implementazione pratica e risoluzione di dubbi operativi quotidiani",
      highlight: "Assistenza 24/7"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Metodologie Innovative",
      description: "Approcci didattici moderni che combinano teoria, pratica, e-learning e simulazioni realistiche",
      highlight: "Metodi avanzati"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Conformità Normativa",
      description: "Aggiornamento costante alle ultime disposizioni legislative e normative del settore",
      highlight: "Sempre aggiornati"
    }
  ];

  // Dati per i contatti
  const contactMethods = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Chiamaci",
      value: "+39 0123 456 789",
      href: "tel:+390123456789",
      description: "Lun-Ven 8:30-17:30"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email Formazione",
      value: "formazione@highvision.it",
      href: "mailto:formazione@highvision.it",
      description: "Risposta entro 2 ore"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "WhatsApp Business",
      value: "Chat diretta",
      href: "https://wa.me/390123456789",
      description: "Supporto immediato"
    }
  ];

  return (
    <main className="min-h-screen">
      
      {/* 1. Sezione Introduzione */}
      <ServiceIntroSection
        eyebrow="Formazione professionale • Corsi obbligatori • Sviluppo competenze"
        title="Formazione che fa la differenza"
        description="Dalla sicurezza sul lavoro alle competenze digitali del futuro. Percorsi formativi personalizzati per far crescere il tuo team e garantire la conformità normativa."
        ctaText="Scopri i nostri corsi"
        ctaHref="#servizi"
      />

      {/* 2. Sezione Richiamo Catalogo */}
      <CatalogCtaSection
        title="Esplora il nostro catalogo formativo completo"
        description="Oltre 150 corsi disponibili, docenti certificati e programmi personalizzabili per ogni esigenza aziendale"
        primaryCtaText="Sfoglia il catalogo"
        primaryCtaHref="/catalogo/formazione"
        secondaryCtaText="Richiedi preventivo"
        secondaryCtaHref="/contatti"
        showFeatures={true}
      />

      {/* 3. Sezione Cosa Offriamo */}
      <ServiceOfferingsSection
        title="Le nostre aree formative"
        description="Percorsi completi e aggiornati per sviluppare competenze, garantire conformità e accelerare la crescita professionale"
        cards={serviceCards}
      />

      {/* 4. Modal per le Specifiche */}
      {Object.entries(modalData).map(([key, data]) => (
        <ServiceDetailsModal
          key={key}
          isOpen={activeModal === key}
          onClose={() => setActiveModal(null)}
          serviceTitle={data.title}
          details={data.details}
        />
      ))}

      {/* 5. Sezione Perché Sceglierci */}
      <WhyChooseUsSection
        title="Perché scegliere High Vision per la formazione"
        description="L'esperienza di oltre 10 anni nel settore della formazione professionale, con migliaia di professionisti formati e aziende soddisfatte"
        items={whyChooseUsItems}
      />

    </main>
  );
}