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

export function CreateSubject() {
  const [open, setOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");

  async function handleCreate(e: any) {
    e.preventDefault();
    console.log(subjectName);
    const responsePromise = axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/subject/create`,
      [subjectName],
      { withCredentials: true },
    );

    toast.promise(responsePromise, {
      loading: "Connecting...",
      success: (res) => {
        return res.data.message || "subject created";
      },
      error: (err) => err?.response?.data?.message || "Failed, try again",

      action: {
        label: "Refresh",
        onClick: () => window.location.reload(),
      },
    });
  }
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger className=" hover:cursor-pointer bg-yellow-300 hover:bg-yellow-400 w-full hover:rounded-sm">
        <h2>Subject</h2>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106 bg-white text-black">
        <form onSubmit={handleCreate}>
          <DialogHeader>
            <DialogTitle className="text-green-500 text-xl capitalize">
              Add Subject
            </DialogTitle>
            <DialogDescription>Enter name properly</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-3">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Subject Name</Label>
              <Input
                type="name"
                id="name-1"
                name="name"
                required
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="bg-transparent text-black hover:cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="ml-2 hover:cursor-pointer bg-green-400 hover:bg-green-500 hover:text-white text-black"
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function UpdateSubject(prop: { data: any }) {
  const [open, setOpen] = useState(false);
  const [subjectData, setSubjectData] = useState({
    id: 0,
    name: "",
  });
  async function handleUpdate(e: any) {
    e.preventDefault();
    try {
      const responsePromise = axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/subject/update`,
        subjectData,
        { withCredentials: true },
      );
      toast.promise(responsePromise, {
        loading: "Connecting...",
        success: (res) => res.data.message || "Subject name updated",
        error: (err) => err?.response?.data?.message || "Failed, try again",
        action: {
          label: "Refresh",
          onClick: () => window.location.reload(),
        },
      });
    } catch (err) {
      return console.error(err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger
        className=" hover:cursor-pointer"
        asChild
        onClick={() =>
          setSubjectData({
            ...subjectData,
            id: prop.data.subject_id,
            name: prop.data.name,
          })
        }
      >
        <SquarePen size={15} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-106 bg-white text-black">
        <form onSubmit={handleUpdate}>
          <DialogHeader>
            <DialogTitle className="text-purple-400 text-xl capitalize">
              Update Subject
            </DialogTitle>
            <DialogDescription>Change the details properly</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-3">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Subject Name</Label>
              <Input
                type="name"
                id="name-1"
                name="name"
                required
                value={subjectData.name}
                onChange={(e) =>
                  setSubjectData({ ...subjectData, name: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="bg-transparent text-black hover:cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="ml-2 hover:cursor-pointer bg-purple-400 hover:bg-purple-500 hover:text-white text-black"
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteSubject(prop: { data: any }) {
  const [subjectData, setSubjectData] = useState({
    id: 0,
    name: "",
  });

  async function handleDelete() {
    try {
      const responsePromise = axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/subject/delete`,
        { data: subjectData, withCredentials: true },
      );
      toast.promise(responsePromise, {
        loading: "Connecting...",
        success: (res) => {
          setTimeout(() => {
            window.location.reload();
          }, 1200);
          return `${subjectData.name} deleted`;
        },
        error: (err) => err?.response?.data?.message || "Failed, try again",
      });
    } catch (err) {
      return console.error(err);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="hover:cursor-pointer"
        asChild
        onClick={() =>
          setSubjectData({
            id: prop.data.subject_id,
            name: prop.data.name,
          })
        }
      >
        <Trash2 size={15} />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl text-red-600">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-bold">{` ${subjectData.name}(${subjectData.id}) `}</span>{" "}
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent text-black hover:cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-[#ff7b7b] text-black hover:cursor-pointer hover:bg-[#ff3d3d] hover:text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
