"use client";

import { useId, useState } from "react";
import { CircleCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { CampusEvent } from "../data";

/** Upcoming events with a registration dialog (example: nothing is stored). */
export function EventList({ events }: { events: CampusEvent[] }) {
  return (
    <ul className="space-y-3">
      {events.map((event, i) => (
        <li key={event.id} className="bg-card flex items-center gap-4 rounded-lg border p-4">
          <div
            className={cn(
              "flex size-14 shrink-0 flex-col items-center justify-center rounded-md font-bold",
              i === 1 ? "bg-inverted text-inverted-foreground" : "bg-primary text-primary-foreground",
            )}
          >
            <span className="text-lg leading-none">{event.day}</span>
            <span className="text-xs">{event.month}</span>
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <Badge variant={event.tagVariant === "brand" ? "default" : event.tagVariant}>
              {event.tag}
            </Badge>
            <p className="text-heading font-semibold">{event.title}</p>
            <p className="text-muted-foreground text-sm">{event.place}</p>
          </div>
          <EventDialog event={event} />
        </li>
      ))}
    </ul>
  );
}

function EventDialog({ event }: { event: CampusEvent }) {
  const id = useId();
  const [done, setDone] = useState(false);
  const register = event.action === "register";

  return (
    <Dialog onOpenChange={(open) => !open && setDone(false)}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" aria-label={`${register ? "Registo" : "Detalhes"}: ${event.title}`}>
          {register ? "Registo" : "Detalhes"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>
            {event.day} {event.month} · {event.place}
          </DialogDescription>
        </DialogHeader>
        {!register ? (
          <p>Entrada livre, sem inscrição. Traga amigos e família.</p>
        ) : done ? (
          <Alert variant="success" aria-live="polite">
            <CircleCheck aria-hidden="true" />
            <AlertTitle>Inscrição registada</AlertTitle>
            <AlertDescription>Vai receber a confirmação por email (exemplo).</AlertDescription>
          </Alert>
        ) : (
          <form
            id={`${id}-form`}
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor={`${id}-name`}>Nome</Label>
              <Input id={`${id}-name`} autoComplete="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input id={`${id}-email`} type="email" autoComplete="email" required />
            </div>
          </form>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{done || !register ? "Fechar" : "Cancelar"}</Button>
          </DialogClose>
          {register && !done && (
            <Button type="submit" form={`${id}-form`}>
              Confirmar inscrição
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
