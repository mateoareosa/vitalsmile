'use client';

import React, { useState, useEffect } from 'react';

// --- Icons (Inline SVGs) ---
const Icons = {
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  Tooth: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.2 12.5C4 11 4 9 6 6c2-3 5-4 8-1 2 2 4 4 4 6 0 5-6 9-6 9s-6-4-7.8-7.5Z" /><path d="M12 21a11 11 0 0 1-2-11" /></svg>,
  Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  MapPin: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>,
  Clock: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  Menu: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>,
  Loader: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>,
  Quote: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-sky-200"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V3H19.017C20.6739 3 22.017 4.34315 22.017 6V15C22.017 16.6569 20.6739 18 19.017 18H16.017V21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 7.55228 5.0166 7V3H10.0166C11.6735 3 13.0166 4.34315 13.0166 6V15C13.0166 16.6569 11.6735 18 10.0166 18H7.0166V21H5.0166Z" /></svg>,
  Alert: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
};

// --- Navbar Component ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2 text-sky-600 group">
          <Icons.Tooth />
          <span className="text-2xl font-bold text-slate-800 tracking-tight">Vital<span className="text-sky-500">Smile</span></span>
        </a>

        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <a href="#inicio" className="hover:text-sky-600 transition-colors">Inicio</a>
          <a href="#tratamientos" className="hover:text-sky-600 transition-colors">Tratamientos</a>
          <a href="#equipo" className="hover:text-sky-600 transition-colors">Especialistas</a>
          <a href="#pacientes" className="hover:text-sky-600 transition-colors">Pacientes</a>
        </div>

        <div className="hidden md:flex">
          <a href="#agenda" className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-sky-500/20 transition-all flex items-center gap-2 transform hover:scale-105">
            <Icons.Calendar />
            <span>Agendar Turno</span>
          </a>
        </div>

        <button className="md:hidden text-slate-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <Icons.X /> : <Icons.Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 p-4 shadow-xl flex flex-col gap-4 animate-fade-in">
          <a href="#inicio" className="text-slate-600 font-medium p-2" onClick={() => setIsOpen(false)}>Inicio</a>
          <a href="#tratamientos" className="text-slate-600 font-medium p-2" onClick={() => setIsOpen(false)}>Tratamientos</a>
          <a href="#equipo" className="text-slate-600 font-medium p-2" onClick={() => setIsOpen(false)}>Especialistas</a>
          <a href="#agenda" className="bg-sky-500 text-white px-4 py-3 rounded-xl text-center font-bold" onClick={() => setIsOpen(false)}>Agendar Turno</a>
        </div>
      )}
    </nav>
  );
};

// --- Hero Component ---
const Hero = () => (
  <section id="inicio" className="relative pt-20 pb-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
    <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8 z-10">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-sm font-semibold tracking-wide animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          Nueva Tecnología 3D Disponible
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-[1.1] animate-fade-in-up delay-100">
          Cuidamos tu sonrisa con <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-teal-400">excelencia médica.</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-lg leading-relaxed animate-fade-in-up delay-200">
          Experiencia odontológica sin dolor, enfocada en la estética y salud a largo plazo. Tu bienestar es nuestra prioridad.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
          <a href="#agenda" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-black transition-all flex justify-center items-center gap-2">
            Reservar Cita Online
            <Icons.ChevronRight />
          </a>
          <a href="#tratamientos" className="px-8 py-4 rounded-xl font-semibold text-lg text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all text-center">
            Ver Tratamientos
          </a>
        </div>
      </div>
      <div className="relative animate-fade-in delay-500">
        <div className="aspect-[4/5] md:aspect-square bg-sky-100 rounded-[2.5rem] overflow-hidden relative shadow-2xl transform hover:scale-[1.01] transition-transform duration-500">
          <img src="https://placehold.co/800x800/sky/white?text=Foto+Doctora+Paciente" alt="Doctora atendiendo" className="w-full h-full object-cover mix-blend-multiply opacity-90" />
        </div>
      </div>
    </div>
  </section>
);

