"use client"
import { usePathname, useRouter } from "next/navigation";
import { Plus, SquarePen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export function FormCreate() {
  const router = useRouter()
  const [Name, setName] = useState("User")

  const pathname = usePathname();
  const temp = pathname.split('/').pop() || "";
  const item = temp === "classes"
  ? temp.slice(0,-2)
  : temp.slice(0,-1);

  function handleCreate() {
    toast.promise<{ name: string }>(
            () =>
              new Promise((resolve,reject) =>
                setTimeout(() => resolve({name: Name}), 1500)
              ),
            {
              loading: "Creating...",
              success: (data) => `${data.name} has been created`,
              error: "failed, Try again",
            }
          )
    router.refresh()
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger className=" hover:cursor-pointer" asChild>
          <Plus size={15} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-106 bg-white text-black">
          <DialogHeader>
            <DialogTitle className="text-green-500 text-xl capitalize">Add {item}</DialogTitle>
            <DialogDescription>
              Fill the details properly
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input type="name" id="name-1" name="name" value={Name} onChange={(e)=> setName(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" />
            </div>
            {
              ['teachers','parents'].includes(temp) &&
                <div className="grid gap-3">
                  <Label htmlFor="phone">Phone</Label>
                  <Input type="phone" id="phone" name="phone" />
                </div>
            }
            <div className="grid gap-3">
              <Label htmlFor="address">Address</Label>
              <Input type="text" id="address" name="address" />
            </div>
            {
              ['students'].includes(temp) &&
                <div className="grid gap-3">
                  <DropdownClass/>
                </div>
            }
            {
              ['parents'].includes(temp) &&
                <div className="grid gap-3">
                  <DropdownStudents/>
                </div>
            }
            {
              ["teachers",].includes(temp) && 
              <div className="flex gap-2">
                <DropdownSubjects/>
                <DropdownClasses/>
              </div>
              
            }
            <div className="flex gap-2">
              <DatePicker />
              <div className="flex flex-col gap-2">
                <Label htmlFor="bloodgroup">Blood Group</Label>
                <Input type="text" id="bloodgroup" name="bloodgroup" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline" className="bg-transparent text-black hover:cursor-pointer">Cancel</Button>
              <Button type="submit" onClick={handleCreate}  className="ml-2 hover:cursor-pointer bg-green-400 hover:bg-green-500 hover:text-white text-black">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}



export function FormUpdate(prop:{data:any}) {
  const data = prop.data
  const pathname = usePathname();
  const temp = pathname.split('/').pop() || "";
  const item = temp === "classes"
  ? temp.slice(0,-2)
  : temp.slice(0,-1);

  const router = useRouter()
  function handleUpdate() {

     toast.promise<{ name: string }>(
            () =>
              new Promise((resolve,reject) =>
                setTimeout(() => resolve({name:data.name}), 2000)
              ),
            {
              loading: "Updating...",
              success: (data) => `${data.name} has been updated`,
              error: "Update failed, Try again",
            }
          )
          
    router.refresh()
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger className=" hover:cursor-pointer" asChild>
          <SquarePen size={15} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-106 bg-white text-black">
          <DialogHeader>
            <DialogTitle className="text-[#c282ff] text-xl capitalize">Edit {item}</DialogTitle>
            <DialogDescription className="">
              Make changes to your here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input type="name" id="name-1" name="name" defaultValue={data.name} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" defaultValue={data.email} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Phone</Label>
              <Input type="phone" id="phone" name="phone" defaultValue={data.phone} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="address">Address</Label>
              <Input type="text" id="address" name="address" defaultValue={data.address} />
            </div>
            <div className="flex gap-2">
              <DatePicker date={data.dob} />
              <div className="flex flex-col gap-2">
                <Label htmlFor="bloodgroup">Blood Group</Label>
                <Input type="text" id="bloodgroup" name="bloodgroup" defaultValue={data.bloodGroup} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline" className="bg-transparent text-black hover:cursor-pointer">Cancel</Button>
              <Button type="submit" className="ml-2 hover:cursor-pointer bg-[#DAB2FF] hover:bg-[#c282ff]  hover:text-white text-black" onClick={handleUpdate}>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}




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
} from "@/components/ui/alert-dialog"
import { DatePicker } from "../app-date-picker";
import { toast } from "sonner";
import { useState } from "react";
import { DropdownClass, DropdownClasses, DropdownStudents, DropdownSubjects } from "../app-dropdown";

export function FormDelete(prop: { id: number, name: string }) {

  const router = useRouter()
  function handleDelete() {
    toast.promise<{ name: string }>(
            () =>
              new Promise((resolve,reject) =>
                setTimeout(() => resolve({name:prop.name}), 1500)
              ),
            {
              loading: "Deleting...",
              success: (data) => `${data.name} has been deleted`,
              error: "Delete failed, Try again",
            }
          )
    router.refresh()
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className=" hover:cursor-pointer" asChild>
        <Trash2 size={15} />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl text-red-600">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent text-black hover:cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-[#ff7b7b] text-black hover:cursor-pointer hover:bg-[#ff3d3d] hover:text-white">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
