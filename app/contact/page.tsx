import ContactClient from './ContactClient'

export const metadata = {
  title: 'Contact — Lakive',
  description: 'Get in touch with the Lakive team.',
  alternates: { canonical: 'https://lakive.com/contact' },
}

export default function ContactPage() {
  return <ContactClient />
}
