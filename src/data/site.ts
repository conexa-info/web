// Central contact data (recovered from conexa-agency.com.ar).
export const CONTACT = {
  email: "conexa.contactos@gmail.com",
  whatsappNumber: "5491154714007",
  whatsappDisplay: "+54 9 11 5471-4007",
  siteUrl: "https://www.conexa-agency.com.ar",
};

// Official Conexa profiles. WhatsApp and email stay in CONTACT.
export const SOCIALS = {
  instagram: "https://www.instagram.com/agencyconexa",
  linkedin: "https://www.linkedin.com/company/conexa-agency/",
  founderLinkedIn: "https://www.linkedin.com/in/santino-gioveni/",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string, body = "") {
  const q = new URLSearchParams({ subject, body }).toString().replace(/\+/g, "%20");
  return `mailto:${CONTACT.email}?${q}`;
}
