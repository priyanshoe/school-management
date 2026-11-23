"use client";

import { useRouter } from "next/navigation";
import { SquarePen, Trash2 } from "lucide-react";
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
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { DatePicker } from "@/components/app-date-picker";
import { Textarea } from "@/components/ui/textarea";

export function FormUpdate(prop: { data: any }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [teacherData, setTeacherData] = useState({
    teacher_id: prop.data.teacher_id || prop.data.id,
    name: prop.data.name || "",
    email: prop.data.email || "",
    photo: prop.data.photo || "",
    phone: prop.data.phone || "",
    address: prop.data.address || "",
    bio: prop.data.bio || "",
    blood_group: prop.data.bloodGroup || prop.data.blood_group || "",
    dob: prop.data.dob ? String(prop.data.dob).split("T")[0] : "2000-01-01",
  });

  async function handleUpdate(e: any) {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
      const responsePromise = axios.patch(`${apiUrl}/teacher/update`, teacherData, { withCredentials: true });
      toast.promise(responsePromise, {
        loading: "Updating...",
        success: () => {
          setOpen(false);
          router.refresh();
          return "Teacher's data updated";
        },
        error: (err) => err?.response?.data?.message || "Failed, try again",
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="hover:cursor-pointer" asChild>
        <button type="button" aria-label="Edit">
          <SquarePen size={15} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106 bg-white text-black">
        <form onSubmit={handleUpdate}>
          <DialogHeader>
            <DialogTitle className="text-purple-600 text-xl capitalize">Update Teacher</DialogTitle>
            <DialogDescription>Modify details accurately.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-3 text-sm">
            <div>
              <Label htmlFor="m-name">Name</Label>
              <Input
                id="m-name"
                required
                value={teacherData.name}
                onChange={(e) => setTeacherData({ ...teacherData, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="m-email">Email</Label>
              <Input
                id="m-email"
                type="email"
                required
                value={teacherData.email}
                onChange={(e) => setTeacherData({ ...teacherData, email: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="m-phone">Phone</Label>
              <Input
                id="m-phone"
                value={teacherData.phone}
                onChange={(e) => setTeacherData({ ...teacherData, phone: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="m-address">Address</Label>
              <Input
                id="m-address"
                value={teacherData.address}
                onChange={(e) => setTeacherData({ ...teacherData, address: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <DatePicker
                value={teacherData.dob}
                onChange={(d) => setTeacherData({ ...teacherData, dob: d })}
              />
              <div>
                <Label htmlFor="m-blood">Blood Group</Label>
                <Input
                  id="m-blood"
                  value={teacherData.blood_group}
                  onChange={(e) => setTeacherData({ ...teacherData, blood_group: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="m-bio">Bio</Label>
              <Textarea
                id="m-bio"
                rows={2}
                value={teacherData.bio}
                onChange={(e) => setTeacherData({ ...teacherData, bio: e.target.value })}
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

export function FormDelete(prop: { id: number; name: string }) {
  const router = useRouter();

  async function handleDelete() {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
      const responsePromise = axios.delete(`${apiUrl}/teacher/delete`, {
        data: { id: prop.id, email: "" },
        withCredentials: true,
      });
      toast.promise(responsePromise, {
        loading: "Deleting...",
        success: () => {
          router.refresh();
          return `${prop.name} deleted`;
        },
        error: (err) => err?.response?.data?.message || "Failed, try again",
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:cursor-pointer" asChild>
        <button type="button" aria-label="Delete">
          <Trash2 size={15} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl text-red-600">Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete <span className="font-bold">{prop.name}</span>.
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
