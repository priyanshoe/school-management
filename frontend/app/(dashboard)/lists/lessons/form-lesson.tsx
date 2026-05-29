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

export function CreateLesson() {
  const [open, setOpen] = useState(false);
  const [lessonData, setLessonData] = useState({
    subject:"",
    class_name:"",
    teacher:""
  });

  async function handleCreate(e: any) {
    e.preventDefault();
    console.log(lessonData);
    const responsePromise = axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/lesson/create`,
      lessonData,
      { withCredentials: true },
    );

    toast.promise(responsePromise, {
      loading: "Connecting...",
      success: (res) => {
        return res.data.message || "lesson created";
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
        <h2>Lesson</h2>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106 bg-white text-black">
        <form onSubmit={handleCreate}>
          <DialogHeader>
            <DialogTitle className="text-green-500 text-xl capitalize">
              Add Lesson
            </DialogTitle>
            <DialogDescription>Enter name properly</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-3">
            <div className="grid gap-3">
              <Label htmlFor="name">Subject Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                required
                value={lessonData.subject}
                onChange={(e) => setLessonData({...lessonData,subject:e.target.value})}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="class">Class</Label>
              <Input
                type="text"
                id="class"
                name="name"
                required
                value={lessonData.class_name}
                onChange={(e) => setLessonData({...lessonData,class_name:e.target.value})}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="teacher">Teacher Email</Label>
              <Input
                type="text"
                id="teacher"
                name="name"
                required
                value={lessonData.teacher}
                onChange={(e) => setLessonData({...lessonData,teacher:e.target.value})}
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

export function UpdateLesson(prop: { data: any }) {
  const [open, setOpen] = useState(false);
  
  const [lessonData, setLessonData] = useState({
    lesson_id:0,
    subject:"",
    class_name:"",
    teacher:""
  });
  
  async function handleUpdate(e: any) {
    e.preventDefault();
    try {
      const responsePromise = axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/lesson/update`,
        lessonData,
        { withCredentials: true },
      );
      toast.promise(responsePromise, {
        loading: "Connecting...",
        success: (res) => {
          setOpen(false)
          return res.data.message || "Lesson data updated";
        },
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
          setLessonData({
            ...lessonData,
            lesson_id:prop.data.lessons_id,
            subject: prop.data.subject,
            class_name: prop.data.class,
            teacher: prop.data.teacher_email,
          })
        }
      >
        <SquarePen size={15} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-106 bg-white text-black">
        <form onSubmit={handleUpdate}>
          <DialogHeader>
            <DialogTitle className="text-purple-400 text-xl capitalize">
              Update Lesson
            </DialogTitle>
            <DialogDescription>Change the details properly</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-3">
            <div className="grid gap-3">
              <Label htmlFor="name">Subject Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                required
                value={lessonData.subject}
                onChange={(e) => setLessonData({...lessonData,subject:e.target.value})}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="class">Class</Label>
              <Input
                type="text"
                id="class"
                name="name"
                required
                value={lessonData.class_name}
                onChange={(e) => setLessonData({...lessonData,class_name:e.target.value})}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="teacher">Teacher Email</Label>
              <Input
                type="text"
                id="teacher"
                name="name"
                required
                value={lessonData.teacher}
                onChange={(e) => setLessonData({...lessonData,teacher:e.target.value})}
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

export function DeleteLesson(prop: { data: any }) {
  const [lessonData, setLessonData] = useState({
    subject:"",
    class_name:"",
  });

  async function handleDelete() {
    try {
      const responsePromise = axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/lesson/delete`,
        { data: lessonData, withCredentials: true },
      );
      toast.promise(responsePromise, {
        loading: "Connecting...",
        success: (res) => {
          setTimeout(() => {
            window.location.reload();
          }, 1200);
          return `${lessonData.subject} deleted`;
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
          setLessonData({
            subject: prop.data.subject,
            class_name: prop.data.class,
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
            This action cannot be undone. This will permanently delete
            <span className="font-bold">{` ${lessonData.subject}(${lessonData.class_name}) `}</span>{" "}
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
