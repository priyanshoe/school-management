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
import { assignmentsData, lessonsData } from "@/database/data";

export function CreateAssignment() {
  const [open, setOpen] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    subject:"",
    class_name:"",
    dueDate:"",
    teacher:""
  });

  async function handleCreate(e: any) {
    e.preventDefault();
    console.log(lessonsData);
    
    console.log(assignmentData);
    const responsePromise = axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/assignment/create`,
      assignmentData,
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
        <h2>Assignment</h2>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106 bg-white text-black">
        <form onSubmit={handleCreate}>
          <DialogHeader>
            <DialogTitle className="text-green-500 text-xl capitalize">
              Add Assignment
            </DialogTitle>
            <DialogDescription>Enter details properly</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-3">
            <div className="grid gap-3">
              <Label htmlFor="name">Subject Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                required
                value={assignmentData.subject}
                onChange={(e) => setAssignmentData({...assignmentData,subject:e.target.value})}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="class">Class</Label>
              <Input
                type="text"
                id="class"
                name="name"
                required
                value={assignmentData.class_name}
                onChange={(e) => setAssignmentData({...assignmentData,class_name:e.target.value})}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                type="date"
                id="dueDate"
                name="name"
                required
                value={assignmentData.dueDate}
                onChange={(e) => setAssignmentData({...assignmentData,dueDate:e.target.value})}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="teacher">Teacher Email</Label>
              <Input
                type="text"
                id="teacher"
                name="name"
                required
                value={assignmentData.teacher}
                onChange={(e) => setAssignmentData({...assignmentData,teacher:e.target.value})}
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

export function UpdateAssignment(prop: { data: any }) {
  const [open, setOpen] = useState(false);
  
  
  
  const [assignmentData, setAssignmentData] = useState({
    assignment_id:0,
    subject:"",
    class_name:"",
    dueDate:"",
    teacher_email:""
  });
  
  async function handleUpdate(e: any) {
    e.preventDefault();
    try {
      const responsePromise = axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/assignment/update`,
        assignmentData,
        { withCredentials: true },
      );
      toast.promise(responsePromise, {
        loading: "Connecting...",
        success: (res) => {
          setOpen(false)
          return res.data.message || "Assignment data updated";
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
          setAssignmentData({
            ...assignmentData,
            assignment_id:prop.data.assignment_id,
            subject: prop.data.subject,
            class_name: prop.data.class_name,
            dueDate: prop.data.dueDate?.split("T")[0],
            teacher_email: prop.data.teacher_email,
          })
        }
      >
        <SquarePen size={15} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-106 bg-white text-black">
        <form onSubmit={handleUpdate}>
          <DialogHeader>
            <DialogTitle className="text-purple-400 text-xl capitalize">
              Update Assignment
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
                value={assignmentData.subject}
                onChange={(e) => setAssignmentData({...assignmentData,subject:e.target.value})}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="class">Class</Label>
              <Input
                type="text"
                id="class"
                name="name"
                required
                value={assignmentData.class_name}
                onChange={(e) => setAssignmentData({...assignmentData,class_name:e.target.value})}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                type="date"
                id="dueDate"
                name="name"
                required
                value={assignmentData.dueDate}
                onChange={(e) => setAssignmentData({...assignmentData,dueDate:e.target.value})}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="teacher">Teacher Email</Label>
              <Input
                type="text"
                id="teacher"
                name="name"
                required
                value={assignmentData.teacher_email}
                onChange={(e) => setAssignmentData({...assignmentData,teacher_email:e.target.value})}
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

export function DeleteAssignment(prop: { data: any }) {
  const [assignmentData, setAssignmentData] = useState({
    subject:"",
    class_name:"",
  });

  async function handleDelete() {
    try {
      const responsePromise = axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/assignment/delete`,
        { data: assignmentData, withCredentials: true },
      );
      toast.promise(responsePromise, {
        loading: "Connecting...",
        success: (res) => {
          setTimeout(() => {
            window.location.reload();
          }, 1200);
          return `${assignmentData.subject} deleted`;
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
          setAssignmentData({
            subject: prop.data.subject,
            class_name: prop.data.class_name,
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
            <span className="font-bold">{` ${assignmentData.subject}(${assignmentData.class_name}) `}</span>{" "}
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
