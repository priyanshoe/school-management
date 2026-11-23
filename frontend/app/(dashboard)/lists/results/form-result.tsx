"use client";

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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { SquarePen, Trash2 } from "lucide-react";

export function CreateResult() {
  const [open, setOpen] = useState(false);
  const [resultData, setResultData] = useState({
    student: "",
    subject: "",
    class_name: "",
    teacher: "",
    date: new Date().toISOString().split("T")[0],
    score: 90,
    type: "exam",
  });

  async function handleCreate(e: any) {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    const responsePromise = axios.post(`${apiUrl}/result/create`, resultData, { withCredentials: true });

    toast.promise(responsePromise, {
      loading: "Saving result...",
      success: (res) => {
        setOpen(false);
        setTimeout(() => window.location.reload(), 800);
        return res.data.message || "Result added successfully";
      },
      error: (err) => err?.response?.data?.message || "Failed to create result",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs px-3 py-1.5 h-auto rounded-md shadow-sm">
          + Add Result
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white text-black">
        <form onSubmit={handleCreate}>
          <DialogHeader>
            <DialogTitle className="text-indigo-600 text-lg font-bold">Add Academic Result</DialogTitle>
            <DialogDescription>Record a score for an exam or assignment.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-3 text-sm">
            <div>
              <Label htmlFor="res-student">Student Name or Email *</Label>
              <Input
                id="res-student"
                required
                placeholder="Student name"
                value={resultData.student}
                onChange={(e) => setResultData({ ...resultData, student: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="res-subject">Subject *</Label>
                <Input
                  id="res-subject"
                  required
                  placeholder="e.g. Math"
                  value={resultData.subject}
                  onChange={(e) => setResultData({ ...resultData, subject: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="res-class">Class *</Label>
                <Input
                  id="res-class"
                  required
                  placeholder="e.g. 1A"
                  value={resultData.class_name}
                  onChange={(e) => setResultData({ ...resultData, class_name: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="res-score">Score (0-100) *</Label>
                <Input
                  id="res-score"
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={resultData.score}
                  onChange={(e) => setResultData({ ...resultData, score: Number(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="res-type">Type</Label>
                <Input
                  id="res-type"
                  placeholder="exam or assignment"
                  value={resultData.type}
                  onChange={(e) => setResultData({ ...resultData, type: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="res-teacher">Teacher (Optional)</Label>
              <Input
                id="res-teacher"
                placeholder="Teacher name or email"
                value={resultData.teacher}
                onChange={(e) => setResultData({ ...resultData, teacher: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="res-date">Date</Label>
              <Input
                id="res-date"
                type="date"
                value={resultData.date}
                onChange={(e) => setResultData({ ...resultData, date: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Result</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function UpdateResult({ data }: { data: any }) {
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState(data.score);
  const [type, setType] = useState(data.type || "exam");

  async function handleUpdate(e: any) {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    const responsePromise = axios.patch(
      `${apiUrl}/result/update`,
      { id: data.id, score: Number(score), type },
      { withCredentials: true }
    );

    toast.promise(responsePromise, {
      loading: "Updating result...",
      success: (res) => {
        setOpen(false);
        setTimeout(() => window.location.reload(), 800);
        return res.data.message || "Result updated successfully";
      },
      error: (err) => err?.response?.data?.message || "Failed to update",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className="text-purple-700 hover:text-purple-900" aria-label="Edit result">
          <SquarePen size={15} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm bg-white text-black">
        <form onSubmit={handleUpdate}>
          <DialogHeader>
            <DialogTitle className="text-purple-600 text-lg font-bold">Update Result</DialogTitle>
            <DialogDescription>Modify score for {data.student} ({data.subject}).</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-3 text-sm">
            <div>
              <Label htmlFor="up-score">Score (0-100)</Label>
              <Input
                id="up-score"
                type="number"
                min="0"
                max="100"
                required
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="up-type">Type</Label>
              <Input
                id="up-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteResult({ data }: { data: any }) {
  async function handleDelete() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    const responsePromise = axios.delete(`${apiUrl}/result/delete`, {
      data: { id: data.id },
      withCredentials: true,
    });

    toast.promise(responsePromise, {
      loading: "Deleting...",
      success: () => {
        setTimeout(() => window.location.reload(), 800);
        return "Result deleted";
      },
      error: (err) => err?.response?.data?.message || "Failed to delete",
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button type="button" className="text-red-600 hover:text-red-800" aria-label="Delete result">
          <Trash2 size={15} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600 font-bold">Delete Result</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this result for {data.student} ({data.subject})?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
