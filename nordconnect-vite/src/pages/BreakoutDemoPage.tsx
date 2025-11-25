import React, { useState } from "react";
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
  FileUp,
  MessageCircle,
  Send,
  Volume2,
  VolumeX,
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

  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isInMainRoom, setIsInMainRoom] = useState(false);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null); // hvilket breakout-rom du "er i"

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
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Plenumsrom + breakout-grupper</CardTitle>
              <Button
                size="sm"
                className="text-xs"
                variant={isInMainRoom ? "outline" : "default"}
                onClick={() => setIsInMainRoom((prev) => !prev)}
              >
                {isInMainRoom ? "Forlat rommet" : "Bli med i rommet"}
              </Button>
            </CardHeader>
            <CardContent>
              {/* Event-banner for økten */}
              <EventBanner
                title="Temakveld – erfaringer som nettstudent"
                subtitle="Plenum i starten og slutten, gruppearbeid i breakout-rom underveis."
                host="Nina (vert / seminarleder)"
                time="18:00–19:30"
              />

              <div className="space-y-4">
                {/* Plenums-visning / host */}
                <div className="space-y-3">
                  {/* Større firkantet kameravisning */}
                  <div className="rounded-xl border overflow-hidden bg-slate-900 text-white h-96 relative">
                    <div className="w-full h-full bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center">
                      <span className="text-sm opacity-80 text-center px-4">
                        [ Vert – kamera/scene – demo ]
                      </span>
                    </div>

                    {/* Overlay med navn + status */}
                    <div className="absolute left-0 right-0 bottom-0 bg-black/50 backdrop-blur px-3 py-2 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-medium">Nina (vert)</div>
                        <div className="text-[10px] text-slate-200/80">Presenterer</div>
                      </div>
                      <StatusIcon micOn={!isMuted} cameraOn={!isCameraOff} />
                    </div>
                  </div>

                  {/* Vert-kontroller */}
                  <div className="flex items-center gap-2">
                    {/* Mute */}
                    <Button
                      className={`rounded-full p-3 transition ${
                        isMuted ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}
                      variant="ghost"
                      onClick={() => setIsMuted((prev) => !prev)}
                    >
                      {isMuted ? (
                        <MicOff className="h-5 w-5" />
                      ) : (
                        <Mic className="h-5 w-5" />
                      )}
                    </Button>

                    {/* Deafen – Volume2 / VolumeX */}
                    <Button
                      className={`rounded-full p-3 transition ${
                        isDeafened ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}
                      variant="ghost"
                      onClick={() => setIsDeafened((prev) => !prev)}
                    >
                      {isDeafened ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>

                    {/* Kamera av/på */}
                    <Button
                      className={`rounded-full p-3 transition ${
                        isCameraOff ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}
                      variant="ghost"
                      onClick={() => setIsCameraOff((prev) => !prev)}
                    >
                      {isCameraOff ? (
                        <VideoOff className="h-5 w-5" />
                      ) : (
                        <Video className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Breakout-rom i kort – 3 i bredden på desktop */}
                <div className="grid gap-3 md:grid-cols-3">
                  {breakoutRooms.map((room) => {
                    const isInThisRoom = activeRoomId === room.id;

                    return (
                      <div
                        key={room.id}
                        className={`rounded-lg border p-3 space-y-2 shadow-sm transition-colors ${
                          isInThisRoom ? "bg-blue-50 border-blue-200" : "bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-xs font-semibold text-slate-800">
                              {room.name}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {room.topic}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-[10px]">
                            {room.participants.length} deltakere
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-1">
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

                        <div className="flex justify-end mt-2 gap-2">
                          <Button
                            size="xs"
                            variant="outline"
                            className={`text-[11px] px-2 ${
                              isInThisRoom
                                ? "border-slate-500 bg-slate-100"
                                : "border-slate-200 bg-white"
                            }`}
                            onClick={() =>
                              setActiveRoomId((prev) =>
                                prev === room.id ? null : room.id
                              )
                            }
                          >
                            {isInThisRoom ? "Forlat rommet" : "Bli med i rommet"}
                          </Button>
                          <Button variant="ghost" className="text-[11px] px-2">
                            Flytt deltakere
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Chat nederst – beholdes som før */}
        <section>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-base">Plenums-chat (demo)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-3 bg-slate-50">
                <div className="space-y-2 max-h-44 overflow-auto text-sm">
                  <ChatBubble name="Nina (vert)">
                    Husk: Breakout starter om 2 minutter 👇
                  </ChatBubble>
                  <ChatBubble name="Anna">
                    Klar! Skal vi levere oppsummering her etterpå?
                  </ChatBubble>
                  <ChatBubble name="Nina (vert)" align="right">
                    Ja – legg igjen notatene her 😊
                  </ChatBubble>
                </div>

                {/* INPUTRAD */}
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" className="shrink-0">
                    <FileUp className="h-4 w-4" />
                  </Button>
                  <Input placeholder="Skriv en melding…" className="flex-1" />
                  <Button className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
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
