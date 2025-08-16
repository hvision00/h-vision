"use client";

import Image from "next/image";
import React, { useState } from "react";
import Button from "../components/ui/Base/Button";
import Input from "../components/ui/Base/Input";
import Textarea from "../components/ui/Base/Textarea";
import Select from "../components/ui/Base/Select";
import Checkbox from "../components/ui/Base/Checkbox";
import Switch from "../components/ui/Base/Switch";
import Alert from "../components/ui/Base/Alert";
import Modal from "../components/ui/Base/Modal";
import Tooltip from "../components/ui/Interazione/Tooltip";
import Spinner from "../components/ui/Interazione/Spinner";
import Card from "../components/ui/Struttura/Card";
import { useToast } from "../hooks/use-toast";
import Accordion from "../components/ui/Struttura/Accordion";
import Tabs from "../components/ui/Struttura/Tabs";
import Table from "../components/ui/Struttura/Table";
import Pagination from "../components/ui/Struttura/Pagination";

export default function Home() {
  const { toast } = useToast();
  // Stati per gestire i valori degli input e textarea
  const [inputValues, setInputValues] = useState({
    basic: "",
    email: "",
    password: "",
    withLabel: "",
    withError: "testo con errore",
    disabled: "Campo disabilitato"
  });

  const [textareaValues, setTextareaValues] = useState({
    basic: "",
    withLabel: "",
    withError: "Testo con errore di validazione",
    disabled: "Textarea disabilitata"
  });

  const [selectValues, setSelectValues] = useState({
    basic: "",
    withLabel: "",
    withError: "invalid",
    disabled: "option2"
  });

  const [checkboxValues, setCheckboxValues] = useState({
    basic: false,
    checked: true,
    withError: false,
    disabled: true,
    terms: false,
    newsletter: true
  });

  const [switchValues, setSwitchValues] = useState({
    basic: false,
    checked: true,
    disabled: false,
    notifications: true,
    darkMode: false,
    autoSave: true
  });

  const [modalState, setModalState] = useState({
    basic: false,
    withTitle: false,
    form: false,
    confirmation: false
  });

  const handleInputChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues(prev => ({
      ...prev,
      [name]: e.target.value
    }));
  };

  const handleTextareaChange = (name: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValues(prev => ({
      ...prev,
      [name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValues(prev => ({
      ...prev,
      [name]: e.target.value
    }));
  };

  const handleCheckboxChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxValues(prev => ({
      ...prev,
      [name]: e.target.checked
    }));
  };

  const handleSwitchChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchValues(prev => ({
      ...prev,
      [name]: e.target.checked
    }));
  };

  const openModal = (modalName: string) => {
    setModalState(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: string) => {
    setModalState(prev => ({ ...prev, [modalName]: false }));
  };

  // Opzioni per i select
  const countryOptions = [
    { value: "it", label: "Italia" },
    { value: "fr", label: "Francia" },
    { value: "de", label: "Germania" },
    { value: "es", label: "Spagna" },
    { value: "uk", label: "Regno Unito" }
  ];

  const categoryOptions = [
    { value: "web", label: "Sviluppo Web" },
    { value: "mobile", label: "App Mobile" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" }
  ];

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* Blocco di test */}
        <div className="flex flex-col gap-4 items-center text-center mb-8">
          <h1 className="font-heading text-4xl font-regular">Heading con Telegraf</h1>
          <p className="font-sans text-lg">Questo paragrafo usa il font Poppins per il testo normale.</p>
          
          {/* Test Button */}
          <div className="space-y-4 space-x-4 p-8">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="primary" disabled>Disabled Primary</Button>
            <Button variant="secondary" disabled>Disabled Secondary</Button>
          </div>

          {/* Test Input */}
          <div className="w-full max-w-md space-y-6 p-8">
            <h2 className="font-heading text-2xl font-regular mb-4">Test Input Components</h2>
            
            <Input
              name="basic"
              placeholder="Input di base (gray-400)"
              value={inputValues.basic}
              onChange={handleInputChange("basic")}
            />

            <Input
              name="basicDark"
              placeholder="Input gray-600"
              variant="gray-600"
              value={inputValues.basic}
              onChange={handleInputChange("basic")}
            />

            <Input
              type="email"
              name="email"
              placeholder="Email"
              label="Email Address"
              value={inputValues.email}
              onChange={handleInputChange("email")}
            />

            <Input
              type="password"
              name="password"
              placeholder="Password"
              label="Password"
              variant="gray-600"
              value={inputValues.password}
              onChange={handleInputChange("password")}
            />

            <Input
              name="withLabel"
              placeholder="Campo con label"
              label="Campo con Label"
              value={inputValues.withLabel}
              onChange={handleInputChange("withLabel")}
            />

            <Input
              name="withError"
              placeholder="Campo con errore"
              label="Campo con Errore"
              error="Questo campo contiene un errore di validazione"
              value={inputValues.withError}
              onChange={handleInputChange("withError")}
            />

            <Input
              name="disabled"
              placeholder="Campo disabilitato"
              label="Campo Disabilitato"
              disabled
              value={inputValues.disabled}
              onChange={handleInputChange("disabled")}
            />
          </div>

          {/* Test Checkbox */}
          <div className="w-full max-w-md space-y-6 p-8">
            <h2 className="font-heading text-2xl font-regular mb-4">Test Checkbox Components</h2>
            
            <Checkbox
              name="basic"
              label="Checkbox di base"
              checked={checkboxValues.basic}
              onChange={handleCheckboxChange("basic")}
            />

            <Checkbox
              name="checked"
              label="Checkbox già selezionata"
              checked={checkboxValues.checked}
              onChange={handleCheckboxChange("checked")}
            />

            <Checkbox
              name="withError"
              label="Checkbox con errore"
              error="Devi accettare questo campo"
              checked={checkboxValues.withError}
              onChange={handleCheckboxChange("withError")}
            />

            <Checkbox
              name="disabled"
              label="Checkbox disabilitata"
              disabled
              checked={checkboxValues.disabled}
              onChange={handleCheckboxChange("disabled")}
            />

            <div className="space-y-3 pt-4 border-t border-gray-200">
              <h3 className="font-sans text-sm font-medium text-foreground">Esempio pratico:</h3>
              
              <Checkbox
                name="terms"
                label="Accetto i termini e condizioni"
                checked={checkboxValues.terms}
                onChange={handleCheckboxChange("terms")}
              />

              <Checkbox
                name="newsletter"
                label="Desidero ricevere la newsletter"
                checked={checkboxValues.newsletter}
                onChange={handleCheckboxChange("newsletter")}
              />
            </div>
          </div>

          {/* Test Modal */}
          <div className="w-full max-w-md space-y-6 p-8">
            <h2 className="font-heading text-2xl font-regular mb-4">Test Modal Components</h2>
            
            <div className="space-y-4">
              <Button 
                variant="primary" 
                onClick={() => openModal('basic')}
              >
                Apri Modal Semplice
              </Button>

              <Button 
                variant="secondary" 
                onClick={() => openModal('withTitle')}
              >
                Modal con Titolo
              </Button>

              <Button 
                variant="primary" 
                onClick={() => openModal('form')}
              >
                Modal con Form
              </Button>

              <Button 
                variant="secondary" 
                onClick={() => openModal('confirmation')}
              >
                Modal di Conferma
              </Button>
            </div>
          </div>

          {/* Test Tooltip */}
          <div className="w-full max-w-md space-y-8 p-8">
            <h2 className="font-heading text-2xl font-regular mb-4">Test Tooltip Components</h2>
            
            <div className="space-y-6">
              {/* Posizioni */}
              <div className="text-center space-y-4">
                <h3 className="font-sans text-sm font-medium text-foreground mb-4">Posizioni tooltip:</h3>
                
                <div className="flex justify-center">
                  <Tooltip content="Tooltip in alto" position="top">
                    <Button variant="primary">Hover Top</Button>
                  </Tooltip>
                </div>
                
                <div className="flex justify-center gap-8">
                  <Tooltip content="Tooltip a sinistra" position="left">
                    <Button variant="secondary">Left</Button>
                  </Tooltip>
                  
                  <Tooltip content="Tooltip a destra" position="right">
                    <Button variant="secondary">Right</Button>
                  </Tooltip>
                </div>
                
                <div className="flex justify-center">
                  <Tooltip content="Tooltip in basso" position="bottom">
                    <Button variant="primary">Hover Bottom</Button>
                  </Tooltip>
                </div>
              </div>

              {/* Su diversi elementi */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <h3 className="font-sans text-sm font-medium text-foreground">Su diversi elementi:</h3>
                
                <div className="flex gap-4 items-center flex-wrap">
                  <Tooltip content="Questo è un input con tooltip">
                    <Input
                      name="tooltipInput"
                      placeholder="Input con tooltip"
                      value=""
                      onChange={() => {}}
                    />
                  </Tooltip>
                </div>

                <div className="flex gap-4 items-center">
                  <Tooltip content="Switch con tooltip esplicativo">
                    <Switch
                      name="tooltipSwitch"
                      label="Attiva notifiche"
                      checked={false}
                      onChange={() => {}}
                    />
                  </Tooltip>
                </div>

                <div className="flex gap-4 items-center">
                  <Tooltip content="Checkbox con informazioni aggiuntive">
                    <Checkbox
                      name="tooltipCheckbox"
                      label="Accetto i termini"
                      checked={false}
                      onChange={() => {}}
                    />
                  </Tooltip>
                </div>

                <Tooltip content="Questo testo ha un tooltip molto lungo per testare come si comporta con contenuti estesi">
                  <p className="font-sans text-foreground cursor-help border-b border-dashed border-gray-400 inline-block">
                    Testo con tooltip lungo (hover me)
                  </p>
                </Tooltip>
              </div>

              {/* Esempi pratici */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <h3 className="font-sans text-sm font-medium text-foreground">Esempi pratici:</h3>
                
                <div className="flex gap-4 items-center">
                  <Tooltip content="Salva le modifiche">
                    <Button variant="primary">💾</Button>
                  </Tooltip>
                  
                  <Tooltip content="Modifica elemento">
                    <Button variant="secondary">✏️</Button>
                  </Tooltip>
                  
                  <Tooltip content="Elimina elemento" position="bottom">
                    <Button variant="secondary">🗑️</Button>
                  </Tooltip>
                  
                  <Tooltip content="Informazioni aggiuntive" position="right">
                    <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs cursor-help">
                      i
                    </span>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

          {/* Test Pagination */}
          <div className="w-full max-w-4xl space-y-8 p-8">
            <h2 className="font-heading text-2xl font-regular mb-4">Test Pagination Components</h2>
            
            <div className="space-y-12">
              {/* Pagination semplice */}
              <div className="space-y-4">
                <h3 className="font-heading text-lg font-medium">Pagination Semplice (5 pagine)</h3>
                <div className="p-6 border border-gray-200 rounded-lg text-center">
                  <p className="font-sans text-foreground mb-4">
                    Pagina corrente: <strong>{paginationState.simple}</strong> di 5
                  </p>
                  <Pagination
                    currentPage={paginationState.simple}
                    totalPages={5}
                    onPageChange={handlePaginationChange('simple')}
                  />
                </div>
              </div>

              {/* Pagination con molte pagine */}
              <div className="space-y-4">
                <h3 className="font-heading text-lg font-medium">Pagination Estesa (25 pagine)</h3>
                <div className="p-6 border border-gray-200 rounded-lg text-center">
                  <p className="font-sans text-foreground mb-4">
                    Pagina corrente: <strong>{paginationState.large}</strong> di 25
                  </p>
                  <Pagination
                    currentPage={paginationState.large}
                    totalPages={25}
                    onPageChange={handlePaginationChange('large')}
                  />
                </div>
              </div>

              {/* Pagination con tabella progetti */}
              <div className="space-y-4">
                <h3 className="font-heading text-lg font-medium">Tabella Progetti con Pagination</h3>
                <div className="space-y-4">
                  <Table
                    headers={["Progetto", "Cliente", "Stato", "Budget", "Scadenza"]}
                    rows={[
                      [`Progetto ${(paginationState.projects - 1) * 5 + 1}`, "Cliente A", "In Corso", "€25.000", "15 Mar 2024"],
                      [`Progetto ${(paginationState.projects - 1) * 5 + 2}`, "Cliente B", "Completato", "€18.500", "28 Feb 2024"], 
                      [`Progetto ${(paginationState.projects - 1) * 5 + 3}`, "Cliente C", "In Corso", "€45.000", "30 Apr 2024"],
                      [`Progetto ${(paginationState.projects - 1) * 5 + 4}`, "Cliente D", "In Revisione", "€12.000", "10 Mar 2024"],
                      [`Progetto ${(paginationState.projects - 1) * 5 + 5}`, "Cliente E", "In Corso", "€32.000", "20 Mag 2024"],
                    ]}
                  />
                  <div className="flex justify-center pt-4">
                    <Pagination
                      currentPage={paginationState.projects}
                      totalPages={8}
                      onPageChange={handlePaginationChange('projects')}
                    />
                  </div>
                  <p className="text-sm text-foreground/60 text-center">
                    Mostrando progetti {(paginationState.projects - 1) * 5 + 1}-{paginationState.projects * 5} di 40 totali
                  </p>
                </div>
              </div>

              {/* Pagination con analytics */}
              <div className="space-y-4">
                <h3 className="font-heading text-lg font-medium">Analytics con Pagination</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-blue-50 rounded-lg text-center">
                      <h4 className="font-heading font-medium text-blue-900 mb-2">Pagina {paginationState.analytics}</h4>
                      <p className="text-2xl font-bold text-blue-600">{1247 + (paginationState.analytics - 1) * 156}</p>
                      <p className="text-sm text-blue-700">Visitatori Unici</p>
                    </div>
                    <div className="p-6 bg-green-50 rounded-lg text-center">
                      <h4 className="font-heading font-medium text-green-900 mb-2">Conversioni</h4>
                      <p className="text-2xl font-bold text-green-600">{23 + (paginationState.analytics - 1) * 8}</p>
                      <p className="text-sm text-green-700">Nuovi Clienti</p>
                    </div>
                    <div className="p-6 bg-purple-50 rounded-lg text-center">
                      <h4 className="font-heading font-medium text-purple-900 mb-2">Revenue</h4>
                      <p className="text-2xl font-bold text-purple-600">€{(2340 + (paginationState.analytics - 1) * 567).toLocaleString()}</p>
                      <p className="text-sm text-purple-700">Fatturato Giornaliero</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center pt-4">
                    <Pagination
                      currentPage={paginationState.analytics}
                      totalPages={12}
                      onPageChange={handlePaginationChange('analytics')}
                    />
                  </div>
                  
                  <p className="text-sm text-foreground/60 text-center">
                    Dati del giorno {paginationState.analytics} di 12 - Periodo: Marzo 2024
                  </p>
                </div>
              </div>

              {/* Esempi casi limite */}
              <div className="space-y-6">
                <h3 className="font-heading text-lg font-medium">Casi Limite</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-medium">Una sola pagina (nascosta)</h4>
                    <div className="p-4 border border-gray-200 rounded-lg text-center">
                      <p className="text-sm text-foreground/60 mb-2">Quando c'è solo 1 pagina, la pagination non viene mostrata</p>
                      <Pagination
                        currentPage={1}
                        totalPages={1}
                        onPageChange={() => {}}
                      />
                      <p className="text-xs text-foreground/40 mt-2">(Componente non visibile)</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Due pagine</h4>
                    <div className="p-4 border border-gray-200 rounded-lg text-center">
                      <p className="text-sm text-foreground/60 mb-2">Layout minimo con 2 pagine</p>
                      <Pagination
                        currentPage={1}
                        totalPages={2}
                        onPageChange={() => toast({title: "Demo", description: "Pagination di esempio"})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Test Card */}
          <div className="w-full max-w-4xl space-y-6 p-8">
            <h2 className="font-heading text-2xl font-regular mb-4">Test Card Components</h2>
            
            <div className="space-y-12">
              {/* Grid di card - 2 colonne, layout pulito */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                <Card
                  imageSrc="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=400&fit=crop"
                  imageAlt="Sviluppo web professionale"
                  title="Sviluppo Web Professionale"
                  description="Creiamo applicazioni web moderne e scalabili utilizzando le tecnologie più avanzate del settore. Dal frontend al backend, gestiamo ogni aspetto del processo di sviluppo per garantire risultati eccellenti."
                  buttonText="Scopri di più"
                  onButtonClick={() => toast({
                    variant: "success",
                    title: "Progetto web",
                    description: "Hai mostrato interesse per lo sviluppo web"
                  })}
                />

                <Card
                  imageSrc="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=400&fit=crop"
                  imageAlt="Design UX/UI"
                  title="Design UX/UI Excellence"
                  description="Progettiamo interfacce che non solo sono belle da vedere, ma che guidano gli utenti verso gli obiettivi desiderati attraverso un'esperienza intuitiva e coinvolgente che converte visitatori in clienti."
                  buttonText="Vedi Portfolio"
                  onButtonClick={() => toast({
                    variant: "info",
                    title: "Portfolio design",
                    description: "Visualizza i nostri lavori più recenti"
                  })}
                />

                <Card
                  imageSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop"
                  imageAlt="Consulenza strategica"
                  title="Consulenza Strategica Digital"
                  description="Analizziamo il tuo business e creiamo strategie digitali personalizzate per accelerare la crescita e ottimizzare i processi aziendali nel mercato moderno sempre più competitivo."
                  buttonText="Richiedi Consulenza"
                  onButtonClick={() => toast({
                    title: "Consulenza richiesta",
                    description: "Un esperto ti contatterà entro 24h"
                  })}
                />

                <Card
                  title="Supporto Tecnico Premium"
                  description="Assistenza tecnica 24/7 con team di esperti dedicati. Risolviamo problemi complessi e forniamo supporto continuativo per mantenere i tuoi sistemi sempre operativi e performanti senza interruzioni."
                  buttonText="Attiva Supporto"
                  onButtonClick={() => toast({
                    variant: "success",
                    title: "Supporto attivato",
                    description: "Il supporto premium è ora attivo sul tuo account"
                  })}
                />

              </div>

              {/* Sezione aggiuntiva */}
              <div className="space-y-8 pt-8 border-t border-gray-200">
                <h3 className="font-heading text-xl font-regular">Altri Servizi</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <Card
                    imageSrc="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=400&fit=crop"
                    title="Innovazione AI & Machine Learning"
                    description="Integriamo intelligenza artificiale nei tuoi processi per automatizzare operazioni complesse e fornire insights predittivi che trasformano i dati in vantaggio competitivo duraturo."
                    buttonText="Esplora AI"
                    onButtonClick={() => toast({
                      variant: "success", 
                      title: "Innovazione AI",
                      description: "Scopri come l'AI può rivoluzionare il tuo business"
                    })}
                  />
                  
                  <Card
                    imageSrc="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&h=400&fit=crop"
                    title="Formazione & Workshop Specializzati"
                    description="Corsi avanzati per il tuo team su tecnologie moderne, metodologie agili e best practices del settore. Investire nella formazione significa investire nel futuro della tua azienda."
                    buttonText="Programmi Formativi"
                    onButtonClick={() => toast({
                      title: "Formazione disponibile",
                      description: "Scopri i nostri prossimi corsi in programma"
                    })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Test Accordion */}
          <div className="w-full max-w-2xl space-y-6 p-8">
            <h2 className="font-heading text-2xl font-regular mb-4">Test Accordion Components</h2>
            
            <div className="space-y-8">
              {/* Accordion FAQ */}
              <div>
                <h3 className="font-heading text-lg font-medium mb-4">Domande Frequenti</h3>
                <Accordion
                  defaultOpenId="faq-1"
                  items={[
                    {
                      id: "faq-1",
                      title: "Quali tecnologie utilizzate per lo sviluppo?",
                      content: (
                        <div>
                          <p className="mb-3">
                            Utilizziamo un stack tecnologico moderno e affidabile che include React, Next.js, 
                            TypeScript per il frontend e Node.js, PostgreSQL per il backend.
                          </p>
                          <p>
                            Ogni progetto viene valutato singolarmente per scegliere le tecnologie più 
                            adatte agli obiettivi specifici e ai requisiti di performance.
                          </p>
                        </div>
                      )
                    },
                    {
                      id: "faq-2", 
                      title: "Quanto tempo richiede un progetto di sviluppo web?",
                      content: (
                        <div>
                          <p className="mb-3">
                            I tempi variano in base alla complessità del progetto:
                          </p>
                          <ul className="list-disc list-inside space-y-1 mb-3">
                            <li>Sito vetrina: 2-4 settimane</li>
                            <li>E-commerce: 6-10 settimane</li>
                            <li>Applicazione web complessa: 3-6 mesi</li>
                          </ul>
                          <p>
                            Forniamo sempre una stima dettagliata dopo l'analisi iniziale dei requisiti.
                          </p>
                        </div>
                      )
                    },
                    {
                      id: "faq-3",
                      title: "Offrite supporto post-lancio?",
                      content: (
                        <p>
                          Sì, offriamo diversi pacchetti di supporto che includono manutenzione, 
                          aggiornamenti di sicurezza, backup automatici e assistenza tecnica. 
                          Il supporto può essere occasionale o continuativo in base alle tue esigenze.
                        </p>
                      )
                    },
                    {
                      id: "faq-4",
                      title: "Come funziona il processo di design UX/UI?",
                      content: (
                        <div>
                          <p className="mb-3">Il nostro processo di design segue queste fasi:</p>
                          <ol className="list-decimal list-inside space-y-1 mb-3">
                            <li>Ricerca utenti e analisi competitor</li>
                            <li>Wireframe e architettura informazioni</li>
                            <li>Prototipazione interattiva</li>
                            <li>Design visuale e sistema di design</li>
                            <li>Test di usabilità e iterazioni</li>
                          </ol>
                          <p>
                            Ogni fase prevede feedback continui per garantire che il risultato 
                            finale risponda perfettamente alle esigenze degli utenti.
                          </p>
                        </div>
                      )
                    }
                  ]}
                />
              </div>

              {/* Accordion Servizi */}
              <div>
                <h3 className="font-heading text-lg font-medium mb-4">I Nostri Servizi</h3>
                <Accordion
                  items={[
                    {
                      id: "service-1",
                      title: "Sviluppo Web & Mobile",
                      content: (
                        <div className="space-y-3">
                          <p>
                            Creiamo applicazioni web e mobile moderne, scalabili e performanti 
                            utilizzando le migliori tecnologie disponibili.
                          </p>
                          <div className="flex gap-2 justify-center">
                            <Button 
                              variant="primary" 
                              onClick={() => toast({ 
                                title: "Sviluppo Web", 
                                description: "Richiesta informazioni inviata" 
                              })}
                            >
                              Richiedi Info
                            </Button>
                          </div>
                        </div>
                      )
                    },
                    {
                      id: "service-2",
                      title: "Consulenza Strategica",
                      content: (
                        <div className="space-y-3">
                          <p>
                            Analizziamo il tuo business e definiamo strategie digitali personalizzate 
                            per accelerare la crescita e ottimizzare i processi.
                          </p>
                          <Alert
                            variant="info"
                            description="Prima consulenza gratuita per valutare le tue esigenze"
                          />
                        </div>
                      )
                    },
                    {
                      id: "service-3", 
                      title: "Design & User Experience",
                      content: (
                        <p>
                          Progettiamo interfacce intuitive che migliorano l'esperienza utente 
                          e aumentano le conversioni attraverso un design centrato sull'utente.
                        </p>
                      )
                    }
                  ]}
                />
              </div>

              {/* Accordion semplice */}
              <div>
                <h3 className="font-heading text-lg font-medium mb-4">Informazioni Tecniche</h3>
                <Accordion
                  items={[
                    {
                      id: "tech-1",
                      title: "Hosting e Infrastruttura",
                      content: "Collaboriamo con i migliori provider cloud per garantire alta disponibilità, performance ottimali e sicurezza avanzata per tutti i progetti."
                    },
                    {
                      id: "tech-2",
                      title: "SEO e Performance",
                      content: "Ogni sito viene ottimizzato per i motori di ricerca e per le performance, con particolare attenzione a Core Web Vitals e accessibilità."
                    },
                    {
                      id: "tech-3",
                      title: "Sicurezza e Privacy",
                      content: "Implementiamo le migliori pratiche di sicurezza, conformità GDPR e protezione dei dati per garantire la massima protezione."
                    }
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Test Table */}
          <div className="w-full max-w-6xl space-y-8 p-8">
            <h2 className="font-heading text-2xl font-regular mb-4">Test Table Components</h2>
            
            <div className="space-y-12">
              {/* Tabella progetti */}
              <div>
                <h3 className="font-heading text-lg font-medium mb-6">Progetti Attivi</h3>
                <Table
                  headers={["Progetto", "Cliente", "Stato", "Budget", "Scadenza", "Team"]}
                  rows={[
                    ["E-commerce Fashion", "StyleCorp", "In Corso", "€25.000", "15 Mar 2024", "5 persone"],
                    ["Dashboard Analytics", "DataTech", "Completato", "€18.500", "28 Feb 2024", "3 persone"], 
                    ["App Mobile FinTech", "FinanceNext", "In Corso", "€45.000", "30 Apr 2024", "8 persone"],
                    ["Sito Corporate", "BusinessPro", "In Revisione", "€12.000", "10 Mar 2024", "2 persone"],
                    ["Piattaforma E-learning", "EduTech", "In Corso", "€32.000", "20 Mag 2024", "6 persone"],
                  ]}
                />
              </div>

              {/* Tabella performance */}
              <div>
                <h3 className="font-heading text-lg font-medium mb-6">Performance Mensile</h3>
                <Table
                  headers={["Mese", "Progetti Completati", "Fatturato", "Clienti Attivi", "Soddisfazione", "Crescita"]}
                  rows={[
                    ["Gennaio 2024", 8, "€84.000", 12, "4.8/5", "+15%"],
                    ["Febbraio 2024", 6, "€67.500", 14, "4.9/5", "+8%"],
                    ["Marzo 2024", 10, "€95.200", 16, "4.7/5", "+22%"],
                    ["Aprile 2024", 7, "€78.300", 15, "4.8/5", "+12%"],
                    ["Maggio 2024", 9, "€101.800", 18, "4.9/5", "+28%"],
                  ]}
                />
              </div>

              {/* Tabella team */}
              <div>
                <h3 className="font-heading text-lg font-medium mb-6">Team Members</h3>
                <Table
                  headers={["Nome", "Ruolo", "Esperienza", "Progetti", "Tecnologie", "Disponibilità"]}
                  rows={[
                    ["Marco Rossi", "Full Stack Developer", "5 anni", 23, "React, Node.js, AWS", "Disponibile"],
                    ["Laura Bianchi", "UX/UI Designer", "4 anni", 31, "Figma, Adobe XD, Sketch", "Occupata"],
                    ["Giuseppe Verde", "Frontend Developer", "3 anni", 18, "Vue.js, TypeScript", "Disponibile"],
                    ["Anna Neri", "Project Manager", "7 anni", 45, "Agile, Scrum, Jira", "Parzialmente"],
                    ["David Smith", "DevOps Engineer", "6 anni", 27, "Docker, Kubernetes, CI/CD", "Disponibile"],
                    ["Sofia Martini", "Backend Developer", "4 anni", 22, "Python, PostgreSQL", "Occupata"],
                  ]}
                />
              </div>

              {/* Tabella compatta - pricing */}
              <div>
                <h3 className="font-heading text-lg font-medium mb-6">Listino Prezzi Servizi</h3>
                <Table
                  headers={["Servizio", "Durata", "Prezzo", "Include"]}
                  rows={[
                    ["Sito Vetrina", "2-3 settimane", "€2.500 - €5.000", "Design, Sviluppo, SEO Base"],
                    ["E-commerce", "6-8 settimane", "€8.000 - €15.000", "Pagamenti, Inventario, Dashboard"],
                    ["Web App Custom", "3-6 mesi", "€15.000 - €50.000", "Backend, Frontend, Hosting"],
                    ["App Mobile", "4-8 mesi", "€20.000 - €60.000", "iOS, Android, API, Store"],
                    ["Consulenza UX", "1-2 settimane", "€1.500 - €3.000", "Ricerca, Wireframe, Prototipi"],
                    ["Supporto Tecnico", "Mensile", "€500 - €2.000", "Manutenzione, Backup, Monitoraggio"],
                  ]}
                />
              </div>

              {/* Tabella con dati numerici */}
              <div>
                <h3 className="font-heading text-lg font-medium mb-6">Analytics Sito Web</h3>
                <Table
                  headers={["Metrica", "Oggi", "Ieri", "7 Giorni", "30 Giorni", "Variazione"]}
                  rows={[
                    ["Visitatori Unici", 1247, 1189, 8934, 32156, "+4.9%"],
                    ["Visualizzazioni Pagina", 3891, 3654, 28457, 98234, "+6.5%"],
                    ["Tempo Medio Sessione", "3:24", "3:12", "3:18", "3:31", "+3.7%"],
                    ["Frequenza Rimbalzo", "38.2%", "41.1%", "39.8%", "40.5%", "-7.1%"],
                    ["Conversioni", 23, 19, 168, 578, "+21.1%"],
                    ["Entrate", "€2,340", "€1,890", "€16,780", "€58,920", "+23.8%"],
                  ]}
                />
              </div>
            </div>
          </div>


          {/* Test Spinner */}
          <div className="w-full max-w-md space-y-6 p-8">
            <h2 className="font-heading text-2xl font-regular mb-4">Test Spinner Components</h2>
            
            <div className="space-y-6">
              {/* Dimensioni */}
              <div className="space-y-4">
                <h3 className="font-sans text-sm font-medium text-foreground">Dimensioni:</h3>
                
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <Spinner size="sm" />
                    <span className="text-xs text-gray-500">Small</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <Spinner size="md" />
                    <span className="text-xs text-gray-500">Medium</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <Spinner size="lg" />
                    <span className="text-xs text-gray-500">Large</span>
                  </div>
                </div>
              </div>

              {/* In diversi contesti */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <h3 className="font-sans text-sm font-medium text-foreground">In diversi contesti:</h3>
                
                <div className="space-y-4">
                  {/* In bottoni */}
                  <div className="flex gap-4">
                    <Button variant="primary" disabled>
                      <Spinner size="sm" className="mr-2" />
                      Loading...
                    </Button>
                    
                    <Button variant="secondary" disabled>
                      <Spinner size="sm" className="mr-2" />
                      Saving
                    </Button>
                  </div>

                  {/* Con testo */}
                  <div className="flex items-center gap-3 text-foreground">
                    <Spinner size="sm" />
                    <span className="font-sans">Caricamento dati...</span>
                  </div>

                  {/* In card/alert */}
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center gap-3 mb-2">
                      <Spinner size="sm" className="text-blue-600" />
                      <span className="font-medium text-foreground">Processo in corso</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">
                      Il sistema sta elaborando la tua richiesta...
                    </p>
                  </div>

                  {/* Centrato */}
                  <div className="border border-gray-200 rounded-lg p-8 text-center">
                    <Spinner size="lg" className="mx-auto mb-4 text-primary" />
                    <h4 className="font-medium text-foreground mb-2">Caricamento contenuto</h4>
                    <p className="text-sm text-gray-600">Attendi mentre recuperiamo i dati...</p>
                  </div>
                </div>
              </div>

              {/* Colori personalizzati */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <h3 className="font-sans text-sm font-medium text-foreground">Colori personalizzati:</h3>
                
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <Spinner className="text-blue-500" />
                    <span className="text-xs text-gray-500">Blue</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <Spinner className="text-green-500" />
                    <span className="text-xs text-gray-500">Green</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <Spinner className="text-red-500" />
                    <span className="text-xs text-gray-500">Red</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <Spinner className="text-primary" />
                    <span className="text-xs text-gray-500">Primary</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Test Tabs */}
          <div className="w-full max-w-4xl space-y-6 p-8">
            <h2 className="font-heading text-2xl font-regular mb-4">Test Tabs Components</h2>
            
            <div className="space-y-12">
              {/* Tabs Servizi */}
              <div>
                <h3 className="font-heading text-lg font-medium mb-6">I Nostri Servizi</h3>
                <Tabs
                  defaultTabId="web-dev"
                  tabs={[
                    {
                      id: "web-dev",
                      label: "Sviluppo Web",
                      content: (
                        <div className="space-y-6">
                          <p className="font-sans text-foreground leading-relaxed">
                            Creiamo applicazioni web moderne e scalabili utilizzando le tecnologie più avanzate 
                            del settore. Dal frontend al backend, gestiamo ogni aspetto del processo di sviluppo.
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-heading font-medium mb-3">Tecnologie Frontend</h4>
                              <ul className="space-y-2 text-sm text-foreground/80">
                                <li>• React & Next.js</li>
                                <li>• TypeScript</li>
                                <li>• Tailwind CSS</li>
                                <li>• Three.js per 3D</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-heading font-medium mb-3">Tecnologie Backend</h4>
                              <ul className="space-y-2 text-sm text-foreground/80">
                                <li>• Node.js & Express</li>
                                <li>• PostgreSQL & MongoDB</li>
                                <li>• Redis per caching</li>
                                <li>• Docker & AWS</li>
                              </ul>
                            </div>
                          </div>

                          <Button 
                            variant="primary"
                            onClick={() => toast({
                              variant: "success",
                              title: "Sviluppo Web", 
                              description: "Richiesta informazioni inviata con successo"
                            })}
                          >
                            Richiedi Preventivo
                          </Button>
                        </div>
                      )
                    },
                    {
                      id: "design",
                      label: "UX/UI Design", 
                      content: (
                        <div className="space-y-6">
                          <p className="font-sans text-foreground leading-relaxed">
                            Progettiamo interfacce intuitive che migliorano l'esperienza utente e aumentano 
                            le conversioni attraverso un design centrato sull'utente e basato sui dati.
                          </p>

                          <Alert
                            variant="info"
                            title="Processo di Design"
                            description="Il nostro processo include ricerca utenti, wireframing, prototipazione e test di usabilità per garantire risultati ottimali."
                          />

                          <div className="space-y-4">
                            <h4 className="font-heading font-medium">Cosa Include:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="p-4 border border-gray-200 rounded-lg">
                                <h5 className="font-medium mb-2">Ricerca UX</h5>
                                <p className="text-sm text-foreground/70">Analisi utenti, competitor e journey mapping</p>
                              </div>
                              <div className="p-4 border border-gray-200 rounded-lg">
                                <h5 className="font-medium mb-2">Prototipazione</h5>
                                <p className="text-sm text-foreground/70">Wireframe e prototipi interattivi</p>
                              </div>
                              <div className="p-4 border border-gray-200 rounded-lg">
                                <h5 className="font-medium mb-2">Design System</h5>
                                <p className="text-sm text-foreground/70">Componenti riutilizzabili e guidelines</p>
                              </div>
                            </div>
                          </div>

                          <Button 
                            variant="primary"
                            onClick={() => toast({
                              variant: "info",
                              title: "UX/UI Design",
                              description: "Portfolio inviato alla tua email"
                            })}
                          >
                            Vedi Portfolio
                          </Button>
                        </div>
                      )
                    },
                    {
                      id: "consulting",
                      label: "Consulenza",
                      content: (
                        <div className="space-y-6">
                          <p className="font-sans text-foreground leading-relaxed">
                            Analizziamo il tuo business e definiamo strategie digitali personalizzate per 
                            accelerare la crescita e ottimizzare i processi aziendali.
                          </p>

                          <div className="bg-gray-50 p-6 rounded-lg">
                            <h4 className="font-heading font-medium mb-4">Aree di Consulenza</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <strong className="text-sm">Strategia Digitale</strong>
                                <p className="text-sm text-foreground/70 mt-1">Roadmap per la trasformazione digitale</p>
                              </div>
                              <div>
                                <strong className="text-sm">Ottimizzazione Processi</strong>
                                <p className="text-sm text-foreground/70 mt-1">Automazione e efficienza operativa</p>
                              </div>
                              <div>
                                <strong className="text-sm">Architettura Software</strong>
                                <p className="text-sm text-foreground/70 mt-1">Scalabilità e performance</p>
                              </div>
                              <div>
                                <strong className="text-sm">Sicurezza & Compliance</strong>
                                <p className="text-sm text-foreground/70 mt-1">Protezione dati e conformità</p>
                              </div>
                            </div>
                          </div>

                          <Alert
                            variant="success"
                            description="Prima consulenza gratuita di 30 minuti per valutare le tue esigenze"
                          />

                          <Button 
                            variant="primary"
                            onClick={() => toast({
                              title: "Consulenza Gratuita",
                              description: "Ti contatteremo per fissare un appuntamento"
                            })}
                          >
                            Prenota Consulenza
                          </Button>
                        </div>
                      )
                    },
                    {
                      id: "support",
                      label: "Supporto",
                      content: (
                        <div className="space-y-6">
                          <p className="font-sans text-foreground leading-relaxed">
                            Assistenza tecnica professionale 24/7 con team di esperti dedicati per mantenere 
                            i tuoi sistemi sempre operativi e performanti.
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-4 border border-gray-200 rounded-lg">
                              <h4 className="font-heading font-medium mb-2">Basic</h4>
                              <p className="text-2xl font-bold text-primary mb-2">€99/mese</p>
                              <ul className="text-sm text-left space-y-1">
                                <li>• Supporto email</li>
                                <li>• Tempo risposta: 24h</li>
                                <li>• Backup settimanali</li>
                                <li>• Monitoraggio base</li>
                              </ul>
                            </div>
                            <div className="text-center p-4 border-2 border-primary rounded-lg bg-primary/5">
                              <h4 className="font-heading font-medium mb-2">Pro</h4>
                              <p className="text-2xl font-bold text-primary mb-2">€299/mese</p>
                              <ul className="text-sm text-left space-y-1">
                                <li>• Supporto prioritario</li>
                                <li>• Tempo risposta: 4h</li>
                                <li>• Backup giornalieri</li>
                                <li>• Monitoraggio avanzato</li>
                                <li>• Aggiornamenti automatici</li>
                              </ul>
                            </div>
                            <div className="text-center p-4 border border-gray-200 rounded-lg">
                              <h4 className="font-heading font-medium mb-2">Enterprise</h4>
                              <p className="text-2xl font-bold text-primary mb-2">Custom</p>
                              <ul className="text-sm text-left space-y-1">
                                <li>• Supporto dedicato 24/7</li>
                                <li>• Tempo risposta: 1h</li>
                                <li>• Backup in tempo reale</li>
                                <li>• SLA garantito</li>
                                <li>• Consulenza inclusa</li>
                              </ul>
                            </div>
                          </div>

                          <Button 
                            variant="primary"
                            onClick={() => toast({
                              variant: "success",
                              title: "Supporto Attivato",
                              description: "Il tuo piano di supporto è stato configurato"
                            })}
                          >
                            Attiva Supporto
                          </Button>
                        </div>
                      )
                    }
                  ]}
                />
              </div>

              {/* Tabs Portfolio */}
              <div>
                <h3 className="font-heading text-lg font-medium mb-6">Portfolio Progetti</h3>
                <Tabs
                  defaultTabId="recent"
                  tabs={[
                    {
                      id: "recent",
                      label: "Recenti",
                      content: (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <Card
                            imageSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop"
                            title="E-commerce Fashion"
                            description="Piattaforma di vendita online per brand di moda con integrazione pagamenti e gestione inventario."
                            buttonText="Vedi Progetto"
                            onButtonClick={() => toast({title: "Progetto Fashion", description: "Dettagli del progetto"})}
                          />
                          <Card
                            imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop"
                            title="Dashboard Analytics"
                            description="Interfaccia di business intelligence per visualizzazione dati e reporting avanzato."
                            buttonText="Vedi Progetto"
                            onButtonClick={() => toast({title: "Dashboard Analytics", description: "Demo disponibile"})}
                          />
                        </div>
                      )
                    },
                    {
                      id: "featured",
                      label: "In Evidenza",
                      content: (
                        <div className="space-y-6">
                          <div className="text-center">
                            <h4 className="font-heading text-xl font-medium mb-4">App Mobile FinTech</h4>
                            <img 
                              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop" 
                              alt="FinTech App"
                              className="w-full max-w-2xl mx-auto rounded-lg mb-4"
                            />
                            <p className="font-sans text-foreground/80 leading-relaxed max-w-2xl mx-auto">
                              Applicazione mobile completa per gestione finanziaria personale con AI per 
                              consigli di investimento e dashboard real-time.
                            </p>
                          </div>
                          <div className="text-center">
                            <Button variant="primary">
                              Vedi Caso di Studio
                            </Button>
                          </div>
                        </div>
                      )
                    },
                    {
                      id: "web",
                      label: "Web App",
                      content: (
                        <div className="space-y-6">
                          <p className="font-sans text-foreground leading-relaxed">
                            Le nostre web application sono progettate per essere scalabili, performanti e user-friendly.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {["SaaS Platform", "Learning Management", "Healthcare Portal"].map((title, index) => (
                              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                                <h5 className="font-medium mb-2">{title}</h5>
                                <p className="text-sm text-foreground/70">Descrizione del progetto e tecnologie utilizzate.</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    }
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Test Toast */}
          <div className="w-full max-w-md space-y-6 p-8">
            <h2 className="font-heading text-2xl font-regular mb-4">Test Toast Components</h2>
            
            <div className="space-y-4">
              <Button 
                variant="primary" 
                onClick={() => toast({
                  title: "Toast di Default",
                  description: "Questo è un messaggio di notifica standard."
                })}
              >
                Toast Default
              </Button>

              <Button 
                variant="primary" 
                onClick={() => toast({
                  variant: "success",
                  title: "Operazione Riuscita!",
                  description: "I tuoi dati sono stati salvati correttamente."
                })}
              >
                Toast Success
              </Button>

              <Button 
                variant="secondary" 
                onClick={() => toast({
                  variant: "error",
                  title: "Errore",
                  description: "Si è verificato un errore durante l'operazione."
                })}
              >
                Toast Error
              </Button>

              <Button 
                variant="secondary" 
                onClick={() => toast({
                  description: "Toast senza titolo"
                })}
              >
                Toast Semplice
              </Button>

              <Button 
                variant="primary" 
                onClick={() => {
                  toast({ title: "Toast 1", description: "Primo messaggio" });
                  setTimeout(() => toast({ variant: "success", title: "Toast 2", description: "Secondo messaggio" }), 500);
                  setTimeout(() => toast({ variant: "error", title: "Toast 3", description: "Terzo messaggio" }), 1000);
                }}
              >
                Toast Multipli
              </Button>
            </div>
          </div>

          {/* Modals */}
          <Modal
            open={modalState.basic}
            onClose={() => closeModal('basic')}
          >
            <p className="font-sans text-foreground">
              Questo è un modal semplice senza titolo. Puoi chiuderlo cliccando fuori, 
              premendo ESC o usando il pulsante X.
            </p>
          </Modal>

          <Modal
            open={modalState.withTitle}
            onClose={() => closeModal('withTitle')}
            title="Modal con Titolo"
          >
            <div className="space-y-4">
              <p className="font-sans text-foreground">
                Questo modal ha un titolo nella header e dimostra la struttura completa 
                del componente.
              </p>
              <Alert
                variant="info"
                description="Puoi includere qualsiasi contenuto all'interno del modal."
              />
            </div>
          </Modal>

          <Modal
            open={modalState.form}
            onClose={() => closeModal('form')}
            title="Compila il Form"
          >
            <div className="space-y-4">
              <Input
                name="modalName"
                label="Nome"
                placeholder="Il tuo nome"
                value=""
                onChange={() => {}}
              />
              
              <Input
                name="modalEmail"
                type="email"
                label="Email"
                placeholder="la-tua@email.com"
                value=""
                onChange={() => {}}
              />
              
              <Textarea
                name="modalMessage"
                label="Messaggio"
                placeholder="Scrivi qui il tuo messaggio..."
                rows={3}
                value=""
                onChange={() => {}}
              />
              
              <div className="flex gap-3 pt-4">
                <Button variant="primary">
                  Invia
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => closeModal('form')}
                >
                  Annulla
                </Button>
              </div>
            </div>
          </Modal>

          <Modal
            open={modalState.confirmation}
            onClose={() => closeModal('confirmation')}
            title="Conferma Azione"
          >
            <div className="space-y-4">
              <Alert
                variant="warning"
                description="Questa azione non può essere annullata. Sei sicuro di voler procedere?"
              />
              
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="primary"
                  onClick={() => closeModal('confirmation')}
                >
                  Sì, Procedi
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => closeModal('confirmation')}
                >
                  Annulla
                </Button>
              </div>
            </div>
          </Modal>

          {/* Test Alert */}
          <div className="w-full max-w-2xl space-y-6 p-8">
            <h2 className="font-heading text-2xl font-regular mb-4">Test Alert Components</h2>
            
            <Alert
              variant="info"
              title="Informazione"
              description="Questo è un messaggio informativo per comunicare dettagli importanti all'utente."
            />

            <Alert
              variant="success"
              title="Operazione completata"
              description="I tuoi dati sono stati salvati correttamente nel sistema."
            />

            <Alert
              variant="warning"
              title="Attenzione richiesta"
              description="Questa azione non può essere annullata. Sei sicuro di voler procedere?"
            />

            <Alert
              variant="error"
              title="Errore di validazione"
              description="Alcuni campi contengono errori. Controlla i dati inseriti e riprova."
            />

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="font-sans text-sm font-medium text-foreground">Alert senza titolo:</h3>
              
              <Alert
                variant="info"
                description="Messaggio informativo senza titolo."
              />

              <Alert
                variant="success"
                description="Operazione riuscita!"
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="font-sans text-sm font-medium text-foreground">Solo titolo:</h3>
              
              <Alert
                variant="warning"
                title="Attenzione"
              />

              <Alert
                variant="error"
                title="Errore critico"
              />
            </div>
          </div>

          {/* Test Switch */}
          <div className="w-full max-w-md space-y-6 p-8">
            <h2 className="font-heading text-2xl font-regular mb-4">Test Switch Components</h2>
            
            <Switch
              name="basic"
              label="Switch di base"
              checked={switchValues.basic}
              onChange={handleSwitchChange("basic")}
            />

            <Switch
              name="checked"
              label="Switch già attivo"
              checked={switchValues.checked}
              onChange={handleSwitchChange("checked")}
            />

            <Switch
              name="disabled"
              label="Switch disabilitato"
              disabled
              checked={switchValues.disabled}
              onChange={handleSwitchChange("disabled")}
            />

            <Switch
              name="noLabel"
              checked={switchValues.basic}
              onChange={handleSwitchChange("basic")}
            />

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="font-sans text-sm font-medium text-foreground">Impostazioni pratiche:</h3>
              
              <Switch
                name="notifications"
                label="Notifiche push"
                checked={switchValues.notifications}
                onChange={handleSwitchChange("notifications")}
              />

              <Switch
                name="darkMode"
                label="Modalità scura"
                checked={switchValues.darkMode}
                onChange={handleSwitchChange("darkMode")}
              />

              <Switch
                name="autoSave"
                label="Salvataggio automatico"
                checked={switchValues.autoSave}
                onChange={handleSwitchChange("autoSave")}
              />
            </div>
          </div>

          {/* Test Select */}
          <div className="w-full max-w-md space-y-6 p-8">
            <h2 className="font-heading text-2xl font-regular mb-4">Test Select Components</h2>
            
            <Select
              name="basic"
              options={countryOptions}
              placeholder="Seleziona un paese (gray-400)"
              value={selectValues.basic}
              onChange={handleSelectChange("basic")}
            />

            <Select
              name="basicDark"
              options={countryOptions}
              placeholder="Seleziona un paese (gray-600)"
              variant="gray-600"
              value={selectValues.basic}
              onChange={handleSelectChange("basic")}
            />

            <Select
              name="withLabel"
              options={categoryOptions}
              placeholder="Scegli una categoria"
              label="Categoria"
              variant="gray-600"
              value={selectValues.withLabel}
              onChange={handleSelectChange("withLabel")}
            />

            <Select
              name="withError"
              options={countryOptions}
              placeholder="Seleziona un paese"
              label="Paese con Errore"
              error="Devi selezionare un paese valido"
              value={selectValues.withError}
              onChange={handleSelectChange("withError")}
            />

            <Select
              name="disabled"
              options={categoryOptions}
              label="Select Disabilitata"
              disabled
              value={selectValues.disabled}
              onChange={handleSelectChange("disabled")}
            />
          </div>

          {/* Test Textarea */}
          <div className="w-full max-w-md space-y-6 p-8">
            <h2 className="font-heading text-2xl font-regular mb-4">Test Textarea Components</h2>
            
            <Textarea
              name="basic"
              placeholder="Textarea di base"
              value={textareaValues.basic}
              onChange={handleTextareaChange("basic")}
            />

            <Textarea
              name="withLabel"
              placeholder="Scrivi il tuo messaggio..."
              label="Messaggio"
              value={textareaValues.withLabel}
              onChange={handleTextareaChange("withLabel")}
            />

            <Textarea
              name="withError"
              placeholder="Textarea con errore"
              label="Campo con Errore"
              error="Il messaggio deve essere più lungo di 10 caratteri"
              value={textareaValues.withError}
              onChange={handleTextareaChange("withError")}
            />

            <Textarea
              name="disabled"
              placeholder="Textarea disabilitata"
              label="Campo Disabilitato"
              disabled
              value={textareaValues.disabled}
              onChange={handleTextareaChange("disabled")}
            />

            <Textarea
              name="customRows"
              placeholder="Textarea con 6 righe"
              label="Textarea Personalizzata"
              rows={6}
              value={textareaValues.basic}
              onChange={handleTextareaChange("basic")}
            />
          </div>
        </div>

        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}