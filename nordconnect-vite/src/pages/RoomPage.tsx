import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  ArrowLeft,
  ScreenShare,
  ScreenShareOff,
  FileUp,
  Users,
  Volume2,
  VolumeX,
} from "lucide-react";

const mockUsers = ["Anna", "Bjørn", "Chen", "Dina", "Elias", "Fatima", "Gustav", "Hanna"];

const ROOM_INDEX: Record<
  string,
  {
    name: string;
    description: string;
  }
> = {
  kaffe: { name: "Kaffepraten", description: "Uformell prat. Kom og gå som du vil." },
  fokus: { name: "Fokusrom – stille", description: "Pomodoro-økter og stille samskriving." },
  ent1002: { name: "ENT1002 – Diskusjon", description: "Spørsmål, notater, og samarbeid." },
  trivsel: { name: "Trivselsprat", description: "Trygt rom moderert av faddere." },
  oslo: { name: "Oslo-området", description: "Møt andre i samme område." },
};

const peopleInRoom = (n: number) =>
  [...mockUsers].sort(() => Math.random() - 0.5).slice(0, Math.max(1, Math.min(n, mockUsers.length)));

export default function RoomPage() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();

  const meta = id ? ROOM_INDEX[id] : undefined;

  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isInRoom, setIsInRoom] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Enkel topplinje */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => nav(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tilbake
            </Button>
            <div className="text-sm text-slate-500">/room/{id}</div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
            <Users className="h-4 w-4" />
            <span>Åpent rom for nettstudenter (demo)</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {meta ? (
          <div className="grid md:grid-cols-3 gap-4">
            {/* Hoved-chatkort */}
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>{meta.name}</CardTitle>
                  <div className="text-slate-600 text-sm">{meta.description}</div>
                </div>
                <Button
                  size="sm"
                  className="text-xs mt-1 md:mt-0"
                  variant={isInRoom ? "outline" : "default"}
                  onClick={() => setIsInRoom(prev => !prev)}
                >
                  {isInRoom ? "Forlat rommet" : "Bli med i rommet"}
                </Button>
              </CardHeader>
              <CardContent>
                {/* Kameravisning – dukker bare opp når du er i rommet og kamera er på */}
                {isInRoom && !isCameraOff && (
                  <div className="mb-4">
                    <div className="rounded-xl border overflow-hidden bg-slate-900 text-white h-56 relative">
                      <div className="w-full h-full bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center">
                        <span className="text-sm opacity-80 text-center px-4">
                          [ Kameravisning – demo for dette rommet ]
                        </span>
                      </div>
                      <div className="absolute left-0 right-0 bottom-0 bg-black/50 backdrop-blur px-3 py-1.5 flex items-center justify-between">
                        <div className="text-[11px]">
                          <div className="font-medium">Du</div>
                          <div className="text-[10px] text-slate-200/80">
                            Kamera aktivert (mock)
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-100/80">
                          {isMuted ? "Mic av" : "Mic på"} •{" "}
                          {isDeafened ? "Lyd av" : "Lyd på"} •{" "}
                          {isScreenSharing ? "Skjermdeling" : "Ingen deling"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-xs text-slate-500 mb-2">Tekstchat (mock)</div>
                <div className="space-y-2 max-h-72 overflow-auto bg-slate-50 border rounded-xl p-3">
                  <Bubble name="Anna" text="Hei! Hvordan går det med innleveringen?" />
                  <Bubble name="Bjørn" text="Tar en 25-min fokusøkt og så pause ☕" align="right" />
                  <Bubble name="Chen" text="Noen som vil sparre på metode-delen?" />
                </div>
                <div className="mt-3 flex gap-2">
                  <Input placeholder="Skriv en melding…" />
                  <Button>Send</Button>
                </div>
              </CardContent>
            </Card>

            {/* Sidepanel med deltakere og kontroller */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Deltakere (mock)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {peopleInRoom(6).map((p, i) => (
                    <div
                      key={p + i}
                      className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border"
                    >
                      <Avatar className="h-7 w-7 border">
                        <AvatarFallback>{p[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm truncate">{p}</span>
                    </div>
                  ))}
                </div>

                {/* Ikonknapper – samme stil som andre sider */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {/* Mic */}
                  <Button
                    className={`rounded-full p-3 transition ${
                      isMuted ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                    variant="ghost"
                    title="Mic av/på (demo)"
                    onClick={() => setIsMuted(prev => !prev)}
                  >
                    {isMuted ? (
                      <MicOff className="h-4 w-4" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </Button>

                  {/* Lyd (deafen) */}
                  <Button
                    className={`rounded-full p-3 transition ${
                      isDeafened ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                    variant="ghost"
                    title="Lyd av/på (demo)"
                    onClick={() => setIsDeafened(prev => !prev)}
                  >
                    {isDeafened ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>

                  {/* Kamera */}
                  <Button
                    className={`rounded-full p-3 transition ${
                      isCameraOff ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                    variant="ghost"
                    title="Aktiver/deaktiver kamera (demo)"
                    onClick={() => setIsCameraOff(prev => !prev)}
                  >
                    {isCameraOff ? (
                      <VideoOff className="h-4 w-4" />
                    ) : (
                      <Video className="h-4 w-4" />
                    )}
                  </Button>

                  {/* Del skjerm */}
                  <Button
                    className={`rounded-full p-3 transition ${
                      isScreenSharing
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                    variant="ghost"
                    title="Del skjerm (demo)"
                    onClick={() => setIsScreenSharing(prev => !prev)}
                  >
                    {isScreenSharing ? (
                      <ScreenShareOff className="h-4 w-4" />
                    ) : (
                      <ScreenShare className="h-4 w-4" />
                    )}
                  </Button>

                  {/* Del fil – statisk demo-knapp */}
                  <Button
                    variant="outline"
                    className="rounded-full p-3"
                    title="Del fil (demo)"
                  >
                    <FileUp className="h-4 w-4" />
                  </Button>
                </div>

                <Button className="mt-4 w-full" variant="outline" onClick={() => nav(-1)}>
                  Lukk rom (til forsiden)
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-20 text-slate-600">
            Fant ikke rommet <span className="font-mono">"{id}"</span>.
            <div className="mt-4">
              <Button onClick={() => nav("/")}>Til forsiden</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Bubble({
  name,
  text,
  align = "left",
}: {
  name: string;
  text: string;
  align?: "left" | "right";
}) {
  return (
    <div className={`flex ${align === "right" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
          align === "right" ? "bg-blue-600 text-white" : "bg-white border"
        }`}
      >
        <div className="text-[10px] opacity-70 mb-1">{name}</div>
        <div>{text}</div>
      </div>
    </div>
  );
}
