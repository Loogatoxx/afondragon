"use client";

import { useState } from "react";
import {
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  Clock,
  Columns3,
  Download,
  List,
  ListChecks,
  MapPin,
  TriangleAlert,
  CalendarDays,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { SegmentedControl } from "@/components/common/segmented-control";
import { cn } from "@/lib/utils";
import {
  BASE_MONDAY,
  DELIVERIES,
  SESSIONS,
  TODAY_INDEX,
  TYPE_LABELS,
  type ClassSession,
  type ClassType,
} from "../data";
import { COL_START, ROW_SPAN, ROW_START } from "../grid-classes";

type Filter = "all" | "T" | "PL" | "TUT";
type View = "week" | "day" | "list";

const DAY_NAMES = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];
const FIRST_SLOT_MINUTES = 8 * 60 + 30; // grid starts at 08:30
const SLOT = 30;
const HOURS = ["08:30", "10:00", "12:30", "14:00", "16:30", "18:30"];

// Visual style for each class type (theme tokens only).
const TYPE_STYLE: Record<ClassType, { badge: string; border: string }> = {
  T: { badge: "bg-primary text-primary-foreground", border: "border-primary" },
  PL: { badge: "bg-success text-success-foreground", border: "border-success" },
  TP: { badge: "bg-info text-info-foreground", border: "border-info" },
  TUT: { badge: "bg-brand text-brand-foreground", border: "border-brand" },
};

function minutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function hours(session: ClassSession) {
  return (minutes(session.end) - minutes(session.start)) / 60;
}

