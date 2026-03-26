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


type Class = {
  class_id: number;
  name: string;
  class_teacher: number;
};

export function CreateClass() {
  const [open, setOpen] = useState(false);
  const [classData, setClassData] = useState<Class>({
    class_id: 0,
    name: "",
    class_teacher: 0
  });

  async function handleCreate(e: any) {
    e.preventDefault();
    console.log(classData);
    const responsePromise = axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/class/create`,
      classData,
      { withCredentials: true },
    );

    toast.promise(responsePromise, {
      loading: "Connecting...",
      success: (res) => {
        setOpen(false)
        setClassData({
          class_id: 0,
          name: "",
          class_teacher: 0
        })
        return res.data.message || "Class created";
      },
      error: (err) => err?.response?.data?.message || "Failed, try again",

      action: {
        label: "Refresh",
        onClick: () => window.location.reload(),
      },
    });
  }

  async function check() {
    const responsePromise = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teacher/${classData.class_teacher}`)
    toast.promise(responsePromise, {
      loading: "Connecting...",
      success: (res) => {
        if (res.data) return `Teacher: ${res.data.name}`
        else return "Teacher not found"
      },
      error: (err) => err?.response?.data?.message || "Failed, try again",
    });
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger className=" hover:cursor-pointer bg-yellow-300 hover:bg-yellow-400 w-full hover:rounded-sm">
        <h2>Class</h2>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106 bg-white text-black">
        <form onSubmit={handleCreate}>
          <DialogHeader>
            <DialogTitle className="text-green-500 text-xl capitalize">
              Add Class
            </DialogTitle>
            <DialogDescription>Enter name properly</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-3">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Class Name</Label>
              <Input
                type="name"
                id="name-1"
                name="name"
                required
                value={classData.name}
                onChange={(e) => setClassData({ ...classData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Class Teacher ID</Label>
              <div className="flex gap-2 items-center">

                <Input
                  type="number"
                  id="name-id"
                  name="name-id"
                  required
                  value={classData.class_teacher}
                  onChange={(e) => setClassData({ ...classData, class_teacher: Number(e.target.value) })}
                />
                <Button
                  type="reset"
                  className="hover:cursor-pointer bg-amber-400 hover:bg-amber-500 hover:text-white text-black"
                  onClick={() => check()}
                >Check</Button>
              </div>
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

export function DeleteClass(prop: { data: any }) {
  const [classData, setClassData] = useState({
    id: 0,
    name: "",
  });

  async function handleDelete() {
    try {
      const responsePromise = axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/class/delete`,
        { data: classData, withCredentials: true },
      );
      toast.promise(responsePromise, {
        loading: "Connecting...",
        success: (res) => {
          setTimeout(() => {
            window.location.reload();
          }, 1200);
          return `${classData.name} deleted`;
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
          setClassData({
            id: prop.data.class_id,
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
            <span className="font-bold">{` ${classData.name}(${classData.id}) `}</span>{" "}
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