// --- Services Component ---
const Services = () => (
  <section id="tratamientos" className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-sky-500 font-semibold tracking-wider uppercase text-sm">Nuestros Servicios</span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">Especialidades Médicas</h2>
        <p className="text-slate-600 text-lg">Un enfoque integral para cada etapa de tu salud bucal, con tecnología de vanguardia.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: "Implantes Dentales", desc: "Soluciones definitivas con materiales de titanio biocompatible para recuperar tu masticación." },
          { title: "Ortodoncia Invisible", desc: "Alineadores transparentes (Invisalign) para corregir tu sonrisa discretamente y sin dolor." },
          { title: "Estética Dental", desc: "Diseño de sonrisa digital, carillas de porcelana y blanqueamiento láser." },
          { title: "Odontopediatría", desc: "Atención especializada y amigable para niños y adolescentes." },
          { title: "Endodoncia", desc: "Tratamientos de conducto con microscopía para salvar tu diente natural." },
          { title: "Urgencias 24hs", desc: "Guardia activa para dolor agudo, infecciones o traumatismos dentales." }
        ].map((item, idx) => (
          <div key={idx} className="group p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-sky-100 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300">
            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icons.Tooth />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
            <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <a href="#agenda" className="text-sky-600 text-sm font-semibold hover:underline flex items-center gap-1">
                Solicitar turno <Icons.ChevronRight />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Doctors Data & Components ---
interface Doctor {
  id: number;
  name: string;
  role: string;
  img: string;
  bio: string;
  matricula: string;
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dra. Ana Martínez",
    role: "Directora Médica & Estética",
    img: "https://placehold.co/400x500/dbeafe/1e40af?text=Dra.+Ana",
    matricula: "M.N. 12345",
    bio: "Especialista en diseño de sonrisas digitales con más de 15 años de experiencia. Posgrado en Estética Dental en la Universidad de Nueva York."
  },
  {
    id: 2,
    name: "Dr. Carlos Ruiz",
    role: "Implantología y Cirugía",
    img: "https://placehold.co/400x500/e0e7ff/3730a3?text=Dr.+Carlos",
    matricula: "M.N. 67890",
    bio: "Cirujano maxilofacial experto en implantes complejos y regeneración ósea. Pionero en técnicas mínimamente invasivas en Argentina."
  },
  {
    id: 3,
    name: "Dra. Laura Gómez",
    role: "Ortodoncia Invisible",
    img: "https://placehold.co/400x500/fce7f3/be185d?text=Dra.+Laura",
    matricula: "M.N. 11223",
    bio: "Master en Ortodoncia y Ortopedia. Certificada en Invisalign Diamond Provider. Apasionada por transformar sonrisas en niños y adultos."
  },
];

const Team = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  return (
    <section id="equipo" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Conoce a nuestros especialistas</h2>
          <p className="text-slate-600">Haz clic en nuestros profesionales para ver su trayectoria.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {doctors.map((doc) => (
            <div key={doc.id} className="text-center group cursor-pointer" onClick={() => setSelectedDoctor(doc)}>
              <div className="relative mb-6 rounded-3xl overflow-hidden shadow-lg mx-auto max-w-xs aspect-[4/5] bg-slate-100">
                <img src={doc.img} alt={doc.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  <span className="text-white bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-full text-sm font-medium">Ver Biografía</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">{doc.name}</h3>
              <p className="text-sky-500 font-medium">{doc.role}</p>
            </div>
          ))}
        </div>

        {/* Doctor Modal */}
        {selectedDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full relative shadow-2xl flex flex-col md:flex-row gap-8">
              <button onClick={() => setSelectedDoctor(null)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200">
                <Icons.X />
              </button>
              <div className="w-full md:w-1/3">
                <img src={selectedDoctor.img} className="w-full h-auto rounded-2xl shadow-md" alt={selectedDoctor.name} />
              </div>
              <div className="w-full md:w-2/3 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedDoctor.name}</h3>
                  <p className="text-sky-600 font-medium">{selectedDoctor.role}</p>
                  <p className="text-xs text-slate-400 mt-1">{selectedDoctor.matricula}</p>
                </div>
                <hr className="border-slate-100" />
                <p className="text-slate-600 leading-relaxed">{selectedDoctor.bio}</p>
                <button onClick={() => setSelectedDoctor(null)} className="mt-4 bg-sky-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-sky-600 transition-colors">
                  Cerrar Ficha
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// --- Testimonials Carousel ---
const Testimonials = () => {
  const reviews = [
    { name: "Sofía Herrera", text: "Increíble la atención. Me hice un tratamiento de conducto y no sentí absolutamente nada de dolor. ¡Súper recomendados!", stars: 5 },
    { name: "Miguel Ángel", text: "Llevo a mis hijos desde hace 3 años y los adoran. La paciencia de la Dra. Gómez es única. Gracias por todo.", stars: 5 },
    { name: "Lucía P.", text: "Me hice el diseño de sonrisa y el resultado superó mis expectativas. Ahora sonrío en todas las fotos.", stars: 5 },
  ];
  const [current, setCurrent] = useState(0);

  const nextReview = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section id="pacientes" className="py-24 bg-sky-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Lo que dicen nuestros pacientes</h2>
        </div>
        <div className="max-w-4xl mx-auto relative bg-white p-12 rounded-[3rem] shadow-xl transition-all duration-300">
          <div className="absolute top-8 left-8 text-sky-200 opacity-50"><Icons.Quote /></div>

          <div className="text-center space-y-6 animate-fade-in">
            <div className="flex justify-center gap-1 text-yellow-400">
              {[...Array(reviews[current].stars)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <p className="text-xl md:text-2xl text-slate-600 font-medium italic">"{reviews[current].text}"</p>
            <p className="font-bold text-slate-900 text-lg">- {reviews[current].name}</p>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prevReview} className="p-2 rounded-full bg-slate-100 hover:bg-sky-100 text-slate-600 hover:text-sky-600 transition-colors"><Icons.ChevronLeft /></button>
            <button onClick={nextReview} className="p-2 rounded-full bg-slate-100 hover:bg-sky-100 text-slate-600 hover:text-sky-600 transition-colors"><Icons.ChevronRight /></button>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- FULL CALENDAR COMPONENT ---
const AppointmentSection = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Helpers
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  // Fecha actual navegada (Estado del calendario)
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Fecha real (HOY) - "Single Source of Truth" para bloqueos
  const todayObj = new Date();
  // Limpiamos horas para comparar solo fechas
  const todayClean = new Date(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate());

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const emptySlots = Array.from({ length: firstDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const changeMonth = (increment: number) => {
    const newDate = new Date(year, month + increment, 1);
    // SEGURIDAD: No permitir navegar a meses pasados
    if (newDate < new Date(todayObj.getFullYear(), todayObj.getMonth(), 1)) return;
    setCurrentDate(newDate);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) return;
    setStatus('loading');
    setTimeout(() => setStatus('success'), 2000);
  };

  const allTimes = ["09:30", "10:15", "11:00", "14:30", "15:45", "17:00"];

  // Filtrado de horarios: Si es HOY, filtrar horas pasadas
  const availableTimes = allTimes.filter(time => {
    // Si no es hoy, mostramos todo
    if (year !== todayObj.getFullYear() || month !== todayObj.getMonth() || selectedDate !== todayObj.getDate()) return true;

    // Si es hoy, comparamos hora actual
    const [h, m] = time.split(':').map(Number);
    const now = new Date();
    const slotDate = new Date();
    slotDate.setHours(h, m, 0);
    return slotDate > now;
  });

  return (
    <section id="agenda" className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold mb-6">Agenda tu visita online</h2>
            <p className="text-slate-400 text-lg">
              Selecciona el día y horario en nuestro calendario en tiempo real.
            </p>
            <div className="space-y-6">
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <h4 className="font-bold mb-2 flex items-center gap-2"><Icons.MapPin /> Consultorio Central</h4>
                <p className="text-slate-400 text-sm">Av. Colón 5000, Córdoba Capital.</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <h4 className="font-bold mb-2 flex items-center gap-2"><Icons.Phone /> Contacto Directo</h4>
                <p className="text-slate-400 text-sm">¿Urgencias? Llámanos al (351) 155-1234</p>
              </div>
            </div>
          </div>

          {/* Interactive Widget */}
          <div className="bg-white rounded-2xl p-6 md:p-8 text-slate-900 shadow-2xl shadow-sky-900/50 min-h-[550px] flex flex-col relative overflow-hidden">

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full animate-fade-in-up">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <Icons.Check />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">¡Turno Confirmado!</h3>
                <p className="text-slate-500 text-center mb-6">
                  Fecha: {selectedDate} de {monthNames[month]}<br />
                  Hora: {selectedTime} hs.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setSelectedDate(null); setSelectedTime(null); }}
                  className="text-sky-600 font-semibold hover:underline"
                >
                  Agendar otro turno
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                  <h3 className="font-bold text-lg">Selecciona un horario</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => changeMonth(-1)}
                      className={`p-1 rounded ${month === todayObj.getMonth() && year === todayObj.getFullYear() ? 'text-slate-300 cursor-not-allowed' : 'hover:bg-slate-100'}`}
                      disabled={month === todayObj.getMonth() && year === todayObj.getFullYear()}
                    >
                      <Icons.ChevronLeft />
                    </button>
                    <span className="font-medium w-32 text-center select-none">{monthNames[month]} {year}</span>
                    <button onClick={() => changeMonth(1)} className="p-1 hover:bg-slate-100 rounded"><Icons.ChevronRight /></button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="mb-6">
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-2 select-none">
                    <span>Do</span><span>Lu</span><span>Ma</span><span>Mi</span><span>Ju</span><span>Vi</span><span>Sa</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {emptySlots.map(slot => <div key={`empty-${slot}`} />)}
                    {days.map((day) => {
                      // Crear fecha de este botón
                      const dateOfButton = new Date(year, month, day);
                      // Día de la semana (0 = Domingo)
                      const dayOfWeek = dateOfButton.getDay();

                      // VALIDACIONES:
                      // 1. Es pasado?
                      const isPast = dateOfButton < todayClean;
                      // 2. Es Domingo?
                      const isSunday = dayOfWeek === 0;
                      // 3. Es Hoy?
                      const isToday = day === todayObj.getDate() && month === todayObj.getMonth() && year === todayObj.getFullYear();

                      const isDisabled = isPast || isSunday;
                      const isSelected = selectedDate === day;

                      return (
                        <button
                          key={day}
                          disabled={isDisabled}
                          onClick={() => { setSelectedDate(day); setSelectedTime(null); }}
                          className={`
                            p-2 rounded-lg text-sm font-medium transition-all relative
                            ${isSelected
                              ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/30 transform scale-105 z-10'
                              : isToday
                                ? 'bg-sky-50 text-sky-600 ring-1 ring-sky-500 font-bold'
                                : isDisabled
                                  ? 'text-slate-300 bg-slate-50 cursor-not-allowed' // Estilo deshabilitado
                                  : 'bg-slate-50 hover:bg-sky-50 text-slate-600 hover:text-sky-600'
                            }
                          `}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div className={`space-y-3 transition-all duration-300 ${selectedDate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none absolute bottom-0'}`}>
                  <p className="text-sm font-medium text-slate-700">
                    {availableTimes.length > 0
                      ? `Horarios para el día ${selectedDate}:`
                      : "No quedan horarios disponibles hoy."}
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 border rounded-lg text-sm font-semibold transition-all ${selectedTime === time
                            ? 'border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-200'
                            : 'border-slate-200 text-slate-600 hover:border-sky-300'
                          }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-8">
                  <button
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime || status === 'loading'}
                    className={`w-full py-3 rounded-xl font-bold transition-all shadow-lg flex justify-center items-center gap-2 ${!selectedDate || !selectedTime
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-sky-600 hover:bg-sky-700 text-white'
                      }`}
                  >
                    {status === 'loading' ? <><Icons.Loader /> Procesando...</> : "Confirmar Turno"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Contact Form with Validation ---
const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState({ name: '', phone: '', message: '' });

  const validate = () => {
    const newErrors = { name: '', phone: '', message: '' };
    let isValid = true;

    // Validación Nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio.';
      isValid = false;
    } else if (formData.name.length < 3) {
      newErrors.name = 'El nombre es muy corto.';
      isValid = false;
    }

    // Validación Teléfono (Solo números, min 7 dígitos)
    const phoneRegex = /^[0-9]{7,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio.';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) { // Elimina no-dígitos antes de testear
      newErrors.phone = 'Ingresa un número válido (mín. 7 dígitos).';
      isValid = false;
    }

    // Validación Mensaje
    if (!formData.message.trim()) {
      newErrors.message = 'Por favor escribe tu consulta.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return; // Detener si hay errores

    setStatus('loading');
    // Simular envío
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', phone: '', message: '' }); // Reset form
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error cuando el usuario escribe
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
          {status === 'success' ? (
            <div className="text-center py-10 animate-fade-in">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><Icons.Check /></div>
              <h3 className="text-2xl font-bold mb-2">¡Mensaje Enviado!</h3>
              <p className="text-slate-500 mb-6">Gracias por contactarnos, {formData.name || 'te responderemos pronto'}.</p>
              <button onClick={() => setStatus('idle')} className="text-sky-600 font-bold underline">Enviar otro</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900">Contacto Rápido</h2>
                <p className="text-slate-500">Respondemos en menos de 2 horas.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nombre Completo"
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none transition-colors ${errors.name ? 'border-red-300 bg-red-50 focus:border-red-500' : 'border-slate-200 focus:border-sky-500'}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs flex items-center gap-1 ml-1"><Icons.Alert /> {errors.name}</p>}
                </div>
                <div className="space-y-1">
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Teléfono (Solo números)"
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none transition-colors ${errors.phone ? 'border-red-300 bg-red-50 focus:border-red-500' : 'border-slate-200 focus:border-sky-500'}`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs flex items-center gap-1 ml-1"><Icons.Alert /> {errors.phone}</p>}
                </div>
              </div>
              <div className="space-y-1">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="¿En qué podemos ayudarte?"
                  className={`w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none transition-colors h-32 resize-none ${errors.message ? 'border-red-300 bg-red-50 focus:border-red-500' : 'border-slate-200 focus:border-sky-500'}`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs flex items-center gap-1 ml-1"><Icons.Alert /> {errors.message}</p>}
              </div>
              <button disabled={status === 'loading'} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all flex justify-center items-center gap-2">
                {status === 'loading' ? <Icons.Loader /> : "Enviar Mensaje"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

const Footer = () => (
  <footer className="bg-white border-t border-slate-200 py-12 text-center">
    <p className="text-slate-500">© 2024 VitalSmile Clínica Dental. Córdoba, Argentina.</p>
  </footer>
);

export default function Home() {
  return (
    <main className="font-sans antialiased text-slate-600 bg-white scroll-smooth">
      <Navbar />
      <Hero />
      <Services />
      <Team />
      <AppointmentSection />
      <Testimonials />
      <ContactForm />
      <Footer />
    </main>
  );
}