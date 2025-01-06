'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { fetchEvents } from '../utils/fetchEvents'
import { EventCard } from '@/components/EventCard'
import { Evento, Evento2, Mese } from '@/@types/events'
import LinksWithIcons from '@/components/iconsLink'
import { SparklesTextTitle } from '@/components/TitleSparklesText'
import { DrawerFilter } from '@/components/DrawerFilter'

export default function Home() {
  const [events, setEvents] = useState<Evento[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Evento[]>([])
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [years, setYears] = useState<string[]>([])
  const [location, setLocation] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [mode, setMode] = useState<string>('')

  const monthRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    const loadEvents = async () => {
      const eventsData = await fetchEvents()
      setEvents(eventsData)

      const currentYear = new Date().getFullYear().toString()
      const availableYears = [...new Set(eventsData.map((e) => e.ano.toString()))]

      setYears(availableYears)
      setSelectedYear(currentYear)

      filterEvents(eventsData, currentYear)
    }

    loadEvents()
  }, [])

  const filterEvents = (eventsData: Evento[], currentYear: string) => {
    const filtered = events.filter((event) => {
      // Filtro por ano
      if (selectedYear && event.ano.toString() !== selectedYear) return false

      // Filtro por localidade
      if (location && !event.localidade?.toLowerCase().includes(location.toLowerCase())) return false

      // Filtro por datas
      const eventStartDate = new Date(event.dataInicio)
      const eventEndDate = new Date(event.dataFim)
      if (startDate && eventStartDate < new Date(startDate)) return false
      if (endDate && eventEndDate > new Date(endDate)) return false

      // Filtro por modelo
      if (mode && event.modelo.toLowerCase() !== mode.toLowerCase()) return false

      return true
    })
    setFilteredEvents(filtered)
  }

  useEffect(() => {
    // filterEvents()
    filterEvents(events, selectedYear || new Date().getFullYear().toString());
  }, [selectedYear, location, startDate, endDate, mode, events])

  const scrollToCurrentMonth = (currentMonth: string): void => {
    const monthElement = monthRefs.current[currentMonth]
    if (monthElement) {
      monthElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo.png"
            alt="Abacatinhos.dev Logo"
            width={150}
            height={150}
            className="mb-4 rounded-full"
          />
          <SparklesTextTitle />
        </div>

        {/* Filtros */}
        <DrawerFilter

          // month={month}
          years={years}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          location={location}
          setLocation={setLocation}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          mode={mode}
          setMode={setMode}
        />

        {/* Eventos Filtrados */}
        {filteredEvents.map((yearData: Evento) => (
          <div key={yearData.ano} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {yearData.ano}
            </h2>
            {yearData.meses.map((monthData: Mese, monthIndex: number) => {
              const monthColors = [
                '#f43f5e', '#10b981', '#3b82f6', '#a855f7',
                '#f59e0b', '#14b8a6', '#ef4444', '#6366f1',
                '#ec4899', '#22c55e', '#2563eb', '#eab308',
              ]
              const monthColor = monthColors[monthIndex % monthColors.length]

              return (
                <div
                  key={monthData.mes}
                  className="mb-8"
                  // ref={(el) => (monthRefs.current[monthData.mes.toLowerCase()] = el)}
                  ref={(el) => {
                    monthRefs.current[monthData.mes.toLowerCase()] = el;
                  }}

                >
                  <h3
                    className="text-xl font-semibold mb-8 capitalize"
                    style={{ color: monthColor }}
                  >
                    {monthData.mes}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {monthData.eventos.map((event: Evento2, index: number) => (
                      <EventCard key={`${event.nome}-${index}`} event={event} month={monthData.mes} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-start text-center md:text-left gap-8">
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-2xl font-semibold">Eventos Tech Brasil</h2>
              <p className="mt-5">
                Sabe aquele evento de tecnologia que você procura, mas não sabe onde encontrar? Este site reúne em um só lugar informações sobre eventos de tecnologia no Brasil!
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-semibold">Mais Informações</h3>
              <p className="mt-4">
                Criado por <a href="https://github.com/pachicodes" className="text-primary underline">@pachicodes</a> e mantido por colaboradores como <a href="https://github.com/stephan-lopes" className="text-primary underline">@stephan-lopes </a>
                e website foi desevolvido pelo 
                <a href="https://github.com/fabiobrasileiroo" className="text-primary underline">
                   fabiobrasileiroo
                </a>
              </p>
            </div>
          </div>
          <LinksWithIcons />
          <div className="mt-8 text-center text-sm text-gray-400">
            Feito com 💚 por Eventos Tech Brasil
          </div>
        </div>
      </footer>
    </div>
  )
}
