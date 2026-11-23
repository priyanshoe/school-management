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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { SquarePen, Trash2 } from "lucide-react";

export function CreateAnnouncement() {
  const [open, setOpen] = useState(false);
  const [annData, setAnnData] = useState({
    title: "",
    desc: "",
    class_name: "All Classes",
    date: new Date().toISOString().split("T")[0],
    time: "All Day",
    priority: "medium",
  });

  async function handleCreate(e: any) {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    const responsePromise = axios.post(`${apiUrl}/announcement/create`, annData, { withCredentials: true });

    toast.promise(responsePromise, {
      loading: "Publishing...",
      success: (res) => {
        setOpen(false);
        setTimeout(() => window.location.reload(), 800);
        return res.data.message || "Announcement published";
      },
      error: (err) => err?.response?.data?.message || "Failed to publish",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs px-3 py-1.5 h-auto rounded-md shadow-sm">
          + Add Announcement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white text-black">
        <form onSubmit={handleCreate}>
          <DialogHeader>
            <DialogTitle className="text-indigo-600 text-lg font-bold">New Announcement</DialogTitle>
            <DialogDescription>Broadcast a notice to the school community.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-3 text-sm">
            <div>
              <Label htmlFor="ann-title">Title *</Label>
              <Input
                id="ann-title"
                required
                placeholder="e.g. Library Closure for Maintenance"
                value={annData.title}
                onChange={(e) => setAnnData({ ...annData, title: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="ann-desc">Description</Label>
              <Textarea
                id="ann-desc"
                rows={2}
                placeholder="Full notice text"
                value={annData.desc}
                onChange={(e) => setAnnData({ ...annData, desc: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="ann-class">Class</Label>
                <Input
                  id="ann-class"
                  placeholder="All Classes or specific"
                  value={annData.class_name}
                  onChange={(e) => setAnnData({ ...annData, class_name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="ann-priority">Priority</Label>
                <select
                  id="ann-priority"
                  className="w-full mt-1 border border-slate-200 rounded-md p-2 text-sm bg-white"
                  value={annData.priority}
                  onChange={(e) => setAnnData({ ...annData, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="ann-date">Date *</Label>
                <Input
                  id="ann-date"
                  type="date"
                  required
                  value={annData.date}
                  onChange={(e) => setAnnData({ ...annData, date: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="ann-time">Time</Label>
                <Input
                  id="ann-time"
                  placeholder="All Day or 10:00 - 11:00"
                  value={annData.time}
                  onChange={(e) => setAnnData({ ...annData, time: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">Publish</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function UpdateAnnouncement({ data }: { data: any }) {
  const [open, setOpen] = useState(false);
  const [annData, setAnnData] = useState({
    id: data.id,
    title: data.title,
    desc: data.desc || "",
    class_name: data.class || "All Classes",
    date: data.date ? String(data.date).split("T")[0] : "",
    time: data.time || "All Day",
    priority: data.priority || "medium",
  });

  async function handleUpdate(e: any) {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    const responsePromise = axios.patch(`${apiUrl}/announcement/update`, annData, { withCredentials: true });

    toast.promise(responsePromise, {
      loading: "Updating...",
      success: (res) => {
        setOpen(false);
        setTimeout(() => window.location.reload(), 800);
        return res.data.message || "Announcement updated";
      },
      error: (err) => err?.response?.data?.message || "Failed to update",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className="text-purple-700 hover:text-purple-900" aria-label="Edit announcement">
          <SquarePen size={15} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white text-black">
        <form onSubmit={handleUpdate}>
          <DialogHeader>
            <DialogTitle className="text-purple-600 text-lg font-bold">Edit Announcement</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-3 text-sm">
            <div>
              <Label htmlFor="uann-title">Title</Label>
              <Input
                id="uann-title"
                required
                value={annData.title}
                onChange={(e) => setAnnData({ ...annData, title: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="uann-desc">Description</Label>
              <Textarea
                id="uann-desc"
                rows={2}
                value={annData.desc}
                onChange={(e) => setAnnData({ ...annData, desc: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="uann-class">Class</Label>
                <Input
                  id="uann-class"
                  value={annData.class_name}
                  onChange={(e) => setAnnData({ ...annData, class_name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="uann-priority">Priority</Label>
                <select
                  id="uann-priority"
                  className="w-full mt-1 border border-slate-200 rounded-md p-2 text-sm bg-white"
                  value={annData.priority}
                  onChange={(e) => setAnnData({ ...annData, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="uann-date">Date</Label>
              <Input
                id="uann-date"
                type="date"
                value={annData.date}
                onChange={(e) => setAnnData({ ...annData, date: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteAnnouncement({ data }: { data: any }) {
  async function handleDelete() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    const responsePromise = axios.delete(`${apiUrl}/announcement/delete`, {
      data: { id: data.id },
      withCredentials: true,
    });

    toast.promise(responsePromise, {
      loading: "Deleting...",
      success: () => {
        setTimeout(() => window.location.reload(), 800);
        return "Announcement deleted";
      },
      error: (err) => err?.response?.data?.message || "Failed to delete",
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button type="button" className="text-red-600 hover:text-red-800" aria-label="Delete announcement">
          <Trash2 size={15} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600 font-bold">Delete Announcement</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete announcement &quot;{data.title}&quot;?
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
