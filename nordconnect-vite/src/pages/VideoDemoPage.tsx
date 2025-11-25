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
  ScreenShare,
  ScreenShareOff,
  FileUp,
  Clock,
  MessageCircle,
  Send,
  Volume2,
  VolumeX,
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

  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

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
              <div className="text-sm font-semibold">Quiz-arrangement</div>
              <div className="text-xs text-slate-500">
                Live quiz med vert, chat og deltakere.
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="hidden md:inline-flex items-center gap-1">
            <Users className="h-3 w-3" />
            {quizParticipants.length} påmeldte (demo)
          </Badge>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Hovedseksjon: video + deltakere */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Quizkveld – live rom</CardTitle>
            </CardHeader>
            <CardContent>
              <EventBanner
                title="Quizkveld for nettstudenter"
                subtitle="Lavterskel quiz for å bli kjent på tvers av studieprogram."
                host="Nina (vert / quizmaster)"
                time="20:00–21:00"
              />

              <div className="grid md:grid-cols-3 gap-4">
                {/* Video + kontroller */}
                <div className="md:col-span-2 space-y-3">
                  {/* Video/kameraområde */}
                  <div className="rounded-xl border overflow-hidden bg-slate-900 text-white h-96 relative">
                    <div className="w-full h-full bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center">
                      <span className="text-sm opacity-80 text-center px-4">
                        {isScreenSharing
                          ? "[ Skjermdeling – quiz-spørsmål vises her ]"
                          : "[ Vert – kameravisning / quiz-master – demo ]"}
                      </span>
                    </div>

                    {/* Overlay nederst */}
                    <div className="absolute left-0 right-0 bottom-0 bg-black/50 backdrop-blur px-3 py-2 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-medium">Nina (vert)</div>
                        <div className="text-[10px] text-slate-200/80 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Pågår nå – runde 2/4
                        </div>
                      </div>
                      <StatusIcon micOn={!isMuted} cameraOn={!isCameraOff} />
                    </div>
                  </div>

                  {/* Kontroller */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Mute */}
                    <Button
                      className={`rounded-full p-3 transition ${
                        isMuted ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}
                      variant="ghost"
                      onClick={() => setIsMuted(prev => !prev)}
                    >
                      {isMuted ? (
                        <MicOff className="h-5 w-5" />
                      ) : (
                        <Mic className="h-5 w-5" />
                      )}
                    </Button>

                    {/* Deafen */}
                    <Button
                      className={`rounded-full p-3 transition ${
                        isDeafened ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}
                      variant="ghost"
                      onClick={() => setIsDeafened(prev => !prev)}
                    >
                      {isDeafened ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>

                    {/* Kamera */}
                    <Button
                      className={`rounded-full p-3 transition ${
                        isCameraOff ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}
                      variant="ghost"
                      onClick={() => setIsCameraOff(prev => !prev)}
                    >
                      {isCameraOff ? (
                        <VideoOff className="h-5 w-5" />
                      ) : (
                        <Video className="h-5 w-5" />
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
                      onClick={() => setIsScreenSharing(prev => !prev)}
                    >
                      {isScreenSharing ? (
                        <ScreenShareOff className="h-5 w-5" />
                      ) : (
                        <ScreenShare className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Deltakerliste */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">
                      Deltakere i rommet
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {quizParticipants.length} tilkoblet
                    </Badge>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-1">
                    {quizParticipants.map((name, idx) => (
                      <div
                        key={name}
                        className="flex items-center gap-2 rounded-lg border bg-white px-2 py-2 text-xs"
                      >
                        <Avatar className="h-7 w-7 border">
                          <AvatarFallback>{initials(name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{name}</div>
                          <div className="text-[10px] text-slate-500">
                            {idx === 0 ? "Med-vert" : "Deltaker"}
                          </div>
                        </div>
                        <span className="text-[10px] text-emerald-600">● aktiv</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Chat / quiz-kommentarer */}
        <section>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-base">Quiz-chat (demo)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-3 bg-slate-50">
                <div className="space-y-2 max-h-44 overflow-auto text-sm">
                  <ChatBubble name="Nina (vert)">
                    Skriv svaret deres i chatten – én melding per gruppe 🙌
                  </ChatBubble>
                  <ChatBubble name="Gruppe 1 – Anna">
                    Vi går for alternativ B!
                  </ChatBubble>
                  <ChatBubble name="Gruppe 2 – Elias" align="right">
                    C her ✅
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