function matches(session: ClassSession, filter: Filter) {
  if (filter === "all") return true;
  if (filter === "PL") return session.type === "PL" || session.type === "TP";
  if (filter === "T") return session.type === "T" || session.type === "TP";
  return session.type === filter;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

const shortDate = (d: Date) => d.toLocaleDateString("pt-PT", { day: "2-digit", month: "2-digit" });

/** Weekly schedule screen (G4). Example data; the real module reads queries.ts. */
export function ScheduleView() {
  const [week, setWeek] = useState(0);
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("week");
  const [day, setDay] = useState(TODAY_INDEX);

  const monday = addDays(BASE_MONDAY, week * 7);
  const friday = addDays(monday, 4);
  const sessions = SESSIONS.filter((s) => matches(s, filter));
  const todayIndex = week === 0 ? TODAY_INDEX : -1;
  const total = SESSIONS.reduce((sum, s) => sum + hours(s), 0);
  const theory = SESSIONS.filter((s) => s.type === "T").reduce((sum, s) => sum + hours(s), 0);

  function exportIcal() {
    const stamp = (d: Date, time: string) => {
      const [h, m] = time.split(":");
      return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}T${h}${m}00`;
    };
    const events = SESSIONS.map((s) => {
      const date = addDays(monday, s.day);
      return [
        "BEGIN:VEVENT",
        `UID:${s.id}-${stamp(date, s.start)}@uniportal.ipt.pt`,
        `DTSTART:${stamp(date, s.start)}`,
        `DTEND:${stamp(date, s.end)}`,
        `SUMMARY:${s.title} (${s.type})`,
        `LOCATION:${s.room}`,
        "END:VEVENT",
      ].join("\r\n");
    });
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//UniPortal IPT//PT", ...events, "END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `horario-${shortDate(monday).replace("/", "-")}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Horários académicos"
        description="Ano letivo 2026/2027 · 1.º semestre · Licenciatura em Engenharia Informática"
        actions={
          <>
            <Button variant="outline" onClick={exportIcal}>
              <CalendarPlus aria-hidden="true" />
              Exportar iCal
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              <Download aria-hidden="true" />
              Descarregar PDF
            </Button>
          </>
        }
      />

      {/* Toolbar */}
      <div className="bg-card flex flex-col gap-3 rounded-xl border p-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setWeek(0)} disabled={week === 0}>
            Hoje
          </Button>
          <Button variant="ghost" size="icon" className="size-9" aria-label="Semana anterior" onClick={() => setWeek((w) => w - 1)}>
            <ChevronLeft aria-hidden="true" />
          </Button>
          <p className="text-heading min-w-40 text-center text-sm font-medium" aria-live="polite">
            Semana de {shortDate(monday)} a {shortDate(friday)}
          </p>
          <Button variant="ghost" size="icon" className="size-9" aria-label="Semana seguinte" onClick={() => setWeek((w) => w + 1)}>
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
        <SegmentedControl<Filter>
          label="Tipo de aula"
          value={filter}
          onValueChange={setFilter}
          options={[
            { value: "all", label: "Todas" },
            { value: "T", label: "Teóricas" },
            { value: "PL", label: "Práticas" },
            { value: "TUT", label: "Tutoriais" },
          ]}
        />
        <SegmentedControl<View>
          label="Vista"
          value={view}
          onValueChange={setView}
          options={[
            { value: "week", label: <><Columns3 aria-hidden="true" />Semana</> },
            { value: "day", label: <><CalendarDays aria-hidden="true" />Dia</> },
            { value: "list", label: <><List aria-hidden="true" />Lista</> },
          ]}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-4">
        <div className="xl:col-span-3">
          {view === "week" && (
            <>
              {/* Time grid on wide screens */}
              <WeekGrid sessions={sessions} monday={monday} todayIndex={todayIndex} />
              {/* On small screens the week becomes a list */}
              <div className="md:hidden">
                <SessionList sessions={sessions} monday={monday} todayIndex={todayIndex} />
              </div>
            </>
          )}
          {view === "day" && (
            <div className="space-y-4">
              <div role="group" aria-label="Escolher dia" className="flex flex-wrap gap-2">
                {DAY_NAMES.map((name, i) => (
                  <Button
                    key={name}
                    size="sm"
                    variant={day === i ? "default" : "secondary"}
                    aria-pressed={day === i}
                    onClick={() => setDay(i)}
                  >
                    {name.split("-")[0]} {shortDate(addDays(monday, i))}
                  </Button>
                ))}
              </div>
              <SessionList
                sessions={sessions.filter((s) => s.day === day)}
                monday={monday}
                todayIndex={todayIndex}
              />
            </div>
          )}
          {view === "list" && <SessionList sessions={sessions} monday={monday} todayIndex={todayIndex} />}
        </div>

        <aside className="space-y-4" aria-label="Resumo da semana">
          <Card className="gap-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock aria-hidden="true" className="text-primary size-5" />
                Carga horária semanal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-panel rounded-lg p-4 text-center">
                <p className="font-heading text-primary text-4xl font-bold">{total}h</p>
                <p className="text-sm">Total de horas letivas</p>
              </div>
              <dl className="grid grid-cols-2 gap-1 text-sm">
                <dt>Aulas teóricas</dt>
                <dd className="text-right font-semibold">{theory} horas</dd>
                <dt>Práticas e tutoriais</dt>
                <dd className="text-right font-semibold">{total - theory} horas</dd>
              </dl>
            </CardContent>
          </Card>

          <Card className="gap-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ListChecks aria-hidden="true" className="text-primary size-5" />
                Entregas associadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {DELIVERIES.map((d) => (
                  <li key={d.id} className="bg-panel rounded-lg border p-3">
                    <p className={cn("text-xs font-semibold", d.urgent ? "text-destructive" : "text-success")}>
                      {d.when}
                    </p>
                    <p className="text-heading font-semibold">{d.title}</p>
                    <p className="text-muted-foreground text-sm">{d.detail}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Alert variant="warning">
            <TriangleAlert aria-hidden="true" />
            <AlertTitle>Alteração de sala</AlertTitle>
            <AlertDescription>
              A aula de Bases de Dados (PL) de quarta-feira passa para a sala B105 devido a
              manutenção de rede.
            </AlertDescription>
          </Alert>

          <Card className="gap-3">
            <CardHeader>
              <CardTitle className="text-base">Legenda</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {(Object.keys(TYPE_LABELS) as ClassType[]).map((type) => (
                  <li key={type} className="flex items-center gap-2">
                    <span aria-hidden="true" className={cn("size-3 shrink-0 rounded-sm", TYPE_STYLE[type].badge)} />
                    {TYPE_LABELS[type]}
                  </li>
                ))}
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="bg-warning size-3 shrink-0 rounded-sm" />
                  Alteração
                </li>
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function WeekGrid({
  sessions,
  monday,
  todayIndex,
}: {
  sessions: ClassSession[];
  monday: Date;
  todayIndex: number;
}) {
  return (
    <div className="bg-card hidden overflow-hidden rounded-xl border md:block">
      {/* Day headers */}
      <div className="grid grid-cols-6 border-b">
        <div className="text-muted-foreground p-3 text-xs font-semibold uppercase">Hora</div>
        {DAY_NAMES.map((name, i) => (
          <div
            key={name}
            className={cn("border-l p-3 text-center text-sm", i === todayIndex && "bg-brand-light")}
          >
            <p className="text-muted-foreground">
              {shortDate(addDays(monday, i))}
              {i === todayIndex && " (hoje)"}
            </p>
            <p className="text-heading font-semibold">{name}</p>
          </div>
        ))}
      </div>

      {/* 23 half-hour rows from 08:30 to 20:00 */}
      <div className="grid grid-cols-6 grid-rows-23">
        {HOURS.map((time) => (
          <div
            key={time}
            className={cn(
              "text-muted-foreground col-start-1 border-t px-3 pt-1 font-mono text-xs",
              ROW_START[(minutes(time) - FIRST_SLOT_MINUTES) / SLOT],
            )}
          >
            {time}
          </div>
        ))}
        {/* Lunch break band */}
        <div className="bg-panel text-muted-foreground col-span-5 col-start-2 row-span-3 row-start-9 flex items-center justify-center border-y text-xs italic">
          Pausa para almoço · 12h30–14h00
        </div>
        {sessions.map((s) => {
          const start = (minutes(s.start) - FIRST_SLOT_MINUTES) / SLOT;
          const span = (minutes(s.end) - minutes(s.start)) / SLOT;
          return (
            <div
              key={s.id}
              className={cn("min-h-0 p-1", COL_START[s.day + 1], ROW_START[start], ROW_SPAN[span - 1])}
            >
              <SessionCard session={s} today={s.day === todayIndex} compact />
            </div>
          );
        })}
        {/* Empty rows keep the grid height */}
        <div aria-hidden="true" className="col-start-1 row-span-23 row-start-1 min-h-224" />
      </div>
    </div>
  );
}

function SessionList({
  sessions,
  monday,
  todayIndex,
}: {
  sessions: ClassSession[];
  monday: Date;
  todayIndex: number;
}) {
  if (sessions.length === 0) {
    return <EmptyState title="Sem aulas" description="Não há aulas deste tipo no período escolhido." />;
  }
  const byDay = [0, 1, 2, 3, 4]
    .map((d) => ({ d, items: sessions.filter((s) => s.day === d).sort((a, b) => minutes(a.start) - minutes(b.start)) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="space-y-5">
      {byDay.map(({ d, items }) => (
        <section key={d} aria-labelledby={`day-${d}`} className="space-y-2">
          <h2 id={`day-${d}`} className="text-lg font-semibold">
            {DAY_NAMES[d]}, {shortDate(addDays(monday, d))}
            {d === todayIndex && <Badge className="ml-2">Hoje</Badge>}
          </h2>
          <ul className="space-y-2">
            {items.map((s) => (
              <li key={s.id}>
                <SessionCard session={s} today={d === todayIndex} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function SessionCard({ session, today, compact = false }: { session: ClassSession; today: boolean; compact?: boolean }) {
  const style = TYPE_STYLE[session.type];
  return (
    <article
      aria-label={`${session.title}, ${TYPE_LABELS[session.type]}, ${session.start} às ${session.end}`}
      className={cn(
        "bg-panel h-full space-y-1 overflow-hidden rounded-md border border-l-4 p-2 text-sm",
        session.changed ? "border-warning" : style.border,
        today && session.type === "PL" && "ring-primary ring-2",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className={cn("rounded-sm px-1.5 text-xs font-bold", style.badge)}>{session.type}</span>
        <span className="text-muted-foreground text-xs">
          {session.start}–{session.end}
        </span>
      </div>
      <p className={cn("text-heading leading-tight font-semibold", compact && "line-clamp-2")}>{session.title}</p>
      <p className="text-muted-foreground flex items-center gap-1 text-xs">
        <MapPin aria-hidden="true" className="size-3" />
        {session.room}
      </p>
      {session.teacher && !compact && <p className="text-muted-foreground text-xs">{session.teacher}</p>}
      {session.note && (
        <Badge variant={session.note.tone} className="text-xs">
          {session.note.label}
        </Badge>
      )}
    </article>
  );
}
