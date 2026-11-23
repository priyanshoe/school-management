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

export function CreateEvent() {
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    desc: "",
    class_name: "All Classes",
    date: new Date().toISOString().split("T")[0],
    startTime: "10:00",
    endTime: "11:00",
  });

  async function handleCreate(e: any) {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    const responsePromise = axios.post(`${apiUrl}/event/create`, eventData, { withCredentials: true });

    toast.promise(responsePromise, {
      loading: "Saving event...",
      success: (res) => {
        setOpen(false);
        setTimeout(() => window.location.reload(), 800);
        return res.data.message || "Event created successfully";
      },
      error: (err) => err?.response?.data?.message || "Failed to create event",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs px-3 py-1.5 h-auto rounded-md shadow-sm">
          + Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white text-black">
        <form onSubmit={handleCreate}>
          <DialogHeader>
            <DialogTitle className="text-indigo-600 text-lg font-bold">Add School Event</DialogTitle>
            <DialogDescription>Schedule an activity or milestone.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-3 text-sm">
            <div>
              <Label htmlFor="ev-title">Event Title *</Label>
              <Input
                id="ev-title"
                required
                placeholder="e.g. Annual Sports Day"
                value={eventData.title}
                onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="ev-desc">Description</Label>
              <Textarea
                id="ev-desc"
                rows={2}
                placeholder="Details about the event"
                value={eventData.desc}
                onChange={(e) => setEventData({ ...eventData, desc: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="ev-class">Class</Label>
                <Input
                  id="ev-class"
                  placeholder="All Classes or specific"
                  value={eventData.class_name}
                  onChange={(e) => setEventData({ ...eventData, class_name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="ev-date">Date *</Label>
                <Input
                  id="ev-date"
                  type="date"
                  required
                  value={eventData.date}
                  onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="ev-start">Start Time</Label>
                <Input
                  id="ev-start"
                  placeholder="10:00"
                  value={eventData.startTime}
                  onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="ev-end">End Time</Label>
                <Input
                  id="ev-end"
                  placeholder="12:00"
                  value={eventData.endTime}
                  onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function UpdateEvent({ data }: { data: any }) {
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState({
    id: data.id,
    title: data.title,
    desc: data.desc || "",
    class_name: data.class || "All Classes",
    date: data.date ? String(data.date).split("T")[0] : "",
    startTime: data.startTime || "10:00",
    endTime: data.endTime || "11:00",
  });

  async function handleUpdate(e: any) {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    const responsePromise = axios.patch(`${apiUrl}/event/update`, eventData, { withCredentials: true });

    toast.promise(responsePromise, {
      loading: "Updating event...",
      success: (res) => {
        setOpen(false);
        setTimeout(() => window.location.reload(), 800);
        return res.data.message || "Event updated successfully";
      },
      error: (err) => err?.response?.data?.message || "Failed to update",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className="text-purple-700 hover:text-purple-900" aria-label="Edit event">
          <SquarePen size={15} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white text-black">
        <form onSubmit={handleUpdate}>
          <DialogHeader>
            <DialogTitle className="text-purple-600 text-lg font-bold">Update Event</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-3 text-sm">
            <div>
              <Label htmlFor="uev-title">Title</Label>
              <Input
                id="uev-title"
                required
                value={eventData.title}
                onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="uev-desc">Description</Label>
              <Textarea
                id="uev-desc"
                rows={2}
                value={eventData.desc}
                onChange={(e) => setEventData({ ...eventData, desc: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="uev-class">Class</Label>
                <Input
                  id="uev-class"
                  value={eventData.class_name}
                  onChange={(e) => setEventData({ ...eventData, class_name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="uev-date">Date</Label>
                <Input
                  id="uev-date"
                  type="date"
                  value={eventData.date}
                  onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                  className="mt-1"
                />
              </div>
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

export function DeleteEvent({ data }: { data: any }) {
  async function handleDelete() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    const responsePromise = axios.delete(`${apiUrl}/event/delete`, {
      data: { id: data.id },
      withCredentials: true,
    });

    toast.promise(responsePromise, {
      loading: "Deleting...",
      success: () => {
        setTimeout(() => window.location.reload(), 800);
        return "Event deleted";
      },
      error: (err) => err?.response?.data?.message || "Failed to delete",
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button type="button" className="text-red-600 hover:text-red-800" aria-label="Delete event">
          <Trash2 size={15} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600 font-bold">Delete Event</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete event &quot;{data.title}&quot;?
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
