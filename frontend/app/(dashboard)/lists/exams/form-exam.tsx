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

export function CreateExam() {
  const [open, setOpen] = useState(false);
  const [examData, setExamData] = useState({
    subject:"",
    date:"",
    class_name:"",
    teacher:""
  });

  async function handleCreate(e: any) {
    e.preventDefault();
    console.log(examData);
    const responsePromise = axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/exam/create`,
      examData,
      { withCredentials: true },
    );

    toast.promise(responsePromise, {
      loading: "Connecting...",
      success: (res) => {
        return res.data.message || "exam created";
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
        <h2>Exam</h2>
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
              <Label htmlFor="name">Subject Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                required
                value={examData.subject}
                onChange={(e) => setExamData({...examData,subject:e.target.value})}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="examDate">Exam Date</Label>
              <Input
                type="date"
                id="examDate"
                name="name"
                required
                value={examData.date}
                onChange={(e) => setExamData({...examData,date:e.target.value})}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="class">Class</Label>
              <Input
                type="text"
                id="class"
                name="name"
                required
                value={examData.class_name}
                onChange={(e) => setExamData({...examData,class_name:e.target.value})}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="teacher">Teacher Name</Label>
              <Input
                type="text"
                id="teacher"
                name="name"
                required
                value={examData.teacher}
                onChange={(e) => setExamData({...examData,teacher:e.target.value})}
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
        success: (res) => {
          setOpen(false)
          return res.data.message || "Subject name updated";
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

export function DeleteExam(prop: { data: any }) {
  const [examData, setExamDate] = useState({
    subject:"",
    class_name:"",
    date:""
  });

  async function handleDelete() {
    try {
      const responsePromise = axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/exam/delete`,
        { data: examData, withCredentials: true },
      );
      toast.promise(responsePromise, {
        loading: "Connecting...",
        success: (res) => {
          setTimeout(() => {
            window.location.reload();
          }, 1200);
          return `${examData.subject} deleted`;
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
          setExamDate({
            subject: prop.data.subject,
            class_name: prop.data.class,
            date: prop.data.date,
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
            <span className="font-bold">{` ${examData.subject}(${examData.class_name}) `}</span>{" "}
            schedueled for {new Date(examData.date).toDateString()},
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
