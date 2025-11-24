import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Users,
  Mic,
  MicOff,
  Video,
  VideoOff,
  ScreenShare,
  FileUp,
  MessageCircle,
  Send,
} from "lucide-react";
import EventBanner from "@/components/EventBanner";

const breakoutRooms = [
  {
    id: "gruppe-1",
    name: "Gruppe 1 – Introduksjon",
    topic: "Bli kjent og forventninger",
    participants: ["Anna", "Bjørn", "Chen", "Dina"],
  },
  {
    id: "gruppe-2",
    name: "Gruppe 2 – Faglig refleksjon",
    topic: "Hva er mest krevende i fag X?",
    participants: ["Elias", "Fatima", "Gustav"],
  },
  {
    id: "gruppe-3",
    name: "Gruppe 3 – Erfaringer",
    topic: "Hvordan kombinere studie og jobb?",
    participants: ["Hanna", "Ida", "Jonas"],
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function BreakoutDemoPage() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Topplinje */}
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => nav(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tilbake
            </Button>
            <div>
              <div className="text-sm font-semibold">Breakout-demo</div>
              <div className="text-xs text-slate-500">
                Viser hvordan en større samling kan deles i mindre grupper.
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="hidden md:inline-flex items-center gap-1">
            <Users className="h-3 w-3" />
            Plenum + 3 grupper (demo)
          </Badge>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Hovedseksjon: plenum + grupper */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Plenumsrom + breakout-grupper</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Event-banner for økten */}
              <EventBanner
                title="Temakveld – erfaringer som nettstudent"
                subtitle="Plenum i starten og slutten, gruppearbeid i breakout-rom underveis."
                host="Nina (vert / seminarleder)"
                time="18:00–19:30"
              />

              <div className="grid md:grid-cols-3 gap-4">
                {/* Plenums-visning / host */}
                <div className="md:col-span-2 space-y-3">
                  {/* Større «kamera»-flate for å fylle mer av kortet */}
                  <div className="rounded-xl border overflow-hidden bg-slate-900 text-white h-72 relative">
                    <div className="w-full h-full bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center">
                      <span className="text-sm opacity-80 text-center px-4">
                        [ Plenum – vert oppsummerer og gir instruksjoner før breakout – demo ]
                      </span>
                    </div>
                    <div className="absolute left-0 right-0 bottom-0 bg-black/50 backdrop-blur px-3 py-2 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-medium">Nina (vert)</div>
                        <div className="text-[10px] text-slate-200/80">
                          Leder økten og fordeler deltakerne
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <StatusIcon micOn cameraOn />
                      </div>
                    </div>
                  </div>

                  {/* Litt ekstra innhold under videoen, for å unngå tomrom */}
                  <div className="rounded-lg border bg-slate-50 px-3 py-2 text-xs text-slate-600">
                    <p className="mb-1">
                      I en ekte løsning kan verten fordele deltakerne automatisk eller manuelt
                      til breakout-rommene under. Etter gruppearbeid kan alle returnere
                      til plenum for oppsummering.
                    </p>
                    <div className="mt-2">
                      <div className="font-semibold text-[11px] text-slate-700 mb-1">
                        Eksempel: noen av deltakerne i plenum (demo)
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["Anna", "Bjørn", "Chen", "Dina", "Elias", "Fatima"].map((name) => (
                          <div
                            key={name}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white border text-[11px]"
                          >
                            <Avatar className="h-5 w-5 border">
                              <AvatarFallback>{initials(name)}</AvatarFallback>
                            </Avatar>
                            <span className="truncate max-w-[80px]">{name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Vert-kontroller (mock) */}
                  <div className="flex flex-wrap gap-2 items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="secondary" title="Mic">
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button variant="secondary" title="Kamera">
                        <Video className="h-4 w-4" />
                      </Button>
                      {/* Del skjerm i mørk stil som de andre */}
                      <Button variant="secondary" title="Del skjerm (demo)">
                        <ScreenShare className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Alt du ser her er kun UI – ingen faktisk fordeling eller video/lyd.
                    </p>
                  </div>
                </div>

                {/* Liste over breakout-rom */}
                <div className="space-y-3">
                  {breakoutRooms.map((room) => (
                    <div key={room.id} className="rounded-lg border bg-white p-3 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="text-xs font-semibold text-slate-800">
                            {room.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {room.topic}
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-[10px]">
                          {room.participants.length} deltakere
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {room.participants.map((name) => (
                          <div
                            key={room.id + name}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-50 border text-[11px]"
                          >
                            <Avatar className="h-5 w-5 border">
                              <AvatarFallback>{initials(name)}</AvatarFallback>
                            </Avatar>
                            <span className="truncate max-w-[70px]">{name}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" className="text-xs flex-1">
                          Bli med i rommet
                        </Button>
                        <Button variant="ghost" className="text-[11px] px-2">
                          Flytt deltakere
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Plenums-chat – viser skriftlig kanal + fildeling ved input */}
        <section>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-base">Plenums-chat (demo)</CardTitle>
              </div>
              <span className="text-xs text-slate-500">
                Skriftlig kanal som kan brukes både før og etter breakout.
              </span>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-3 bg-slate-50">
                <div className="text-xs text-slate-500 mb-2">
                  Eksempel på hvordan chatten kan brukes sammen med breakout-rom:
                </div>
                <div className="space-y-2 max-h-44 overflow-auto text-sm">
                  <ChatBubble name="Nina (vert)">
                    Nå deler jeg dere inn i grupper. Bruk 10 minutter på å diskutere spørsmålet som står i toppteksten i hvert rom 👇
                  </ChatBubble>
                  <ChatBubble name="Anna">
                    Jeg er litt usikker på hvor jeg skal, men ser at jeg havnet i Gruppe 1 – stemmer det? 🙂
                  </ChatBubble>
                  <ChatBubble name="Nina (vert)" align="right">
                    Ja, Anna – du er i Gruppe 1. Dere jobber med forventninger til studiet 💬
                  </ChatBubble>
                  <ChatBubble name="Jonas">
                    Kan vi dele notatmalen her i plenum etterpå?
                  </ChatBubble>
                  <ChatBubble name="Nina (vert)" align="right">
                    Absolutt – last den gjerne opp her i chatten etter gruppediskusjonen.
                  </ChatBubble>
                </div>

                {/* INPUTRAD: del fil + skriv + send */}
                <div className="mt-3 flex gap-2">
                  <Button
                    variant="outline"
                    type="button"
                    title="Del fil (demo)"
                    className="shrink-0"
                  >
                    <FileUp className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Skriv en melding… (demo – ikke ekte chat)"
                    className="flex-1"
                  />
                  <Button type="button" className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                <p className="mt-2 text-[11px] text-slate-500">
                  I en ekte løsning kunne studenter legge ved notater, oppgavetekster eller korte oppsummeringer
                  fra gruppene sine her – uten å måtte ta ordet i plenum.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

function StatusIcon({ micOn, cameraOn }: { micOn: boolean; cameraOn: boolean }) {
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

function ChatBubble({
  name,
  children,
  align = "left",
}: {
  name: string;
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <div className={`flex ${align === "right" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs shadow-sm ${
          align === "right" ? "bg-blue-600 text-white" : "bg-white border"
        }`}
      >
        <div className="text-[9px] opacity-70 mb-1">{name}</div>
        <div>{children}</div>
      </div>
    </div>
  );
}
