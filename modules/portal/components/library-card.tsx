"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/** Library loan card with a working "Renovar" button (example). */
export function LibraryCard() {
  const [renewed, setRenewed] = useState(false);
  return (
    <Card className="gap-3">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardDescription className="text-xs font-semibold tracking-wide uppercase">Biblioteca IPT</CardDescription>
          <Badge variant={renewed ? "success" : "warning"}>{renewed ? "Renovado" : "1 devolução"}</Badge>
        </div>
        <CardTitle className="text-lg">Engenharia de Software</CardTitle>
        <CardDescription>Ian Sommerville · exemplar #4412</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto flex items-center justify-between gap-2 border-t pt-3">
        <p className={renewed ? "text-success text-sm font-medium" : "text-destructive text-sm font-medium"} aria-live="polite">
          {renewed ? "Entrega até 25/10" : "Entrega até 18/10"}
        </p>
        <Button variant="link" size="sm" className="h-auto px-0" disabled={renewed} onClick={() => setRenewed(true)}>
          Renovar
        </Button>
      </CardContent>
    </Card>
  );
}
