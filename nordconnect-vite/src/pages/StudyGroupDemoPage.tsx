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
  MessageCircle,
  Send,
  Volume2,
  VolumeX,
  Clock,
} from "lucide-react";
import EventBanner from "@/components/EventBanner";

const studyParticipants = ["Anna", "Bjørn", "Chen", "Dina"];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function StudyGroupDemoPage() {
  const nav = useNavigate();

  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isInRoom, setIsInRoom] = useState(false);
  const [highlightMode, setHighlightMode] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<string>(studyParticipants[0]);

  const videoTiles = studyParticipants.slice(0, 4);

  const cycleActiveSpeaker = () => {
    const idx = studyParticipants.indexOf(activeSpeaker);
    const nextIndex = (idx + 1) % studyParticipants.length;
    setActiveSpeaker(studyParticipants[nextIndex]);
  };

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
              <div className="text-sm font-semibold">Studiegruppe-rom</div>
              <div className="text-xs text-slate-500">
                Fast, sosialt rom for en liten studiegruppe.
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="hidden md:inline-flex items-center gap-1">
            <Users className="h-3 w-3" />
            Liten gruppe (demo)
          </Badge>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Hovedseksjon: videorom + deltakere */}
        <section>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Studiegrupperom – fast ukentlig økt</CardTitle>
              <Button
                size="sm"
                className="text-xs"
                variant={isInRoom ? "outline" : "default"}
                onClick={() => setIsInRoom(prev => !prev)}
              >
                {isInRoom ? "Forlat rommet" : "Bli med i rommet"}
              </Button>
            </CardHeader>
            <CardContent>
              <EventBanner
                title="Studiegruppe i fag X"
                subtitle="Liten, trygg gruppe som møtes jevnlig for å lese sammen."
                host="Organisert av studentene selv"
                time="Torsdager 18:00–19:30"
              />

              <div className="grid md:grid-cols-3 gap-4">
                {/* Video + kontroller */}
                <div className="md:col-span-2 space-y-3">
                  {/* Videogrid / highlight-visning */}
                  <div className="rounded-xl border overflow-hidden bg-slate-900 text-white p-3 h-[26rem] flex flex-col gap-2">
                    {highlightMode ? (
                      <>
                        {/* Highlightet deltaker stort øverst */}
                        <div className="flex-1">
                          <VideoTile
                            name={activeSpeaker}
                            highlight
                            isScreenSharing={isScreenSharing}
                            labelOverride="[ Aktiv deltaker – highlight-visning ]"
                          />
                        </div>

                        {/* Tre små under */}
                        <div className="grid grid-cols-3 gap-2">
                          {videoTiles
                            .filter(name => name !== activeSpeaker)
                            .map(name => (
                              <VideoTile
                                key={name}
                                name={name}
                                small
                                isScreenSharing={false}
                              />
                            ))}
                        </div>
                      </>
                    ) : (
                      /* 2x2 grid med like store kamera, aktiv deltaker markeres med blå kant */
                      <div className="grid grid-cols-2 gap-2 flex-1">
                        {videoTiles.map(name => (
                          <VideoTile
                            key={name}
                            name={name}
                            isScreenSharing={name === activeSpeaker && isScreenSharing}
                            highlight={name === activeSpeaker}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Info + status under video */}
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Torsdager 18:00–19:30 – uformell leseøkt</span>
                    </div>
                    <StatusIcon micOn={!isMuted} cameraOn={!isCameraOff} />
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

                    {/* Highlight-knapp */}
                    <Button
                      className="rounded-full px-4 py-2 text-xs"
                      variant={highlightMode ? "default" : "outline"}
                      onClick={() => setHighlightMode(prev => !prev)}
                    >
                      {highlightMode ? "Highlight av" : "Highlight på"}
                    </Button>

                    {/* Neste som snakker */}
                    <Button
                      className="rounded-full px-4 py-2 text-xs"
                      variant="outline"
                      onClick={cycleActiveSpeaker}
                    >
                      Neste som snakker
                    </Button>
                  </div>
                </div>

                {/* Deltakerliste – små chips, klikker for å sette aktiv deltaker */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">
                      Studiegruppen
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {studyParticipants.length} medlemmer
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {studyParticipants.map(name => {
                      const isActive = name === activeSpeaker;
                      return (
                        <button
                          key={name}
                          type="button"
                          onClick={() => setActiveSpeaker(name)}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[11px] cursor-pointer transition ${
                            isActive
                              ? "bg-blue-50 border-blue-400 text-blue-800"
                              : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50"
                          }`}
                        >
                          <Avatar className="h-6 w-6 border border-slate-200">
                            <AvatarFallback>{initials(name)}</AvatarFallback>
                          </Avatar>
                          <span className="truncate max-w-[80px]">{name}</span>
                          {isActive && <span className="text-[9px]">• snakker nå</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Chat / notater */}
        <section>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-base">Felles notater / chat (demo)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-3 bg-slate-50">
                <div className="space-y-2 max-h-44 overflow-auto text-sm">
                  <ChatBubble name="Anna">
                    Skal vi ta gjennomgang av oppgave 3 sammen nå?
                  </ChatBubble>
                  <ChatBubble name="Bjørn">
                    Ja! Jeg sleit spesielt med del b).
                  </ChatBubble>
                  <ChatBubble name="Chen" align="right">
                    Jeg kan dele skjerm og vise hvordan jeg løste den.
                  </ChatBubble>
                </div>

                {/* INPUTRAD */}
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" className="shrink-0">
                    <FileUp className="h-4 w-4" />
                  </Button>
                  <Input placeholder="Skriv en melding eller et notat…" className="flex-1" />
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

/** En enkel “kameraflis” for demo */
function VideoTile({
  name,
  highlight = false,
  small = false,
  isScreenSharing,
  labelOverride,
}: {
  name: string;
  highlight?: boolean;
  small?: boolean;
  isScreenSharing?: boolean;
  labelOverride?: string;
}) {
  return (
    <div
      className={`relative rounded-lg overflow-hidden bg-gradient-to-tr from-slate-800 to-slate-700 border ${
        highlight ? "border-blue-400" : "border-slate-700"
      } ${small ? "aspect-video" : "h-full"}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[11px] opacity-80 text-center px-2">
          {labelOverride
            ? labelOverride
            : isScreenSharing
            ? "[ Skjermdeling – felles dokument/notater ]"
            : "[ Kameravisning – demo ]"}
        </span>
      </div>
      <div className="absolute left-2 bottom-2 flex items-center gap-2 text-[10px]">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/60 border border-white/20">
          {name.charAt(0).toUpperCase()}
        </span>
        <span className="bg-black/50 px-2 py-0.5 rounded-full">
          {name}
        </span>
      </div>
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
