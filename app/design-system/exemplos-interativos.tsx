"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

/** Exemplo de Select com Label (acessível por teclado: setas + Enter). */
export function ExemploSelect() {
  const [estado, setEstado] = useState<string>();

  return (
    <div className="space-y-2">
      <Label htmlFor="ds-estado">Estado do contrato</Label>
      <Select value={estado} onValueChange={setEstado}>
        <SelectTrigger id="ds-estado">
          <SelectValue placeholder="Escolha um estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Estados</SelectLabel>
            <SelectItem value="rascunho">Rascunho</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="expirado">Expirado</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className="text-muted-foreground text-sm">
        Selecionado: {estado ?? "nenhum"}
      </p>
    </div>
  );
}

/** Exemplo de Dialog de confirmação (fecha com Esc, foco fica preso lá dentro). */
export function ExemploDialog() {
  return (
    <div className="flex flex-wrap gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Eliminar contrato</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar este contrato?</DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita. O contrato e os seus anexos serão apagados.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive">Eliminar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Novo contrato</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo contrato</DialogTitle>
            <DialogDescription>Preencha os dados principais.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ds-nome">Nome</Label>
              <Input id="ds-nome" placeholder="Ex.: Contrato de manutenção" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
