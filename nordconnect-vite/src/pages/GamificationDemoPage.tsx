import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Trophy,
  Flame,
  CheckCircle2,
  Star,
  Target,
  CalendarCheck,
  Sparkles,
  Users,
} from "lucide-react";

type TaskType = "sosial" | "fokus" | "trivsel";

type Task = {
  id: string;
  title: string;
  description: string;
  xp: number;
  type: TaskType;
  completed: boolean;
};

const initialTasks: Task[] = [
  {
    id: "focus-1",
    title: "Fullfør 1 fokusøkt",
    description: "Vær til stede i et fokusrom i minst 20 minutter.",
    xp: 30,
    type: "fokus",
    completed: true,
  },
  {
    id: "social-1",
    title: "Si hei i Kaffepraten",
    description: "Skriv en kort melding eller svar på noen andre.",
    xp: 20,
    type: "sosial",
    completed: false,
  },
  {
    id: "trivsel-1",
    title: "Sjekk inn i Trivselsprat",
    description: "Delta i en kort runde i trivsel-/støtterommet.",
    xp: 25,
    type: "trivsel",
    completed: false,
  },
  {
    id: "group-1",
    title: "Bli med i en faggruppe",
    description: "Bli med i et fagrom (f.eks. ENT1002) i minst 10 minutter.",
    xp: 35,
    type: "fokus",
    completed: false,
  },
];

const mockStreakDays = 5;
const mockFriends = ["Anna", "Bjørn", "Chen"];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function GamificationDemoPage() {
  const nav = useNavigate();

  const baseXP = 1200;
  const nextLevelXP = 1500;

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const earnedXP = useMemo(
    () => tasks.filter((t) => t.completed).reduce((sum, t) => sum + t.xp, 0),
    [tasks]
  );

  const totalXP = baseXP + earnedXP;
  const level = 7;
  const progressPercent = Math.min(
    100,
    Math.round((totalXP / nextLevelXP) * 100)
  );

  const completedCount = tasks.filter((t) => t.completed).length;

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const colorByType = (type: TaskType) => {
    if (type === "fokus") return "bg-blue-50 border-blue-100";
    if (type === "sosial") return "bg-emerald-50 border-emerald-100";
    return "bg-pink-50 border-pink-100";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Topplinje */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => nav(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tilbake
            </Button>
            <div>
              <div className="text-sm font-semibold">Gamification-demo</div>
              <div className="text-xs text-slate-500">
                Viser små belønninger og progresjon for deltakelse i NordConnect (kun demo).
              </div>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="hidden md:inline-flex items-center gap-1"
          >
            <Sparkles className="h-3 w-3" />
            Prototyp
          </Badge>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Øverst: XP / nivå + streak */}
        <section className="grid md:grid-cols-3 gap-4">
          {/* Nivå + XP */}
          <Card className="md:col-span-2">
            <CardHeader className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <CardTitle>Din progresjon (demo)</CardTitle>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                Nivå {level}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm mb-3">
                <div>
                  <div className="text-slate-500">XP mot neste nivå</div>
                  <div className="font-semibold">
                    {totalXP} / {nextLevelXP} XP
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  Dagens minioppgaver:{" "}
                  <span className="font-semibold text-emerald-600">
                    +{earnedXP} XP
                  </span>
                </div>
              </div>

              {/* Progress-bar */}
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500 flex justify-between">
                <span>Nivå {level}</span>
                <span>Nivå {level + 1}</span>
              </div>
            </CardContent>
          </Card>

          {/* Streak + venner */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                Streak & venner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">
                    Antall dager på rad
                  </div>
                  <div className="font-semibold flex items-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    {mockStreakDays} dagers streak
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  <CalendarCheck className="h-3 w-3 mr-1" />
                  Sikt mot 7 dager
                </Badge>
              </div>

              <div>
                <div className="text-xs text-slate-500 mb-1">
                  Venner som har vært innom i dag (demo)
                </div>
                <div className="flex -space-x-2">
                  {mockFriends.map((name) => (
                    <Avatar
                      key={name}
                      className="h-7 w-7 border-2 border-white shadow-sm bg-blue-50"
                    >
                      <AvatarFallback className="text-[10px]">
                        {initials(name)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="h-7 w-7 rounded-full border border-dashed border-slate-300 grid place-items-center bg-slate-50 text-[10px] text-slate-400">
                    +?
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  I en ekte løsning kunne dette kobles mot faktiske studievenner.
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Dagens minioppgaver */}
        <section>
          <Card>
            <CardHeader className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Dagens minioppgaver
                </CardTitle>
                <div className="text-xs text-slate-500 mt-1">
                  Små, konkrete ting som gir et lite dytt til å delta – koblet til rommene.
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {completedCount}/{tasks.length} fullført
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {tasks.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    className={`text-left rounded-xl border px-3 py-3 flex items-start gap-3 transition hover:shadow-sm focus:outline-none ${colorByType(
                      task.type
                    )}`}
                  >
                    <span
                      className={`mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
                        task.completed
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "bg-white border-slate-300 text-slate-400"
                      }`}
                    >
                      {task.completed ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <span>•</span>
                      )}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-semibold text-sm">
                          {task.title}
                        </div>
                        <Badge
                          variant="outline"
                          className="text-[10px] flex items-center gap-1"
                        >
                          <Star className="h-3 w-3 text-yellow-500" />
                          +{task.xp} XP
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        {task.description}
                      </div>
                      <div className="mt-1 text-[10px] text-slate-500">
                        {task.type === "fokus" &&
                          "Knyttet til fokus-/studierom."}
                        {task.type === "sosial" &&
                          "Knyttet til sosiale rom som Kaffepraten."}
                        {task.type === "trivsel" &&
                          "Knyttet til trivsel-/støtterom."}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Eksempler på badges */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Eksempler på badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-xl border bg-white p-3 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                      🎧
                    </span>
                    <div className="text-sm font-semibold">Stille makker</div>
                  </div>
                  <div className="text-xs text-slate-600">
                    5 fullførte fokusøkter i fokusrommet samme uke.
                  </div>
                </div>

                <div className="rounded-xl border bg-white p-3 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                      <Sparkles className="h-4 w-4 text-emerald-600" />
                    </span>
                    <div className="text-sm font-semibold">Varm velkomst</div>
                  </div>
                  <div className="text-xs text-slate-600">
                    Har ønsket 10 nye studenter velkommen i Kaffepraten.
                  </div>
                </div>

                <div className="rounded-xl border bg-white p-3 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-50">
                      <Flame className="h-4 w-4 text-orange-500" />
                    </span>
                    <div className="text-sm font-semibold">Streak-helten</div>
                  </div>
                  <div className="text-xs text-slate-600">
                    Har vært innom minst ett rom hver dag i 14 dager.
                  </div>
                </div>
              </div>

              <div className="mt-3 text-[11px] text-slate-500">
                Alt på denne siden er bare mock. I en ekte løsning kan dette kobles mot hvor
                mye og hvordan studenten faktisk deltar i rommene.
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
