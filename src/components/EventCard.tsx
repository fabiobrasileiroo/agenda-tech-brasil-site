import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, ExternalLinkIcon } from "lucide-react";

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
      return "bg-sky-600/90";
    case "híbrido":
      return "bg-purple-900/80";
    case "online":
      return "bg-orange-600/90";
    default:
      return "bg-background/20";
  }
};

export function EventCard({ event, month }: { event: Event; month: string }) {
  const formattedDate =
    event.data.length > 1
      ? `${event.data[0]} - ${event.data[event.data.length - 1]}`
      : event.data[0];

  const location =
    event.cidade && event.uf
      ? `${event.cidade}, ${event.uf}`
      : event.tipo === "online"
      ? ""
      : "Sem informação de local";

  const shortMonth = month.slice(0, 3).toUpperCase();

  return (
    <div className="relative group w-full max-w-md mx-auto lg:max-w-lg mt-2">
      <div className="w-full transition-shadow hover:shadow-lg rounded-lg border overflow-hidden">
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <CardHeader className="bg-primary text-primary-foreground pt-0.5 px-0 pb-1">
            <h2 className="text-left text-lg py-1.5 px-4 pr-28  lg:text-xl font-bold">{event.nome}</h2>
            <div className="px-3 flex flex-row  justify-between pb-2 gap-2">
              <div>
                <span
                  className={`text-xs md:text-sm py-0.5 px-2 rounded-full text-zinc-50 ${getBadgeColor(
                    event.tipo
                  )}`}
                >
                  {event.tipo}
                </span>
              </div>
              <div>
                {location !== "" && (
                  <div className="flex gap-1 items-center text-sm md:text-base">
                    <MapPinIcon size={16} />
                    <h3>{location}</h3>
                  </div>
                )}
              </div>
            </div>

            <div className="absolute border-t-[0.10px]  border-primary/40 -top-[1.70rem] right-3 flex flex-col px-[0.25px] bg-primary/10 rounded-md">

              <span className="text-base md:text-lg  text-foreground mt-1 flex flex-col justify-center items-center gap-2">
                <CalendarIcon size={14} />{" "}
                <div className="flex">
                  <span className="text-lg md:text-xl text-zinc-800"> {`${formattedDate} - ${shortMonth}`}</span>
                </div>
              </span>
            </div>
          </CardHeader>

          {/* Aqui está o ajuste para exibir apenas no hover */}
          <CardContent className="hidden group-hover:block p-2 bg-gradient-to-b from-primary/5 to-transparent">
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-center text-sm md:text-base"
            >
              SAIBA MAIS <ExternalLinkIcon size={17} className="mb-1" />
            </a>
          </CardContent>
        </a>
      </div>
    </div>
  );
}
