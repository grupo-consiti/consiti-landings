// Catálogo de vacantes REALES de Grupo Consiti, agrupadas por área / departamento.
//
// Fuente: fichas de vacante para difusión entregadas por Recursos Humanos
// ("Contador General" y "Practicante de QA con Automatización e IA", sep-2026).
//
// REGLAS AL EDITAR ESTE ARCHIVO
// 1. No se publica salario ni estipendio. RR. HH. lo pidió expresamente en ambas
//    fichas: el salario del Contador no va en el arte ni en el texto, y el estipendio
//    del practicante sigue pendiente de confirmación por Gerencia. Por eso las plazas
//    llevan `highlight` (condición de contratación) en lugar de `salary`.
// 2. Nada de requisitos de edad, sexo, estado civil ni apariencia: además de alejar
//    buenos candidatos, generan riesgo legal en un anuncio de empleo.
// 3. No se nombran clientes ni proveedores de Consiti, ni cifras internas de operación.
// 4. El título de la plaza de contador se publica como "Contador General", sin
//    variantes tipo "analista financiero" (acuerdo de la reunión del 16-sep-2026).
//
// Cada vacante tiene:
//   `requirements`: lo indispensable, en líneas cortas para leer de un vistazo.
//   `note`:         las condiciones que sí necesitan explicarse (dedicación,
//                   contratación, qué suma puntos). Va debajo, en letra chica.
//   `closes`:       fecha de cierre de la convocatoria, si RR. HH. la definió (opcional).
//   `extraFields`:  las preguntas propias de esa plaza, además de los datos base.
//                   type: "text" | "number" | "select" | "textarea"

