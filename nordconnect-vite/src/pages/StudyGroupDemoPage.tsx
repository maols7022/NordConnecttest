import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Headphones,
  ScreenShare,
  FileUp,
} from "lucide-react";

const studyGroup = ["Gustav", "Hanna", "Ida", "Jonas"];

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Topplinje */}
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="outline" onClick={() => nav(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tilbake
          </Button>
          <div>
            <div className="text-sm font-semibold">Kamera-demo – Studiegruppe</div>
            <div className="text-xs text-slate-500">
              Viser en liten gruppe der flere har kamera på.
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Studiegruppe – flere med kamera</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">
              Her kan du vise hvordan små grupper ser ut – noen med kamera, noen
              uten, alle med enkel tilgang til mic, lyd og fildeling. Alt er
              kun demo-UI, ingen ekte video/lyd.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {studyGroup.map((name, i) => (
                <div
                  key={name + i}
                  className="rounded-xl border overflow-hidden bg-slate-900 text-white h-40 relative"
                >
                  <div className="w-full h-full flex items-center justify-center bg-slate-800">
                    {i < 3 ? (
                      <span className="text-xs opacity-80">
                        [ Kamera aktiv – demo ]
                      </span>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Avatar className="h-10 w-10 border">
                          <AvatarFallback>{initials(name)}</AvatarFallback>
                        </Avatar>
                        <span className="text-[11px] opacity-80">
                          Kamera av
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="absolute left-0 right-0 bottom-0 bg-black/50 backdrop-blur px-3 py-2 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-medium">{name}</div>
                      <div className="text-[10px] text-slate-200/80">
                        Student
                      </div>
                    </div>
                    <StatusIcon micOn={i !== 2} cameraOn={i < 3} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" title="Mic">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button variant="secondary" title="Kamera">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="secondary" title="Lyd">
                  <Headphones className="h-4 w-4" />
                </Button>
                <Button variant="outline" title="Del skjerm (demo)">
                  <ScreenShare className="h-4 w-4" />
                </Button>
                <Button variant="outline" title="Del fil (demo)">
                  <FileUp className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-[11px] text-slate-500">
                Denne siden er kun for å illustrere hvordan studiegrupper kan se ut.
              </p>
            </div>
          </CardContent>
        </Card>
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
