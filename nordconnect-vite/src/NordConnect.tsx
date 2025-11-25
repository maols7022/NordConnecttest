import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Coffee,
  BookOpen,
  Heart,
  MessageCircle,
  MapPin,
  Users,
  Sparkles,
  Shield,
  Smile,
  Bell,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Globe,
  ChevronRight,
  Clock,
  ScreenShare,
  ScreenShareOff,
  FileUp,
  Expand,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

// -------------------------------
// Mock-data og konstanter
// -------------------------------

const mockUsers = [
  "Anna",
  "Bjørn",
  "Chen",
  "Dina",
  "Elias",
  "Fatima",
  "Gustav",
  "Hanna",
];

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
    description: "Spørsmål, notater og samarbeid.",
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

// Stabil deltakerliste – ingen randomisering
const peopleInRoom = (n: number) => mockUsers.slice(0, n);

// -------------------------------
// Hovedkomponent
// -------------------------------

export default function NordConnect() {
  const [rooms, setRooms] = useState(initialRooms);
  const [query, setQuery] = useState("");

  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [joined, setJoined] = useState<string | null>(null);

  const [notifications] = useState<string[]>([
    "3 er i Kaffepraten nå – bli med!",
    "Fadder-kveld i Trivselsprat kl 19:30 i dag.",
  ]);

  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  // Kontroller for popup-rom
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Filter søk
  const filteredRooms = useMemo(() => {
    const q = query.toLowerCase();
    return rooms.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [rooms, query]);

  const handleJoin = (roomId: string) => {
    setJoined(roomId);
    setRooms((rs) =>
      rs.map((r) =>
        r.id === roomId ? { ...r, online: r.online + 1 } : r
      )
    );

    // Reset kontroller
    setIsMuted(false);
    setIsDeafened(false);
    setIsCameraOff(false);
    setIsScreenSharing(false);
  };

  const handleLeave = (roomId: string) => {
    setJoined(null);
    setRooms((rs) =>
      rs.map((r) =>
        r.id === roomId && r.online > 0
          ? { ...r, online: r.online - 1 }
          : r
      )
    );
  };

  const ActiveIcon = ({ Icon }: { Icon: any }) => (
    <div className="h-9 w-9 rounded-2xl grid place-items-center bg-blue-50">
      <Icon className="h-5 w-5" />
    </div>
  );

  // -------------------------------
  // JSX retur
  // -------------------------------

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* TOPPLINJE */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 grid grid-cols-3 items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-blue-600 text-white grid place-items-center font-bold">
              NC
            </div>
            <span className="font-semibold">NordConnect</span>
            <Badge variant="secondary" className="ml-2">
              Beta
            </Badge>
          </div>

          {/* Meny (desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-sm justify-center">
            <a href="#about" className="hover:underline">
              Om
            </a>
            <Link to="/how-it-works" className="hover:underline">
              Slik funker det
            </Link>
            <a href="#rooms" className="hover:underline">
              Rom
            </a>

            {/* Demoer-dropdown i toppmenyen */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDemoMenuOpen((v) => !v)}
                className="inline-flex items-center gap-1 hover:underline"
              >
                Demoer
                <ChevronRight className="h-3 w-3 rotate-90" />
              </button>
              {demoMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md border bg-white shadow-lg text-sm z-50 hidden md:block">
                  <Link
                    to="/quiz-demo"
                    className="block px-3 py-2 hover:bg-slate-50"
                    onClick={() => setDemoMenuOpen(false)}
                  >
                    Kamera-demo: Quizkveld
                  </Link>
                  <Link
                    to="/study-demo"
                    className="block px-3 py-2 hover:bg-slate-50"
                    onClick={() => setDemoMenuOpen(false)}
                  >
                    Kamera-demo: Studiegruppe
                  </Link>
                  <Link
                    to="/breakout-demo"
                    className="block px-3 py-2 hover:bg-slate-50"
                    onClick={() => setDemoMenuOpen(false)}
                  >
                    Breakout-rom (demo)
                  </Link>
                  <Link
                    to="/gamification-demo"
                    className="block px-3 py-2 hover:bg-slate-50"
                    onClick={() => setDemoMenuOpen(false)}
                  >
                    Gamification
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Høyre */}
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" className="hidden md:inline-flex">
              <Bell className="h-4 w-4 mr-2" /> Varsler
            </Button>

            <Button className="hidden md:inline-flex">
              <Globe className="h-4 w-4 mr-2" /> Logg inn
            </Button>

            {/* Mobilmeny */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Meny</Button>
                </SheetTrigger>

                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>NordConnect</SheetTitle>
                  </SheetHeader>

                  <div className="mt-6 grid gap-4">
                    <a href="#about" className="hover:underline">
                      Om
                    </a>
                    <Link to="/how-it-works" className="hover:underline">
                      Slik funker det
                    </Link>
                    <a href="#rooms" className="hover:underline">
                      Rom
                    </a>

                    {/* DEMO-lenker på mobil (direkte) */}
                    <Link to="/quiz-demo" className="hover:underline">
                      Kamera-demo: Quiz
                    </Link>
                    <Link to="/study-demo" className="hover:underline">
                      Kamera-demo: Studiegruppe
                    </Link>
                    <Link to="/breakout-demo" className="hover:underline">
                      Breakout-demo
                    </Link>
                    <Link to="/gamification-demo" className="hover:underline">
                      Gamification
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* HERO – venstrejustert, uten knapp, med notif-badges */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Der nettstudenter møtes –{" "}
            <span className="text-blue-600">digitalt</span>
          </h1>

          <p className="mt-4 text-lg text-slate-600 max-w-xl">
            Lavterskel, uformelt og trygt fellesskap for studenter ved
            Handelshøgskolen. Hopp inn i et rom når du vil – prat, studer
            eller bare vær til stede.
          </p>

          {/* Notifikasjoner slik du likte dem */}
          <div className="mt-6 flex items-center gap-2 text-sm text-slate-600 flex-wrap">
            <Clock className="h-4 w-4" />
            <div className="flex flex-wrap gap-2">
              {notifications.map((n, i) => (
                <Badge key={i} variant="secondary">
                  {n}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coffee className="h-5 w-5" /> Lav terskel
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600">
              Kamera valgfritt, ingen prestasjonspress. Kom inn og ut når du vil.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" /> Trygge rammer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600">
              Moderering fra faddere, fokus på trivsel og trygghet.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" /> Integrert i hverdagen
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600">
              Lenkes fra Canvas/Teams. Korte faste møtetidspunkt.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ROM */}
      <section id="rooms" className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <h2 className="text-2xl font-bold">Utforsk rom</h2>

          <div className="flex items-center gap-2 max-w-md w-full">
            <Input
              placeholder="Søk i rom..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="secondary">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredRooms.map((r) => (
            <Card
              key={r.id}
              className={`transition-all flex flex-col justify-between h-[260px] hover:shadow-lg hover:-translate-y-1 ${
                activeRoom === r.id ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <ActiveIcon Icon={r.icon} />
                  <div>
                    <CardTitle className="text-lg">{r.name}</CardTitle>
                    <div className="text-xs text-slate-500">{r.type}</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col justify-between flex-grow">
                <div>
                  <p className="text-sm text-slate-600">{r.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {r.tags.map((t) => (
                      <Badge key={t} variant="outline">
                        #{t}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Badge variant="secondary">
                    <Users className="h-3 w-3 inline-block mr-1" />
                    {r.online} online
                  </Badge>

                  <div className="flex gap-2">
                    {joined === r.id ? (
                      <Button variant="outline" onClick={() => handleLeave(r.id)}>
                        Forlat
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setActiveRoom(r.id);
                          handleJoin(r.id);
                        }}
                      >
                        Bli med
                      </Button>
                    )}

                    <Link
                      to={`/room/${r.id}`}
                      className="inline-flex items-center justify-center rounded-md border h-9 w-9"
                    >
                      <Expand className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Info-dialog */}
                <div className="mt-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Info</Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{r.name}</DialogTitle>
                        <DialogDescription>
                          {r.description}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="text-sm text-slate-600 space-y-2">
                        <div className="flex items-center gap-2">
                          <Smile className="h-4 w-4" />
                          Inkluderende og lav terskel
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Moderert trygghetsrom
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 text-sm text-slate-600">
          <div>
            <div className="font-semibold text-slate-800">NordConnect</div>
            <p className="mt-2">Den digitale studentstua for nettstudenter.</p>
          </div>

          <div>
            <div className="font-semibold text-slate-800">Lenker</div>
            <ul className="mt-2 space-y-1">
              <li>
                <a className="hover:underline" href="#about">
                  Om prosjektet
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#rooms">
                  Rom
                </a>
              </li>
              <li>
                <Link className="hover:underline" to="/how-it-works">
                  Slik funker det
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-slate-800">Kontakt</div>
            <ul className="mt-2 space-y-1">
              <li>Studentteamet @ Handelshøgskolen</li>
              <li>personvern@nordconnect.example</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400 pb-6">
          © {new Date().getFullYear()} NordConnect · prototype
        </div>
      </footer>

      {/* POPUP: Aktivt rom */}
      <Dialog
        open={!!activeRoom}
        onOpenChange={(open) => !open && setActiveRoom(null)}
      >
        <DialogContent className="max-w-5xl relative">
          {activeRoom && (
            <Link
              to={`/room/${activeRoom}`}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border bg-white/80 hover:bg-slate-100"
            >
              <Expand className="h-4 w-4" />
            </Link>
          )}

          <DialogHeader>
            <DialogTitle>
              {rooms.find((r) => r.id === activeRoom)?.name}
            </DialogTitle>
            <DialogDescription>
              Uformell prat. Kamera valgfritt. Dette er en demo.
            </DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-3 gap-4">
            {/* VENSTRE: Kamera + chat */}
            <div className="md:col-span-2 rounded-xl p-3 border bg-slate-50">
              {/* Kamera visning */}
              {!isCameraOff && (
                <div className="mb-3 rounded-xl border overflow-hidden bg-slate-900 text-white h-48 relative">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-sm opacity-80">
                      [ Kamera – demo ]
                    </span>
                  </div>

                  <div className="absolute left-0 right-0 bottom-0 bg-black/50 px-3 py-1 text-[10px] flex justify-between">
                    <span>Du</span>
                    <span>{isMuted ? "Mic av" : "Mic på"}</span>
                  </div>
                </div>
              )}

              <div className="text-xs text-slate-500 mb-2">Tekstchat (mock)</div>

              <div className="space-y-2 max-h-72 overflow-auto bg-white border rounded-xl p-3">
                <Bubble
                  name="Anna"
                  text="Hei! Hvordan går det med innleveringen?"
                />
                <Bubble
                  name="Bjørn"
                  text="Tar en 25-min fokusøkt ☕"
                  align="right"
                />
                <Bubble
                  name="Chen"
                  text="Noen som vil sparre på metode-delen?"
                />
              </div>

              <div className="mt-3 flex gap-2">
                <Button variant="outline" className="shrink-0">
                  <FileUp className="h-4 w-4" />
                </Button>
                <Input placeholder="Skriv en melding…" className="flex-1" />
                <Button className="shrink-0">Send</Button>
              </div>
            </div>

            {/* HØYRE: Deltakere + kontroller */}
            <div className="bg-white rounded-xl p-3 border">
              <div className="text-xs text-slate-500 mb-2">Deltakere</div>

              <div className="grid grid-cols-2 gap-2">
                {peopleInRoom(6).map((p, i) => (
                  <div
                    key={p + i}
                    className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg"
                  >
                    <Avatar className="h-7 w-7 border">
                      <AvatarFallback>{p[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{p}</span>
                  </div>
                ))}
              </div>

              {/* Knapperekke */}
              <div className="mt-3 flex flex-wrap gap-2">
                {/* Mic */}
                <Button
                  className={`rounded-full p-3 ${
                    isMuted
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                  variant="ghost"
                  onClick={() => setIsMuted((prev) => !prev)}
                >
                  {isMuted ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>

                {/* Lyd */}
                <Button
                  className={`rounded-full p-3 ${
                    isDeafened
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                  variant="ghost"
                  onClick={() => setIsDeafened((prev) => !prev)}
                >
                  {isDeafened ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>

                {/* Kamera */}
                <Button
                  className={`rounded-full p-3 ${
                    isCameraOff
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                  variant="ghost"
                  onClick={() => setIsCameraOff((prev) => !prev)}
                >
                  {isCameraOff ? (
                    <VideoOff className="h-4 w-4" />
                  ) : (
                    <Video className="h-4 w-4" />
                  )}
                </Button>

                {/* Skjermdeling */}
                <Button
                  className={`rounded-full p-3 ${
                    isScreenSharing
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                  variant="ghost"
                  onClick={() => setIsScreenSharing((prev) => !prev)}
                >
                  {isScreenSharing ? (
                    <ScreenShareOff className="h-4 w-4" />
                  ) : (
                    <ScreenShare className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <Button
                className="mt-3 w-full"
                variant="outline"
                onClick={() => setActiveRoom(null)}
              >
                Lukk rom
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// -------------------------------
// Chat-boble
// -------------------------------

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
