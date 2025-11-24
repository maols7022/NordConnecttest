import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  Mic,
  MicOff,
  Video,
  VideoOff,
  ArrowLeft,
  ArrowRight,
  Clock,
} from "lucide-react";

type Participant = {
  name: string;
  micOn: boolean;
  cameraOn: boolean;
};

type BreakoutRoom = {
  id: string;
  name: string;
  topic: string;
  participants: Participant[];
};

const mainRoomParticipants: Participant[] = [
  { name: "Nina (vert)", micOn: true, cameraOn: true },
  { name: "Bjørn", micOn: false, cameraOn: false },
  { name: "Chen", micOn: false, cameraOn: false },
  { name: "Dina", micOn: false, cameraOn: false },
];

const breakoutRooms: BreakoutRoom[] = [
  {
    id: "case1",
    name: "Casegruppe 1",
    topic: "Drøft oppgave 2 – marked",
    participants: [
      { name: "Elias", micOn: true, cameraOn: true },
      { name: "Fatima", micOn: true, cameraOn: false },
      { name: "Gustav", micOn: false, cameraOn: false },
    ],
  },
  {
    id: "case2",
    name: "Casegruppe 2",
    topic: "Drøft oppgave 3 – økonomi",
    participants: [
      { name: "Hanna", micOn: true, cameraOn: true },
      { name: "Ida", micOn: false, cameraOn: true },
      { name: "Jonas", micOn: false, cameraOn: false },
    ],
  },
  {
    id: "prat",
    name: "Uformell prat",
    topic: "Bli kjent-rom – helt frivillig",
    participants: [
      { name: "Anna", micOn: true, cameraOn: false },
      { name: "Lars", micOn: false, cameraOn: false },
    ],
  },
];

export default function BreakoutDemoPage() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Topp-linje */}
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => nav(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tilbake
            </Button>
            <div>
              <div className="text-sm font-semibold">Breakout-rom – demo</div>
              <div className="text-xs text-slate-500">
                Slik kan et arrangement med grupperom se ut i NordConnect.
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
            <Clock className="h-3 w-3" />
            <span>Felles intro: 19:00–19:20 • Breakout: 19:20–19:50</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* Hovedrom */}
        <section>
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <CardTitle>Hovedrom – felles intro</CardTitle>
                <p className="text-sm text-slate-600 mt-1">
                  Vert forklarer oppgaven og hvordan breakout-rom fungerer. Studentene blir deretter
                  fordelt automatisk, men kan flytte seg ved behov.
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-1">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> 32 deltakere (demo)
                </Badge>
                <span className="text-xs text-slate-500">
                  Breakout-rom åpnes om få minutter …
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-[2fr,1fr] gap-4">
                {/* Stor "video" for vert */}
                <div className="rounded-xl border overflow-hidden bg-slate-900 text-white h-56 relative">
                  <div className="w-full h-full bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center">
                    <span className="text-sm opacity-80">
                      [ Vert med kamera aktiv – demo ]
                    </span>
                  </div>
                  <div className="absolute left-0 right-0 bottom-0 bg-black/50 backdrop-blur px-3 py-2 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-medium">Nina (vert)</div>
                      <div className="text-[10px] text-slate-200/80">
                        Fagansvarlig / arrangement-vert
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <StatusDot micOn cameraOn />
                    </div>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="destructive" className="text-[10px] px-2 py-0.5">
                      LIVE
                    </Badge>
                  </div>
                </div>

                {/* Liste over noen deltakere i hovedrommet */}
                <div>
                  <div className="text-xs text-slate-500 mb-2">
                    Eksempel på deltakere i hovedrommet (demo)
                  </div>
                  <div className="space-y-2">
                    {mainRoomParticipants.map((p) => (
                      <div
                        key={p.name}
                        className="flex items-center justify-between gap-2 rounded-lg border bg-slate-50 px-2 py-1.5"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Avatar className="h-7 w-7 border">
                            <AvatarFallback>
                              {p.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="text-xs font-medium truncate">{p.name}</div>
                            <div className="text-[10px] text-slate-500 truncate">
                              Student • Handelshøgskolen
                            </div>
                          </div>
                        </div>
                        <StatusDot micOn={p.micOn} cameraOn={p.cameraOn} />
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[11px] text-slate-500">
                    Under intro kan studentene ha kamera av. Etterpå blir de flyttet til hvert sitt
                    breakout-rom, men kan komme tilbake hit når som helst.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Breakout-rom seksjon */}
        <section>
          <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
            <h2 className="text-lg font-semibold">Breakout-rom (demo)</h2>
            <p className="text-xs text-slate-500 max-w-md">
              Her vises rommene verten har satt opp. I en ekte løsning kunne studenter trykke “Bli med”
              for å gå inn i et grupperom.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {breakoutRooms.map((room) => (
              <Card key={room.id} className="flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between gap-2">
                    <span>{room.name}</span>
                    <Badge variant="outline" className="text-[10px]">
                      {room.participants.length} i rommet
                    </Badge>
                  </CardTitle>
                  <p className="text-xs text-slate-600 mt-1">{room.topic}</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <div className="space-y-1.5">
                    {room.participants.map((p) => (
                      <div
                        key={room.id + p.name}
                        className="flex items-center justify-between gap-2 rounded-lg border bg-slate-50 px-2 py-1.5"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Avatar className="h-7 w-7 border">
                            <AvatarFallback>
                              {p.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="text-xs font-medium truncate">{p.name}</div>
                            <div className="text-[10px] text-slate-500 truncate">
                              {p === room.participants[0] ? "Gruppeleder (demo)" : "Student"}
                            </div>
                          </div>
                        </div>
                        <StatusDot micOn={p.micOn} cameraOn={p.cameraOn} />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <p className="text-[11px] text-slate-500">
                      Fokus på små grupper, med frivillig kamera.
                    </p>
                    <Button variant="outline" size="sm">
                      <ArrowRight className="h-3 w-3 mr-1" />
                      Bli med (demo)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function StatusDot({ micOn, cameraOn }: { micOn: boolean; cameraOn: boolean }) {
  return (
    <div className="flex items-center gap-1">
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
          micOn ? "bg-emerald-500/80" : "bg-red-500/80"
        }`}
      >
        {micOn ? (
          <Mic className="h-3 w-3 text-white" />
        ) : (
          <MicOff className="h-3 w-3 text-white" />
        )}
      </span>
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
          cameraOn ? "bg-emerald-500/80" : "bg-slate-500/80"
        }`}
      >
        {cameraOn ? (
          <Video className="h-3 w-3 text-white" />
        ) : (
          <VideoOff className="h-3 w-3 text-white" />
        )}
      </span>
    </div>
  );
}
