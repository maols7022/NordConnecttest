import React from "react";
import { Shield, Heart, Users, MessageCircle, AlertTriangle, BookOpen, Smile } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Topplinje-light for underside */}
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-500">
              NordConnect · rammer
            </div>
            <h1 className="text-2xl font-semibold mt-1 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Trygghet og moderering
            </h1>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex items-center gap-1">
            <Smile className="h-3 w-3" />
            Trygt fellesskap
          </Badge>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Introduksjon */}
        <section className="space-y-3">
          <p className="text-slate-700 text-sm md:text-base">
            NordConnect er tenkt som en digital studentstue – et sted hvor det skal være lav terskel
            for å delta, men høye ambisjoner for trygghet. Alle rom har derfor tydelige normer for
            samhandling, og enkelte rom – som <span className="font-medium">Trivselsprat</span> –
            kan være moderert av faddere eller studentambassadører som fungerer som vertskap.
          </p>
          <p className="text-slate-700 text-sm md:text-base">
            Poenget er ikke å overvåke, men å{" "}
            <span className="font-medium">holde rammene trygge</span> slik at nettstudenter kan
            senke skuldrene, delta i samtaler og be om støtte uten å måtte “ta sjansen” på hvordan
            stemningen er.
          </p>
        </section>

        {/* 3 hovedprinsipper */}
        <section className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="h-4 w-4 text-blue-600" />
                Tydelige normer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
              <p>
                Hvert rom har en enkel “plakat” med forventninger til språk, tone og hvordan man
                møter hverandre.
              </p>
              <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                <li>Snakk til folk, ikke om folk</li>
                <li>Ingen personlig hets eller nedsettende kommentarer</li>
                <li>Lav terskel for å si fra hvis noe blir ubehagelig</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Heart className="h-4 w-4 text-rose-500" />
                Trygge rom
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
              <p>
                Rom som <span className="font-medium">Trivselsprat</span> er egne støttesoner for
                å snakke om trivsel, balanse og hverdagsliv som nettstudent.
              </p>
              <p className="text-xs text-slate-600">
                Her er det ekstra tett vertskap fra faddere eller studentambassadører, og tydelig
                beskjed om at dette ikke er et faglig vurderingsrom.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4 text-emerald-600" />
                Vertskap og faddere
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
              <p>
                I utvalgte rom har én eller flere deltakere en tydelig vert-rolle – for eksempel
                fadder, studentambassadør eller moderator.
              </p>
              <p className="text-xs text-slate-600">
                Rollen er å ønske velkommen, holde samtalen inkluderende og ta grep hvis noe sklir
                ut.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Moderering i praksis */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            Hvordan moderering kan se ut i praksis
          </h2>

          <Card>
            <CardContent className="py-4 space-y-3 text-sm text-slate-700">
              <p>
                Moderering handler i stor grad om{" "}
                <span className="font-medium">tidlig og lavmælt innsats</span>. I stedet for å
                “komme inn med hammeren” forsøker vertskapet først å styre samtalen vennlig i en
                god retning.
              </p>

              <div className="grid md:grid-cols-2 gap-3 text-xs md:text-sm">
                <div className="rounded-lg bg-slate-50 border p-3 space-y-1">
                  <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <Shield className="h-4 w-4 text-blue-600" />
                    Eksempel: Trivselsprat
                  </div>
                  <p>
                    En student deler at hen synes det er tungt å være alene på studiet. Vert/fadder
                    kan:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    <li>anerkjenne opplevelsen (“takk for at du deler”)</li>
                    <li>invitere andre til å kjenne seg igjen</li>
                    <li>tipse om videre støtte-kanaler hvis det trengs</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-slate-50 border p-3 space-y-1">
                  <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Eksempel: når noe går over streken
                  </div>
                  <p>
                    Hvis kommentarer oppleves som sårende eller krenkende, kan vertskapet for
                    eksempel:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    <li>minne rolig om normene for rommet</li>
                    <li>be om at tema/skråtone endres</li>
                    <li>ta en-til-en oppfølging i etterkant ved behov</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Ulike typer rom og rammer */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-600" />
            Ulike typer rom – ulike behov for moderering
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  Fagrom og fokusrom
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 space-y-2">
                <p>
                  I faglige rom (<span className="font-medium">ENT1002 – Diskusjon</span>,
                  fokusrom osv.) er rammene ofte enklere:
                </p>
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                  <li>Hold deg til temaet</li>
                  <li>Vær konstruktiv i tilbakemeldinger</li>
                  <li>Respekter at noen vil ha kamera av</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  Trivselsrom og sosiale rom
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 space-y-2">
                <p>
                  I rom som <span className="font-medium">Trivselsprat</span> er det større rom
                  for personlige tema – og derfor også større behov for tydelig vertskap:
                </p>
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                  <li>Klar beskjed om at deling er frivillig</li>
                  <li>Rom for pauser, og for å bare “være til stede”</li>
                  <li>Lav terskel for å si ifra hvis noe blir for mye</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Avslutning / kobling til resten av plattformen */}
        <section className="space-y-3">
          <Card>
            <CardContent className="py-4 text-sm text-slate-700 space-y-2">
              <p>
                Trygghet og moderering er ikke et eget “lag” utenpå NordConnect, men noe som
                bygges inn i <span className="font-medium">romdesign, roller og språk</span> på
                plattformen.
              </p>
              <p className="text-xs text-slate-600">
                I en videre utvikling kunne dette for eksempel kobles til en enkel onboarding for
                verter/faddere, ferdige norm-plakater per romtype, og små påminnere i selve
                grensesnittet når man oppretter nye rom.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
