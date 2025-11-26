import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Coffee, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutProjectPage() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Topplinje */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="outline" onClick={() => nav(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tilbake
          </Button>
          <div className="text-sm text-slate-500">/about</div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* Intro */}
        <section>
          <Badge variant="secondary">Om NordConnect</Badge>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold">
            Prosjektet NordConnect
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            NordConnect er en prototype på en digital{" "}
            <span className="font-semibold">studentstue for nettstudenter</span>
            . Målet er å bygge et lavterskel, trygt og sosialt miljø for studenter
            som ellers sitter mye alene – uten å lage enda et tungt møteromssystem.
          </p>
        </section>

        {/* Tre hovedideer */}
        <section className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coffee className="h-5 w-5" />
                Lav terskel
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Rommene skal føles som en åpen dør, ikke som et formelt møte.
              Du kan hoppe inn for fem minutter, lytte, skrive, eller bare ha
              kamera av og være til stede.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Trygge rammer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Faddere og ambassadører bidrar til å holde god tone, inkludere nye
              deltakere og gripe inn hvis noe føles ubehagelig. Det skal være
              tydelig at noen passer på rommene.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                I hverdagen, ikke ved siden av
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Tanken er at NordConnect lenkes fra Canvas/Teams og brukes rundt
              eksisterende undervisning, ikke som et eget «prosjekt» ved siden av.
            </CardContent>
          </Card>
        </section>

        {/* Hvordan det er tenkt brukt */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Hvordan det er tenkt brukt</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Plattformen er bygget rundt faste typer rom:{" "}
            <span className="font-medium">kaffeprat, fokussoner, faggrupper</span>{" "}
            og <span className="font-medium">trivselsrom</span>. I stedet for at
            alt organiseres via én stor chat eller tilfeldige møter, får
            studentene tydelige steder å gå til for ulike behov:
          </p>
          <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
            <li>
              <span className="font-medium">Kaffepraten:</span> små øyeblikk av
              sosial kontakt mellom økter.
            </li>
            <li>
              <span className="font-medium">Fokusrom:</span> felles studietid med
              stille-modus og korte pauser.
            </li>
            <li>
              <span className="font-medium">Fagrom:</span> uformelle faglige
              spørsmål, deling av notater og samarbeid.
            </li>
            <li>
              <span className="font-medium">Trivselsrom:</span> modererte rom
              der det er lov å si at ting er litt tungt eller ensomt.
            </li>
          </ul>
        </section>

        {/* Roller og moderering */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Roller og moderering</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            NordConnect forutsetter et enkelt, men tydelig rammeverk for oppførsel.
            Faddere og moderatorer kan minne om retningslinjer, dempe eller fjerne
            deltakere ved behov og sørge for at alle kan si fra hvis noe ikke føles
            greit. Plattformen er ikke ment som et anonymt forum, men som et
            forlenget sosialt rom for studenter ved samme institusjon.
          </p>
        </section>

        {/* Status */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Status: prototype</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Løsningen du ser nå er en{" "}
            <span className="font-medium">design- og konseptprototype</span>.
            Den brukes til å teste idéer, vise frem muligheter og diskutere med
            studenter og fagansatte hvordan en slik digital studentstue kan
            fungere i praksis.
          </p>
        </section>

        <div className="pt-4">
          <Button variant="outline" onClick={() => nav("/")}>
            Til forsiden
          </Button>
        </div>
      </main>
    </div>
  );
}
