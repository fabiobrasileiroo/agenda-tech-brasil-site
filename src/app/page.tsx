'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { fetchEvents } from '../utils/fetchEvents'
import { EventCard } from '@/components/EventCard'
import { EventFilters } from '@/components/EventFilters'
import { Evento, Evento2, Mese } from '@/@types/events'
import LinksWithIcons from '@/components/iconsLink'
import { SparklesTextTitle } from '@/components/TitleSparklesText'
// import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  const [events, setEvents] = useState<Evento[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Evento[]>([])
  const [selectedYear, setSelectedYear] = useState('')
  const [years, setYears] = useState<string[]>([])
  const monthRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    const loadEvents = async () => {
      const eventsData = await fetchEvents()
      setEvents(eventsData)

      const currentDate = new Date()
      const currentYear = currentDate.getFullYear().toString()
      const currentMonth = new Intl.DateTimeFormat('pt-BR', { month: 'long' })
        .format(currentDate)
        .toLowerCase()

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const availableYears = [...new Set(eventsData.map((e: any) => e.ano.toString()))]
      console.log("🚀 ~ loadEvents ~ availableYears:", availableYears)
      setYears(availableYears)
      setSelectedYear(currentYear)

      const filteredData = filterEvents(eventsData, currentYear)
      setFilteredEvents(filteredData)

      setTimeout(() => {
        scrollToCurrentMonth(currentMonth)
      }, 100)
    }

    loadEvents()
  }, [])

  const filterEvents = (eventsData: Evento[], year: string): Evento[] => {
    return eventsData
      .filter((yearData) => yearData.ano.toString() === year)
      .sort((a, b) => {
        const monthOrder = [
          'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
          'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
        ]
        return monthOrder.indexOf(a.meses[0].mes.toLowerCase()) - monthOrder.indexOf(b.meses[0].mes.toLowerCase())
      })
  }

  useEffect(() => {
    const updatedFilteredEvents = filterEvents(events, selectedYear)
    setFilteredEvents(updatedFilteredEvents)
  }, [selectedYear, events])

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


  {/* <div className="flex flex-col space-y-3">
      <Skeleton className="h-4 w-[200px]" />
      <div className="flex gap-4 flex-wrap">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      </div>
      {/* <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
      </div> /}
    </div> */}
        <EventFilters
          years={years}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
        />

        {filteredEvents.map((yearData: Evento) => (
          <div key={yearData.ano} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {yearData.ano}
            </h2>
            {yearData.meses.map((monthData: Mese, monthIndex: number) => {

              const monthColors = [
                '#f43f5e', // Janeiro - Rosa avermelhado
                '#10b981', // Fevereiro - Verde esmeralda
                '#3b82f6', // MarÃ§o - Azul vibrante
                '#a855f7', // Abril - Roxo mÃ©dio
                '#f59e0b', // Maio - Laranja dourado
                '#14b8a6', // Junho - Ciano suave
                '#ef4444', // Julho - Vermelho intenso
                '#6366f1', // Agosto - Azul pÃºrpura
                '#ec4899', // Setembro - Rosa vibrante
                '#22c55e', // Outubro - Verde vibrante
                '#2563eb', // Novembro - Azul escuro
                '#eab308', // Dezembro - Amarelo mostarda
              ];
              // Define a cor para o mÃªs atual
              const monthColor = monthColors[monthIndex % monthColors.length];

              return (
                <div
                  key={monthData.mes}
                  className="mb-6"
                  ref={(el) => (monthRefs.current[monthData.mes.toLowerCase()] = el)}
                >
                  <h3
                    className="text-xl font-semibold mb-3 capitalize"
                    style={{ color: monthColor }} // Aplica a cor especÃ­fica do mÃªs
                  >
                    {monthData.mes}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {monthData.eventos.map((event: Evento2, index: number) => (
                      <EventCard key={`${event.nome}-${index}`} event={event} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}


      </div>
      <footer className="bg-zinc-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-start text-center md:text-left gap-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex flex-row items-end gap-2">
                <h2 className="text-2xl font-semibold">Eventos Tech Brasil</h2>
                <Image
                  src="/none-background-logo.png"
                  alt="Eventos Tech Brasil Logo"
                  width={50}
                  height={50}
                />
              </div>
              <p className="mt-5">
                Sabe aquele evento de tecnologia que você procura, mas não sabe onde encontrar? Ou tem que ficar acessando N locais diferentes, buscando por eventos? Sabemos que isso é um problema, e o objetivo desse repositório é resolver isso, reunindo em um só lugar, datas e informações sobre eventos relacionados à tecnologia que acontecem no Brasil!
              </p>
              <p className="mt-4">
                Quer receber uma newsletter semanal com os eventos desse repo? <a href="https://www.linkedin.com/newsletters/agenda-tech-7235284852013494272/" className="text-primary underline">Se inscreva aqui</a>.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-semibold">Selecione o mês do Evento</h3>
              {/* <ul className="mt-4">
                <li className="mt-2">Dezembro</li>
                {/* Outros meses podem ser listados aqui /}
              </ul> */}
              <p className="mt-4">
                A Agenda Tech foi criada por <a href="https://github.com/pachicodes" className="text-primary underline">@pachicodes</a> e é mantida por ela em colaboração com <a href="https://github.com/stephan-lopes" className="text-primary underline">@stephan-lopes</a> e o site foi desevolvido pelo  <a href="https://github.com/fabiobrasileiroo" className="text-primary underline">@fabiobrasileiro</a>.
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

