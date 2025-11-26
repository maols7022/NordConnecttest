import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Shield,
  Users,
  MessageCircle,
  AlertTriangle,
  MicOff,
} from "lucide-react";

export default function SafetyPage() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Topplinje – samme stil som HowItWorksPage */}
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => nav(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tilbake
            </Button>
            <div>
              <div className="text-sm font-semibold">Trygghet og moderering</div>
              <div className="text-xs text-slate-500">
                Felles forventninger til oppførsel i alle rom på NordConnect.
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Trygt studentfellesskap
          </Badge>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Intro */}
        <section>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            Felles rammer for trygg samhandling
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            NordConnect er tenkt som en digital studentstue for nettstudenter. For at det skal
            oppleves trygt å delta, bygger plattformen på noen enkle, felles forventninger til
            oppførsel – uavhengig av hvilket rom du er i. Målet er ikke å kontrollere, men å skape
            et miljø der flere tør å være med i samtaler, også når man ikke kjenner de andre fra
            før.
          </p>
        </section>

        {/* Grunnleggende forventninger */}
        <section>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Grunnleggende forventninger til alle deltakere
          </h2>
          <Card>
            <CardContent className="py-4 text-sm text-slate-700 space-y-2">
              <p>
                Når du deltar i et rom på NordConnect, er utgangspunktet at alle skal kunne senke
                skuldrene. Det betyr blant annet:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                <li>
                  <span className="font-medium">Vis respekt</span> – snakk til folk, ikke om folk.
                  Unngå nedsettende eller krenkende kommentarer.
                </li>
                <li>
                  <span className="font-medium">Vær inkluderende</span> – slipp andre til, still
                  åpne spørsmål, og vær oppmerksom på at noen kan være mer usikre enn andre.
                </li>
                <li>
                  <span className="font-medium">Hold deg innenfor temaet</span> i fag- og fokusrom,
                  og vær ekstra varsom i rom der folk deler erfaringer fra hverdagen.
                </li>
                <li>
                  <span className="font-medium">Frivillig deling</span> – du bestemmer selv hvor mye
                  du vil dele. Det er alltid lov å være til stede uten å si så mye.
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Språk, tone og chat */}
        <section>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            Språk, tone og bruk av chat
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Hvordan vi snakker sammen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  Språk og tone har mye å si for hvor trygt et rom oppleves. Derfor er noen ting
                  alltid utenfor rammene:
                </p>
                <ul className="list-disc list-inside text-xs md:text-sm text-slate-700 space-y-1">
                  <li>personangrep, latterliggjøring eller sjikanerende kommentarer</li>
                  <li>diskriminering eller hets på bakgrunn av personlige kjennetegn</li>
                  <li>deliberat avsporing eller sabotering av samtalen</li>
                </ul>
                <p className="text-xs text-slate-500">
                  Uenighet og diskusjon er helt ok – så lenge det skjer med saklig og respektfull
                  tone.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Chat og små signaler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  Chat-feltet brukes gjerne til korte kommentarer, spørsmål eller støtte til det som
                  skjer i rommet.
                </p>
                <ul className="list-disc list-inside text-xs md:text-sm text-slate-700 space-y-1">
                  <li>unngå spam, overdreven bruk av caps lock eller “ironisk” hets</li>
                  <li>vær bevisst på at tekst kan oppleves skarpere enn muntlig tale</li>
                  <li>bruk emoji/reaksjoner for å støtte og heie, ikke for å henge ut</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Moderatoren sin rolle */}
        <section>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-600" />
            Moderatorer, faddere og vertskap
          </h2>
          <Card>
            <CardContent className="py-4 text-sm text-slate-700 space-y-3">
              <p>
                I noen rom vil det være én eller flere studenter som har en ekstra rolle – for
                eksempel fadder, studentambassadør eller vert. De har ikke ansvar for innholdet
                faglig, men for rammene rundt samtalen.
              </p>
              <p>
                I en videreutviklet løsning kan moderatorer for eksempel ha mulighet til å:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                <li>
                  <span className="font-medium">gi vennlige påminnelser</span> hvis samtalen er i
                  ferd med å bli ubehagelig
                </li>
                <li>
                  <span className="font-medium">midlertidig “mute” en deltaker</span> som forstyrrer
                  eller ikke respekterer beskjed
                </li>
                <li>
                  <span className="font-medium">fjerne en deltaker fra rommet</span> ved gjentatte
                  eller grove brudd på retningslinjene
                </li>
              </ul>
              <p className="text-xs text-slate-500 flex items-center gap-2">
                <MicOff className="h-3 w-3" />
                Tanken er at slike verktøy skal støtte et trygt miljø – ikke brukes til å
                “overvåke”, men til å ta tak når noen opplever situasjonen som ubehagelig.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Når noe ikke føles greit */}
        <section>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Hvis noe ikke føles greit
          </h2>
          <Card>
            <CardContent className="py-4 text-sm text-slate-700 space-y-2">
              <p>
                Selv med gode rammer kan det oppstå situasjoner som oppleves ubehagelige. I en
                ferdig løsning kunne NordConnect for eksempel gi:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                <li>en enkel måte å gi beskjed til vert/moderator i rommet</li>
                <li>mulighet til raskt å forlate rommet uten oppstyr</li>
                <li>lenker videre til informasjon om støtteapparat ved behov</li>
              </ul>
              <p className="text-xs text-slate-500">
                I prototypen din er dette først og fremst et konseptuelt poeng: trygghet og
                moderering må være tenkt inn fra starten, ikke lappes på i etterkant.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
