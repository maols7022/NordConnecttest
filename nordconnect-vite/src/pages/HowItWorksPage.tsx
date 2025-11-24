import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Coffee,
  Globe,
  Users,
  Mic,
  Video,
  Headphones,
  ScreenShare,
  FileUp,
  Info,
  MonitorPlay,
} from "lucide-react";

export default function HowItWorksPage() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Topplinje */}
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => nav(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tilbake
            </Button>
            <div>
              <div className="text-sm font-semibold">Slik funker det</div>
              <div className="text-xs text-slate-500">
                En kort, praktisk guide til hvordan NordConnect brukes i hverdagen.
              </div>
            </div>
          </div>
          <Badge variant="secondary">Prototype – studentfellesskap</Badge>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Intro */}
        <section>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            Hva er NordConnect?
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            NordConnect er tenkt som en <strong>digital studentstue</strong> for nettstudenter.
            I stedet for at alle sitter alene i hver sin stue, kan du hoppe inn i
            ulike rom – for kaffeprat, fokus, fagprat eller trivsel – akkurat som
            om det fantes en felles, digital campus.
          </p>
        </section>

        {/* Steg for steg */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Steg for steg – slik bruker du NordConnect</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Globe className="h-5 w-5" />
                  1. Logg inn
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 space-y-2">
                <p>
                  Du logger inn med <strong>studentkonto (SSO)</strong>. Ingen ekstra passord
                  eller kontoer – samme innlogging som til Canvas/Teams.
                </p>
                <p className="text-xs text-slate-500">
                  I prototypen er dette bare tenkt, ikke koblet opp teknisk enda.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-5 w-5" />
                  2. Velg et rom
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 space-y-2">
                <p>
                  På forsiden ser du en liste med rom, f.eks.{" "}
                  <span className="font-medium">Kaffepraten</span>,{" "}
                  <span className="font-medium">Fokusrom – stille</span> eller{" "}
                  <span className="font-medium">ENT1002 – Diskusjon</span>.
                </p>
                <p>
                  Du kan filtrere med søkefeltet – rom, type (f.eks. “Studiesone”)
                  eller tagger som <em>#fokus</em> og <em>#lav terskel</em>.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Coffee className="h-5 w-5" />
                  3. Bli med
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 space-y-2">
                <p>
                  Klikk <strong>“Bli med”</strong> for å åpne rommet. Du kan enten:
                </p>
                <ul className="list-disc list-inside text-sm">
                  <li>være med i en pop up (lite vindu), eller</li>
                  <li>åpne rommet som egen side for mer plass.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Knappene – hva betyr de? */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Hva betyr knappene i et rom?</h2>
          <Card>
            <CardContent className="py-4">
              <p className="text-sm text-slate-600 mb-4">
                Når du er inne i et rom (enten som popup eller egen side), vil du se
                en rekke knapper. I prototypen er alt bare <strong>visuell demo</strong> –
                ingen ekte lyd eller video sendes.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                      <Mic className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-medium text-sm">Mic (lyd)</div>
                      <div className="text-xs text-slate-500">
                        Ville skru mikrofonen av/på i en ekte løsning.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                      <Video className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-medium text-sm">Kamera</div>
                      <div className="text-xs text-slate-500">
                        Ville skru kamera av/på. Kamera er alltid frivillig.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                      <Headphones className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-medium text-sm">Lyd / høre på</div>
                      <div className="text-xs text-slate-500">
                        Tenkes som en “lyttemodus”, der du kan være med uten å snakke.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                      <ScreenShare className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-medium text-sm">Del skjerm (demo)</div>
                      <div className="text-xs text-slate-500">
                        For å vise oppgaver, presentasjoner eller fagstoff i små grupper.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                      <FileUp className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-medium text-sm">Del fil (demo)</div>
                      <div className="text-xs text-slate-500">
                        Kan brukes til å dele notater, maler, oppgavetekster osv.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                      <Info className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-medium text-sm">Info om rommet</div>
                      <div className="text-xs text-slate-500">
                        Forklarer rammene for rommet: lav terskel, moderering, hvem det passer for.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Demo-sider forklart */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Demoer – hvordan ulike situasjoner kan se ut</h2>
          <p className="text-sm text-slate-600 mb-4">
            På forsiden finner du en <strong>“Demoer”</strong>-knapp. Der kan du åpne egne sider
            som viser ulike scenarier:
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MonitorPlay className="h-5 w-5" />
                  Quizkveld
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 space-y-2">
                <p>
                  Her ser du en <strong>vert med kamera</strong> og flere deltakere. Målet er
                  å illustrere stemningen rundt et sosialt digitalt arrangement.
                </p>
                <Link
                  to="/quiz-demo"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Åpne quiz-demo
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-5 w-5" />
                  Studiegruppe
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 space-y-2">
                <p>
                  Viser en liten <strong>studiegruppe</strong> der noen har kamera på, andre ikke.
                  Fokus på samarbeid og trygghet i små grupper.
                </p>
                <Link
                  to="/study-demo"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Åpne studiegruppe-demo
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-5 w-5" />
                  Breakout-rom
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 space-y-2">
                <p>
                  Brukes til å illustrere at en større samling kan deles opp i flere
                  mindre grupper, f.eks. til gruppearbeid eller refleksjon.
                </p>
                <Link
                  to="/breakout-demo"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Åpne breakout-demo
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Avslutning */}
        <section>
          <Card>
            <CardContent className="py-4">
              <p className="text-sm text-slate-600">
                Denne guiden er laget for å gjøre det enkelt å forstå{" "}
                <strong>hva NordConnect prøver å løse</strong>: mindre ensomhet,
                mer struktur og et mer levende studentmiljø for nettstudenter.
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Alt du ser i prototypen er frontend og illustrasjoner – ingen ekte lyd,
                video eller innlogging. Det er et grunnlag for å diskutere konsept,
                funksjoner og videre utvikling.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
