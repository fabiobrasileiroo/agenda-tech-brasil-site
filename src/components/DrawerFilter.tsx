import * as React from "react"
import { FilterIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { EventFilters } from "./EventFilters"
import { Input } from "./ui/input"
import { RainbowButtonFilter } from "./RaibowButtonFilter"


interface EventFiltersProps {
  years: string[] // Lista de anos disponíveis
  selectedYear: string // Ano atualmente selecionado
  onYearChange: (year: string) => void // Função para alterar o ano selecionado
  location: string // Localidade selecionada
  setLocation: (location: string) => void // Função para alterar a localidade
  startDate: string // Data de início selecionada
  setStartDate: (date: string) => void // Função para alterar a data de início
  endDate: string // Data de fim selecionada
  setEndDate: (date: string) => void // Função para alterar a data de fim
  mode: string // Modelo do evento (online, híbrido, presencial)
  setMode: (mode: string) => void // Função para alterar o modelo
}

export function DrawerFilter({
  years,
  selectedYear,
  onYearChange,
  location,
  setLocation,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  mode,
  setMode,
}: EventFiltersProps) {
  const eventModes = ["Online", "Híbrido", "Presencial"];

  return (
    <Drawer >
      <DrawerTrigger asChild>
        {/* <Button variant="outline" className="fixed z-10 bottom-4 right-4">
          <FilterIcon />
        </Button> */}
        <div  className="fixed z-10 bottom-4 right-4">
          <RainbowButtonFilter ></RainbowButtonFilter>;
        </div>
      </DrawerTrigger>
      <DrawerContent className="max-w-xs">
        <div className="mx-auto w-full">
          <DrawerHeader>
            <DrawerTitle className="text-lg">Filtrar</DrawerTitle>
            <DrawerDescription className="text-sm text-gray-500">
              Ajuste os filtros conforme necessário.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-2 space-y-2">
            {/* Filtro de Anos */}
            <label className="block text-sm font-medium">Ano</label>
            <EventFilters
            onYearChange={onYearChange} 
            selectedYear={selectedYear}
            years={years}
            />
            {/* <div>
              <select
                value={selectedYear}
                onChange={(e) => onYearChange(e.target.value)}
                className="w-full p-1 text-sm border rounded-md"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div> */}

            {/* Filtro de Localidade */}
            <div className="space-y-2">
              <label className="block  text-sm font-medium">Localidade</label>
              {/* <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Cidade ou estado"
                className="w-full p-1 text-sm border rounded-md"
              /> */}
               <Input type="text" placeholder="Digite o local" value={location}
                onChange={(e) => setLocation(e.target.value)}
                // placeholder="Cidade ou estado"
                className="w-full p-1 text-sm border rounded-md" />
            </div>

            {/* Filtro de Data de Início */}
            <div>
              <label className="block text-sm font-medium">Data de Início</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-1 text-sm border rounded-md"
              />
            </div>

            {/* Filtro de Data de Fim */}
            <div>
              <label className="block text-sm font-medium">Data de Fim</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-1 text-sm border rounded-md"
              />
            </div>

            {/* Filtro de Modelo */}
            <div>
              <label className="block text-sm font-medium">Modelo</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full p-1 text-sm border rounded-md"
              >
                <option value="">Todos</option>
                {eventModes.map((modeOption) => (
                  <option key={modeOption} value={modeOption.toLowerCase()}>
                    {modeOption}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DrawerFooter className="space-x-2">
            <Button className="w-full text-sm">Aplicar</Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full text-sm">
                Cancelar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
