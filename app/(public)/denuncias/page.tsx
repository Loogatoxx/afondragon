import type { Metadata } from "next";
import { ShieldCheck, TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/common/page-header";
import { FAQ } from "@/modules/complaints/data";
import { ComplaintForm } from "@/modules/complaints/components/complaint-form";
import { ProcessTracker } from "@/modules/complaints/components/process-tracker";

export const metadata: Metadata = {
  title: "Canal de denúncias · IPT",
  description: "Canal seguro e confidencial de denúncias do Instituto Politécnico de Tomar.",
};

export default function ComplaintsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8">
      <div className="space-y-3">
        <Badge variant="success">
          <ShieldCheck aria-hidden="true" />
          Confidencialidade e proteção legal
        </Badge>
        <PageHeader
          title="Canal institucional de denúncias"
          description="Espaço seguro, confidencial e independente, nos termos da Lei n.º 93/2021 (Regime Geral de Proteção de Denunciantes)."
        />
      </div>

      <Alert variant="warning">
        <TriangleAlert aria-hidden="true" />
        <AlertTitle>Proteção da sua identidade</AlertTitle>
        <AlertDescription>
          Pode optar por não revelar a sua identidade. Em qualquer caso, o IPT proíbe qualquer forma de
          retaliação contra quem denuncia.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Submeter nova denúncia</CardTitle>
            <CardDescription>Preencha os campos com o máximo de pormenor possível.</CardDescription>
          </CardHeader>
          <CardContent>
            <ComplaintForm />
          </CardContent>
        </Card>
        <div className="space-y-6">
          <ProcessTracker />
          <Card className="gap-3">
            <CardHeader>
              <CardTitle className="text-base">Enquadramento legal</CardTitle>
              <CardDescription>
                Diretiva (UE) 2019/1937 e Lei n.º 93/2021, de 20 de dezembro.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="bg-panel space-y-1 rounded-md p-3 text-sm">
                <li>• Confirmação de receção até 7 dias.</li>
                <li>• Resposta conclusiva até 3 meses.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <section aria-labelledby="faq-title" className="bg-panel space-y-4 rounded-xl border p-4 sm:p-6">
        <h2 id="faq-title" className="text-2xl font-semibold">
          Perguntas frequentes
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {FAQ.map((item) => (
            <div key={item.q} className="bg-card rounded-lg border p-4">
              <h3 className="text-heading font-semibold">{item.q}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
