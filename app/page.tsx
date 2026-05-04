import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import Multimedia from '@/components/Multimedia'
import Avatar from '@/components/Avatar'
import MonitoringTable from '@/components/MonitoringTable'
import Chatbot from '@/components/Chatbot'
import Reflection from '@/components/Reflection'
import Footer from '@/components/Footer'
import { EnableSound } from '@/components/EnableSound'

export default function HomePage() {
  return (
    <>
      <EnableSound /> {/* ✅ ВАЖНО */}
      <Nav />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Multimedia />
        <Avatar />
        <MonitoringTable />
        <Chatbot />
        <Reflection />
      </main>
      <Footer />
    </>
  )
}
