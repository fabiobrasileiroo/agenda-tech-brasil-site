import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, MapPinIcon, ExternalLinkIcon } from 'lucide-react'
import EventBadge from "./EventBadge";

interface Event {
  nome: string;
  data: string[];
  url: string;
  cidade: string;
  uf: string;
  tipo: string;
}

const getBadgeColor = (tipo: string) => {
  switch (tipo) {
    case "presencial":
      return "bg-sky-600/80"; 
    case "híbrido":
      return "bg-purple-900/80";
    case "online":
      return "bg-orange-500/90"; 
    default:
      return "bg-background/20"; // Cor padrÃ£o
  }
};

export function EventCard({ event }: { event: Event }) {
  const formattedDate = event.data.length > 1
    ? `${event.data[0]} - ${event.data[event.data.length - 1]}`
    : event.data[0];

  const location = event.cidade && event.uf
    ? `${event.cidade}, ${event.uf}`
    : "Sem informação de local";

  return (
    <Card className="w-full hover:shadow-lg transition-shadow overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground p-4">
        <CardTitle className="text-lg font-bold line-clamp-2">{event.nome}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-primary" />
            <span className="text-sm">{formattedDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPinIcon className="h-4 w-4 text-primary" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center space-x-2">
            {/* <span className="text-xs font-semibold px-2 py-1 bg-sky-600/80 text-primary rounded-full">
              {event.tipo}
            </span> */}
            <span
              className={`text-xs font-semibold px-2 py-1 text-primary rounded-full ${getBadgeColor(
                event.tipo
              )}`}
            >
              {event.tipo}
            </span>
          </div>
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center text-sm text-primary hover:text-primary/80 hover:underline"
          >
            Mais informações
            <ExternalLinkIcon className="ml-1 h-3 w-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

