import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Mic, Video, Headphones, ArrowLeft } from "lucide-react";

// Del disse to fra NordConnect.tsx om du vil unngå duplisering
const mockUsers = ["Anna", "Bjørn", "Chen", "Dina", "Elias", "Fatima", "Gustav", "Hanna"];
const ROOM_INDEX: Record<string, { name: string; description: string }> = {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Enkel topplinje */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="outline" onClick={() => nav(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tilbake
          </Button>
          <div className="text-sm text-slate-500">/room/{id}</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {meta ? (
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>{meta.name}</CardTitle>
                <div className="text-slate-600 text-sm">{meta.description}</div>
              </CardHeader>
              <CardContent>
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

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Deltakere (mock)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {peopleInRoom(6).map((p, i) => (
                    <div key={p + i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border">
                      <Avatar className="h-7 w-7 border">
                        <AvatarFallback>{p[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{p}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <Button variant="secondary">
                    <Mic className="h-4 w-4 mr-1" />
                    Mic
                  </Button>
                  <Button variant="secondary">
                    <Video className="h-4 w-4 mr-1" />
                    Kamera
                  </Button>
                  <Button variant="secondary">
                    <Headphones className="h-4 w-4 mr-1" />
                    Lyd
                  </Button>
                </div>

                <Button className="mt-3 w-full" variant="outline" onClick={() => nav(-1)}>
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
