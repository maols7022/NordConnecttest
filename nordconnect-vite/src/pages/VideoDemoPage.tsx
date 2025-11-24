import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Video, VideoOff, Mic, MicOff } from "lucide-react";

const quizParticipants = ["Anna", "Bjørn", "Chen", "Dina", "Elias", "Fatima"];
const studyGroup = ["Gustav", "Hanna", "Ida", "Jonas"];

export default function VideoDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Enkel topptekst */}
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Kamera-demo</h1>
          <p className="text-sm text-slate-600">
            Slik kan NordConnect se ut når noen har kamera aktivert – for eksempel vert i et arrangement, eller flere i en studiegruppe.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* Scenario 1 – Quizkveld / arrangement */}
        <section>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div>
                <CardTitle>Quizkveld – vert med kamera</CardTitle>
                <p className="text-sm text-slate-600 mt-1">
                  Vert har kamera på, deltakerne kan velge selv. Chat og reaksjoner på siden.
                </p>
              </div>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                18 deltakere (demo)
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {/* Stor video for vert */}
                <div className="md:col-span-2">
                  <VideoTile
                    name="Vert – Nina"
                    role="Vert / host"
                    cameraOn
                    micOn
                    big
                    label="LIVE"
                  />
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                    <Badge variant="outline">Quizkveld: “Bli kjent med kullet”</Badge>
                    <span>•</span>
                    <span>Timer: 19:00–20:00</span>
                  </div>
                </div>

                {/* Sidepanel – deltakere i små ruter */}
                <div className="space-y-3">
                  <div className="text-xs text-slate-500">Deltakere (demo)</div>
                  <div className="grid grid-cols-2 gap-2">
                    {quizParticipants.map((name, i) => (
                      <VideoTile
                        key={name + i}
                        name={name}
                        role="Student"
                        cameraOn={i < 2} // f.eks. bare de to første med kamera
                        micOn={false}
                      />
                    ))}
                  </div>

                  {/* Kontrollknapper (mock) */}
                  <div className="mt-3 flex flex-wrap gap-2">
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
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Scenario 2 – Studiegruppe med flere kamera */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Studiegruppe – flere med kamera</CardTitle>
              <p className="text-sm text-slate-600 mt-1">
                Liten gruppe som leser sammen. De fleste har kamera på, én eller to velger lyd uten video.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {studyGroup.map((name, i) => (
                  <VideoTile
                    key={name + i}
                    name={name}
                    role="Student"
                    cameraOn={i !== 3} // siste person uten kamera
                    micOn={i !== 2} // en som har mutet mic
                  />
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" title="Mic">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" title="Kamera">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" title="Del skjerm (demo)">
                    <ScreenShareIcon />
                  </Button>
                  <Button variant="outline" title="Del fil (demo)">
                    <FileUp className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-slate-500">
                  Dette er kun en visuell demo – ingen ekte video eller lyd sendes.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

type VideoTileProps = {
  name: string;
  role?: string;
  cameraOn: boolean;
  micOn: boolean;
  big?: boolean;
  label?: string;
};

function VideoTile({
  name,
  role,
  cameraOn,
  micOn,
  big,
  label,
}: VideoTileProps) {
  return (
    <div
      className={`relative rounded-xl border overflow-hidden bg-slate-900 text-white ${
        big ? "h-56" : "h-32"
      }`}
    >
      {/* Simulert videobilde */}
      {cameraOn ? (
        <div className="w-full h-full bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center">
          <span className="text-sm opacity-80">[ Kamera aktiv – demo ]</span>
        </div>
      ) : (
        <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center gap-2">
          <Avatar className={big ? "h-12 w-12" : "h-10 w-10"}>
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs opacity-70">Kamera av</span>
        </div>
      )}

      {/* Navn + status nederst */}
      <div className="absolute left-0 right-0 bottom-0 bg-black/50 backdrop-blur px-3 py-2 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="text-xs font-medium truncate">{name}</div>
          {role && (
            <div className="text-[10px] text-slate-200/80 truncate">
              {role}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
              micOn ? "bg-emerald-500/80" : "bg-red-500/80"
            }`}
          >
            {micOn ? (
              <Mic className="h-3 w-3" />
            ) : (
              <MicOff className="h-3 w-3" />
            )}
          </span>
          <span
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
              cameraOn ? "bg-emerald-500/80" : "bg-slate-500/80"
            }`}
          >
            {cameraOn ? (
              <Video className="h-3 w-3" />
            ) : (
              <VideoOff className="h-3 w-3" />
            )}
          </span>
        </div>
      </div>

      {/* Eventuelt “LIVE”-label øverst */}
      {label && (
        <div className="absolute top-2 left-2">
          <Badge variant="destructive" className="text-[10px] px-2 py-0.5">
            {label}
          </Badge>
        </div>
      )}
    </div>
  );
}

function ScreenShareIcon() {
  return (
    <div className="inline-flex items-center justify-center">
      <ScreenShare className="h-4 w-4" />
    </div>
  );
}
