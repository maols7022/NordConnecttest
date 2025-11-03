import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { 
  Coffee, BookOpen, Heart, MessageCircle, Users, Sparkles, MapPin, Shield, Smile, 
  ChevronRight, PlayCircle, Bell, Mic, Video, Headphones, Search, Crown, Monitor, Globe, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";

const mockUsers = ["Anna", "Bjørn", "Chen", "Dina", "Elias", "Fatima", "Gustav", "Hanna"]; 

const initialRooms = [
  {
    id: "kaffe",
    icon: Coffee,
    name: "Kaffepraten",
    type: "Sosial sone",
    description: "Uformell prat. Kom og gå som du vil.",
    online: 3,
    tags: ["lav terskel", "uformell"],
  },
  {
    id: "fokus",
    icon: BookOpen,
    name: "Fokusrom – stille",
    type: "Studiesone",
    description: "Pomodoro-økter og stille samskriving.",
    online: 5,
    tags: ["studie", "fokus"],
  },
  {
    id: "ent1002",
    icon: MessageCircle,
    name: "ENT1002 – Diskusjon",
    type: "Faggruppe",
    description: "Spørsmål, notater, og samarbeid.",
    online: 2,
    tags: ["fag", "gruppe"],
  },
  {
    id: "trivsel",
    icon: Heart,
    name: "Trivselsprat",
    type: "Støtte og trivsel",
    description: "Trygt rom moderert av faddere.",
    online: 1,
    tags: ["trygt", "inkluderende"],
  },
  {
    id: "oslo",
    icon: MapPin,
    name: "Oslo-området",
    type: "Regionalt rom",
    description: "Møt andre i samme område.",
    online: 0,
    tags: ["region", "nettverk"],
  },
];

const peopleInRoom = (n: number) => {
  const shuffled = [...mockUsers].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.max(1, Math.min(n, mockUsers.length)));
};

export default function NordConnect() {
  const [rooms, setRooms] = useState(initialRooms);
  const [query, setQuery] = useState("");
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [joined, setJoined] = useState<string | null>(null);
  const [notifications] = useState<string[]>(["3 er i Kaffepraten nå – bli med!", "Fadder-kveld i Trivselsprat kl 19:30 i dag."]);

  const filteredRooms = useMemo(() => {
    const q = query.toLowerCase();
    return rooms.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [rooms, query]);

  const handleJoin = (roomId: string) => {
    setJoined(roomId);
    setRooms(rs => rs.map(r => r.id === roomId ? { ...r, online: r.online + 1 } : r));
  };

  const handleLeave = (roomId: string) => {
    setJoined(null);
    setRooms(rs => rs.map(r => r.id === roomId && r.online > 0 ? { ...r, online: r.online - 1 } : r));
  };

  const ActiveIcon = ({ Icon }: { Icon: any }) => (
    <div className="h-9 w-9 rounded-2xl grid place-items-center bg-blue-50">
      <Icon className="h-5 w-5" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Topbar */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-blue-600 text-white grid place-items-center font-bold">NC</div>
            <span className="font-semibold">NordConnect</span>
            <Badge variant="secondary" className="ml-2">Beta</Badge>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:underline">Om</a>
            <a href="#how" className="hover:underline">Slik funker det</a>
            <a href="#rooms" className="hover:underline">Rom</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold leading-tight">
              Der nettstudenter møtes – <span className="text-blue-600">digitalt</span>
            </motion.h1>
            <p className="mt-4 text-lg text-slate-600">
              Lavterskel, uformelt og trygt fellesskap for studenter ved Handelshøgskolen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg"><PlayCircle className="h-5 w-5 mr-2" />Bli med nå</Button>
              <Button size="lg" variant="outline"><Monitor className="h-5 w-5 mr-2" />Se demo</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Romliste */}
      <section id="rooms" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Utforsk rom</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {filteredRooms.map(r => (
            <Card key={r.id} className={`transition ${activeRoom === r.id ? "ring-2 ring-blue-500" : ""}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ActiveIcon Icon={r.icon} />
                    <div>
                      <CardTitle className="text-lg">{r.name}</CardTitle>
                      <div className="text-xs text-slate-500">{r.type}</div>
                    </div>
                  </div>
                  <Badge variant="secondary"><Users className="h-3 w-3 mr-1 inline" />{r.online} online</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">{r.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {r.tags.map(t => <Badge key={t} variant="outline">#{t}</Badge>)}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  {peopleInRoom(r.online).slice(0, 5).map((p, i) => (
                    <Avatar key={p + i} className="h-8 w-8 border">
                      <AvatarFallback>{p[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  {joined === r.id ? (
                    <>
                      <Button variant="outline" onClick={() => handleLeave(r.id)}><Headphones className="h-4 w-4 mr-2" /> Forlat</Button>
                      <Button variant="secondary"><Mic className="h-4 w-4 mr-2" /> Mute</Button>
                      <Button variant="secondary"><Video className="h-4 w-4 mr-2" /> Kamera</Button>
                    </>
                  ) : (
                    <Button onClick={() => { setActiveRoom(r.id); handleJoin(r.id); }}>
                      <PlayCircle className="h-4 w-4 mr-2" /> Bli med
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-12 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} NordConnect – prototype
      </footer>
    </div>
  );
}

function Bubble({ name, text, align = "left" }: { name: string; text: string; align?: "left" | "right" }) {
  return (
    <div className={`flex ${align === "right" ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm ${align === "right" ? "bg-blue-600 text-white" : "bg-white border"}`}>
        <div className="text-[10px] opacity-70 mb-1">{name}</div>
        <div>{text}</div>
      </div>
    </div>
  );
}
