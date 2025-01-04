export interface Root {
  eventos: Evento[]
  tba: Tba[]
}

export interface Evento {
  ano: number
  arquivado: boolean
  meses: Mese[]
}

export interface Mese {
  mes: string
  arquivado: boolean
  eventos: Evento2[]
}

export interface Evento2 {
  nome: string
  data: string[]
  url: string
  cidade: string
  uf: string
  tipo: string
}

export interface Tba {
  nome: string
  url: string
  cidade: string
  uf: string
  tipo: string
}