export const departments = [
  {
    id: "tecnologia",
    name: "Tecnología & Producto",
    icon: "Code",
    color: "#5216E7",
    blurb: "Construí, probá y sostené la tecnología que usan nuestros clientes todos los días.",
    vacancies: [
      {
        id: "practicante-qa-ia",
        role: "Practicante de QA con Automatización e IA",
        initials: "QA",
        modality: "Híbrido o remoto", modalityTag: "hybrid", type: "Tiempo completo o medio tiempo",
        location: "San Salvador",
        highlight: "Práctica remunerada · 3 meses",
        desc: "Práctica remunerada de 3 meses para aprender a automatizar pruebas con apoyo de IA, sobre un producto real que usan clientes. Es la puerta de entrada al equipo de QA de Consiti: quien tiene buen desempeño pasa a evaluación para incorporarse.",
        tags: ["Pruebas automatizadas", "IA aplicada a QA", "Producto real"],
        requirements: [
          "Probaste software, o estás en 4.º o 5.º año de Sistemas o afín",
          "Convertir un requerimiento en casos de prueba",
          "Python o JavaScript, nivel básico",
          "SQL, nivel básico",
          "Haber usado un asistente de IA",
          "Git, nivel básico",
          "Mínimo 20 a 25 horas semanales, por 3 meses",
        ],
        note: "No pedimos título universitario ni convenio con tu universidad: nosotros emitimos la constancia. Como se trabaja con información de clientes, no puedes tener un empleo simultáneo en otra empresa del sector. Suma automatización web o de APIs.",
        extraFields: [
          {
            name: "via", label: "¿Por cuál vía te postulas?", type: "select",
            options: [
              "Tengo experiencia probando software",
              "Estudiante de 4.º o 5.º año",
              "Ambas",
            ],
            required: true,
          },
          { name: "experiencia", label: "Tiempo probando software", type: "text", placeholder: "Ej. 1 año manual, o proyectos propios", required: true },
          { name: "lenguajes", label: "¿Python o JavaScript? Dinos tu nivel", type: "text", placeholder: "Ej. Python básico, JS intermedio", required: true },
          { name: "sql", label: "Nivel de SQL", type: "select", options: ["Básico", "Intermedio", "Avanzado", "Ninguno"], required: true },
          { name: "ia", label: "¿Qué asistente de IA has usado y para qué?", type: "text", placeholder: "Ej. Claude o ChatGPT para generar casos de prueba" },
          { name: "automatizacion", label: "¿Automatización web o de APIs? (suma puntos)", type: "text", placeholder: "Selenium, Playwright, Cypress, Postman…" },
          {
            name: "disponibilidad", label: "Disponibilidad semanal", type: "select",
            options: ["Tiempo completo", "30 a 40 horas", "25 a 30 horas", "20 a 25 horas", "Menos de 20 horas"],
            required: true,
          },
          {
            name: "exclusividad",
            label: "¿Puedes dedicarte a la práctica sin un empleo simultáneo en otra empresa del sector?",
            type: "select", options: ["Sí", "No"], required: true,
          },
        ],
      },
      {
        id: "practicante-infra-cloud",
        role: "Practicante de Infraestructura Cloud",
        initials: "IC",
        modality: "Híbrido o remoto", modalityTag: "hybrid", type: "Tiempo completo o medio tiempo",
        location: "San Salvador",
        highlight: "Práctica remunerada · 3 meses",
        closes: "viernes 9 de octubre",
        desc: "Práctica remunerada de 3 meses para configurar servidores, redes y servicios en la nube que ya están en producción con clientes: monitoreo, respaldos y automatización. Es la puerta de entrada al equipo de Infraestructura de Consiti.",
        tags: ["Servidores y nube", "Monitoreo y respaldos", "Automatización con scripts"],
        requirements: [
          "4.º o 5.º año de Sistemas, Redes, Computación o afín",
          "Redes: TCP/IP, DNS y firewalls",
          "Linux y Windows Server, nivel básico",
          "Nociones de nube: AWS, Azure o GCP",
          "Scripting en Bash, PowerShell o Python",
          "Inglés técnico de lectura",
          "Mínimo 20 a 25 horas semanales, por 3 meses",
        ],
        note: "No pedimos experiencia laboral ni convenio con tu universidad: cuentan tus laboratorios y tu homelab, y nosotros emitimos la constancia. Como se trabaja con servidores y datos de clientes, no puedes tener un empleo simultáneo en otra empresa del sector. Suma AZ-900, AWS Cloud Practitioner, Docker, Git o Terraform.",
        extraFields: [
          { name: "carrera", label: "Carrera y año que cursas", type: "text", placeholder: "Ej. Ing. en Sistemas, 5.º año", required: true },
          { name: "redes", label: "Tu nivel en redes (TCP/IP, DNS, firewalls)", type: "select", options: ["Básico", "Intermedio", "Avanzado"], required: true },
          { name: "sistemas", label: "¿Linux, Windows Server o ambos? Dinos tu nivel", type: "text", placeholder: "Ej. Linux intermedio, Windows Server básico", required: true },
          { name: "nube", label: "¿Con qué nube has tenido contacto?", type: "select", options: ["AWS", "Azure", "Google Cloud", "Más de una", "Todavía ninguna"], required: true },
          { name: "scripting", label: "¿Scripting? ¿En qué lenguaje?", type: "text", placeholder: "Bash, PowerShell, Python…" },
          { name: "ingles", label: "Inglés técnico de lectura", type: "select", options: ["Leo documentación sin problema", "Leo con ayuda de traductor", "Todavía no"], required: true },
          { name: "extras", label: "Certificaciones o herramientas (suma puntos)", type: "text", placeholder: "AZ-900, AWS Cloud Practitioner, Docker, Git, Terraform…" },
          {
            name: "disponibilidad", label: "Disponibilidad semanal", type: "select",
            options: ["Tiempo completo", "30 a 40 horas", "25 a 30 horas", "20 a 25 horas", "Menos de 20 horas"],
            required: true,
          },
          {
            name: "exclusividad",
            label: "¿Puedes dedicarte a la práctica sin un empleo simultáneo en otra empresa del sector?",
            type: "select", options: ["Sí", "No"], required: true,
          },
        ],
      },
    ],
  },
  {
    id: "ventas",
    name: "Ventas & Comercial",
    icon: "Rocket",
    color: "#12B886",
    blurb: "Lleva nuestras soluciones de IA al cliente que las necesita.",
    vacancies: [
      {
        id: "vendedor-freelance-b2b",
        role: "Vendedor/a Freelance B2B",
        initials: "VF",
        modality: "Remoto", modalityTag: "remote", type: "Freelance · Lunes a sábado",
        location: "Toda Latinoamérica",
        highlight: "Base + comisión",
        desc: "Vende las soluciones de Grupo Consiti a cliente final con método B2B: Factura IA, Vendi y Komandi. Prospectas, manejas objeciones y cierras, con sueldo base más comisión y una semana de capacitación intensiva para arrancar.",
        tags: ["Factura IA", "Vendi", "Komandi"],
        requirements: [
          "Experiencia comprobable en ventas B2B",
          "Experiencia en atención al cliente",
          "Manejo de CRM y conocimiento de Odoo ERP",
          "Buen manejo de metas y de objeciones",
          "Laptop propia e internet estable en casa",
          "Micrófono o audífonos de buena calidad",
          "Disponibilidad inmediata, de lunes a sábado",
        ],
        note: "Horario de lunes a sábado, de 8:30 a 5:30. Trabajas por tu cuenta, pero no solo: arrancas con una semana de capacitación intensiva y te quedas con manuales, videos y material de apoyo. El esquema es sueldo base más comisión por venta, y la posición está abierta a toda Latinoamérica.",
        extraFields: [
          { name: "experiencia", label: "Años vendiendo a empresas (B2B)", type: "number", required: true },
          { name: "queVendiste", label: "¿Qué has vendido y a qué tipo de empresa?", type: "text", placeholder: "Ej. software contable a pymes de retail", required: true },
          { name: "crm", label: "CRM que has manejado", type: "text", placeholder: "HubSpot, Odoo, Salesforce, Zoho…", required: true },
          { name: "odoo", label: "¿Has trabajado con Odoo?", type: "select", options: ["Sí, lo he usado", "Lo conozco por encima", "Todavía no"], required: true },
          { name: "meta", label: "La meta de ventas más alta que has cumplido", type: "text", placeholder: "Ej. $15,000 al mes en software", required: true },
          { name: "objecion", label: "Te dicen “está muy caro”. ¿Qué respondes?", type: "textarea", placeholder: "Contesta como lo harías con un cliente real." },
          {
            name: "equipo", label: "¿Tienes laptop, internet estable y micrófono o audífonos?",
            type: "select", options: ["Sí, las tres cosas", "Me falta alguna"], required: true,
          },
          {
            name: "disponibilidad", label: "¿Cuándo podrías empezar?",
            type: "select", options: ["De inmediato", "En dos semanas", "En un mes", "Más adelante"], required: true,
          },
        ],
      },
    ],
  },
  {
    id: "administracion",
    name: "Administración & Finanzas",
    icon: "Sheet",
    color: "#350E96",
    blurb: "El orden de la casa: contabilidad, cumplimiento tributario y control.",
    vacancies: [
      {
        id: "contador-general",
        role: "Contador General",
        initials: "CG",
        modality: "Presencial", modalityTag: "onsite", type: "Tiempo completo",
        location: "San Salvador",
        highlight: "Prestaciones de ley",
        desc: "Lleva la contabilidad completa de Grupo Consiti: facturación electrónica (DTE), cierre mensual, estados financieros y cumplimiento tributario. Trabajo directo con Dirección: los números que produces se usan para decidir.",
        tags: ["Contabilidad completa", "Facturación electrónica (DTE)", "Cierre mensual"],
        requirements: [
          "Licenciatura en Contaduría Pública, o últimos años con sello",
          "2 años llevando contabilidad completa",
          "Inscripción vigente en el CVPCPA",
          "Facturación electrónica (DTE) en El Salvador",
          "ERP contable, idealmente Odoo",
          "Excel avanzado",
          "Residir en San Salvador o alrededores",
        ],
        note: "Plaza presencial, de lunes a viernes. Los primeros 3 meses son por servicios profesionales; después, contrato por tiempo indefinido con prestaciones de ley.",
        extraFields: [
          {
            name: "formacion", label: "Tu formación en Contaduría Pública", type: "select",
            options: [
              "Licenciado/a graduado/a",
              "Estudiante de los últimos años, con sello",
              "Estudiante sin sello",
              "Otra carrera",
            ],
            required: true,
          },
          { name: "cvpcpa", label: "¿Inscripción vigente en el CVPCPA?", type: "select", options: ["Sí, vigente", "En trámite", "No"], required: true },
          { name: "experiencia", label: "Años llevando contabilidad completa", type: "number", required: true },
          { name: "dte", label: "¿Has operado facturación electrónica (DTE) en El Salvador?", type: "select", options: ["Sí", "No"], required: true },
          { name: "erp", label: "ERP contable que manejas", type: "text", placeholder: "Odoo, SAP, QuickBooks, Mónica…", required: true },
          { name: "excel", label: "Nivel de Excel", type: "select", options: ["Básico", "Intermedio", "Avanzado"], required: true },
          { name: "residencia", label: "¿Vives en San Salvador o alrededores?", type: "select", options: ["Sí", "No"], required: true },
        ],
      },
    ],
  },
];

// Lista plana (por si se necesita).
export const allVacancies = departments.flatMap((d) =>
  d.vacancies.map((v) => ({ ...v, departamento: d.name, deptId: d.id, deptColor: d.color }))
);
