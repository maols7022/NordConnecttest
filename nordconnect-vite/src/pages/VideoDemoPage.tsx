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
  Clock,
  MessageCircle,
  Send,
} from "lucide-react";
import EventBanner from "@/components/EventBanner";

const quizParticipants = ["Anna", "Bjørn", "Chen", "Dina", "Elias", "Fatima"];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function VideoDemoPage() {
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
              <div className="text-sm font-semibold">Kamera-demo – Quizkveld</div>
              <div className="text-xs text-slate-500">
                Viser et arrangement der verten har kamera på, og andre kan delta muntlig eller skriftlig.
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
            <Clock className="h-3 w-3" />
            <span>Quizkveld: 19:00–20:00 (demo)</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Hovedkort: vert med kamera */}
        <section>
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <CardTitle>Quizkveld – vert med kamera</CardTitle>
                <p className="text-sm text-slate-600 mt-1">
                  Vert har kamera på, deltakerne kan velge selv. Noen er med på lyd, andre
                  deltar kun i chat. Alt du ser her er kun visuell demo.
                </p>
              </div>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                18 deltakere (demo)
              </Badge>
            </CardHeader>
            <CardContent>
              {/* Event-banner øverst i rommet */}
              <EventBanner
                title="Quizkveld – tema: entreprenørskap"
                subtitle="Uformelt digitalt arrangement for nettstudenter."
                host="Nina (fagansvarlig)"
                time="19:00–20:00"
              />

              <div className="grid md:grid-cols-3 gap-4">
                {/* Vert-video */}
                <div className="md:col-span-2">
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
                          Fagansvarlig / host
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <StatusIcon micOn cameraOn />
                      </div>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="destructive" className="text-[10px] px-2 py-0.5">
                        LIVE
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Deltakere i små ruter */}
                <div className="space-y-3">
                  <div className="text-xs text-slate-500">
                    Eksempel på deltakere (demo)
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {quizParticipants.map((name, i) => (
                      <div
                        key={name + i}
                        className="rounded-lg border bg-slate-50 p-2 flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Avatar className="h-7 w-7 border">
                            <AvatarFallback>{initials(name)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium truncate">
                            {name}
                          </span>
                        </div>
                        <StatusIcon
                          micOn={i < 2}
                          cameraOn={i === 0 || i === 1}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Kontroller (mock, kun UI) */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button variant="secondary" title="Mic">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" title="Kamera">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" title="Skru av kamera (demo)">
                      <VideoOff className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" title="Mute (demo)">
                      <MicOff className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" title="Del skjerm (demo)">
                      <ScreenShare className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" title="Del fil (demo)">
                      <FileUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tekstchat – skriftlig deltakelse */}
        <section>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-base">Tekstchat (demo)</CardTitle>
              </div>
              <span className="text-xs text-slate-500">
                Viser at du kan delta kun skriftlig – uten kamera og mic.
              </span>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-3 bg-slate-50">
                <div className="text-xs text-slate-500 mb-2">
                  Eksempel på meldinger:
                </div>
                <div className="space-y-2 max-h-44 overflow-auto text-sm">
                  <ChatBubble name="Anna">
                    Jeg følger bare med i chat i dag, men quiz høres gøy ut 😄
                  </ChatBubble>
                  <ChatBubble name="Bjørn">
                    Kan noen gjenta spørsmålet? Jeg fikk ikke helt med meg.
                  </ChatBubble>
                  <ChatBubble name="Chen">
                    Jeg vil helst ikke ha kamera på, men skriver gjerne svar her 😊
                  </ChatBubble>
                  <ChatBubble name="Nina (vert)" align="right">
                    Helt fint å delta bare skriftlig – alle må gjøre det som føles komfortabelt 💙
                  </ChatBubble>
                </div>
                <div className="mt-3 flex gap-2">
                  <Input placeholder="Skriv en melding… (demo – ikke ekte chat)" />
                  <Button type="button">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-2 text-[11px] text-slate-500">
                  I en ekte løsning ville dette vært en fullverdig chat, der enkelte
                  kanskje kun skriver, mens andre både snakker og skriver.
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
