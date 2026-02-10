"use client"
import { SquarePen, Trash2 } from "lucide-react"
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
import axios from "axios";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DropdownClass, DropdownClasses, DropdownSubjects } from "@/components/app-dropdown";
import { DatePicker } from "@/components/app-date-picker";
import { Textarea } from "@/components/ui/textarea";
import { InputWithButton } from "@/components/app-input"




export function CreateParent() {
    const [open, setOpen] = useState(false)

    const [parentData, setParentData] = useState({
        name: "",
        email: "",
        student_email:"",
        phone: "",
        address: "",
        dob: "2026-01-10",
        blood_group: "",
        password: ""
    })

    const [conformPassword, setConformPassword] = useState("")
    
    async function handleCreate(e: any) {
        e.preventDefault();
        try {
            if (parentData.password !== conformPassword) {
                setParentData({ ...parentData, password: "" })
                setConformPassword("")
                return toast.warning("Password not matched")
            }
            const responsePromise = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/parent/create`, parentData, { withCredentials: true })
            
            toast.promise(responsePromise,
                {
                    loading: "Connecting...",
                    success: (res) => {
                        setTimeout(() => {
                            window.location.reload();
                        }, 1200);
                        return "Student's data created"
                    },
                    error: (err) => err?.response?.data?.message || "Failed, try again"
                })
        } catch (err) {
            return console.error(err);
        }
        
    }
    const [studentEmails, setStudentEmails] = useState<string[]>([])
    
    function addStudent(){
        const email = parentData.student_email.trim();
        setStudentEmails(prev=> prev.includes(email) ? prev : [...prev,email])
    }

    function removeStudent(id:number){
        console.log(id);
        const email = parentData.student_email.trim();
        setStudentEmails(prev =>
            prev.includes(email) ? prev : [...prev, email]
  );
        console.log(studentEmails);
    }

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger className=" hover:cursor-pointer bg-yellow-300 hover:bg-yellow-400 w-full hover:rounded-sm">
                <h2>Parent</h2>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106 bg-white text-black">
                <form onSubmit={handleCreate}>
                    <DialogHeader>
                        <DialogTitle className="text-green-500 text-xl capitalize">Add Parent</DialogTitle>
                        <DialogDescription>
                            Fill the details properly
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-3">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input type="name" id="name-1" name="name" required value={parentData.name} onChange={(e) => setParentData({ ...parentData, name: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" name="email" required value={parentData.email} onChange={(e) => setParentData({ ...parentData, email: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Student Email</Label>
                                {
                                    (studentEmails.length > 1) &&
                                    
                                    studentEmails.map((item,id)=>(
                                        <div key={id} className="flex gap-2">
                                            <Input type="email" id="email" name="email" disabled value={item} />
                                            <Button 
                                            onClick={()=> removeStudent(id)}
                                            className="ml-2 hover:cursor-pointer bg-red-400 hover:bg-red-500 hover:text-white text-black">Remove</Button>
                                        </div>
                                    ))
                                }
                                <div className="flex gap-2">
                                    <Input type="email" id="email" name="email" required value={parentData.student_email} onChange={(e) => setParentData({ ...parentData, student_email: e.target.value })} />
                                    <Button 
                                    type="button"
                                    onClick={addStudent}
                                    className="ml-2 hover:cursor-pointer bg-green-400 hover:bg-green-500 hover:text-white text-black">Add</Button>
                                </div>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password" required value={parentData.password} onChange={(e) => setParentData({ ...parentData, password: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="conform-password">Conform Password</Label>
                            <Input type="password" id="conform-password" name="conform-password" required value={conformPassword} onChange={(e) => setConformPassword(e.target.value)} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="phone">Phone</Label>
                            <Input type="text" id="phone" name="phone" value={parentData.phone} required onChange={(e) => setParentData({ ...parentData, phone: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="address">Address</Label>
                            <Input type="text" id="address" name="address" value={parentData.address} required onChange={(e) => setParentData({ ...parentData, address: e.target.value })} />
                        </div>
                        <div className="flex gap-2">
                            <DatePicker />
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="bloodgroup">Blood Group</Label>
                                <Input type="text" id="bloodgroup" name="bloodgroup" value={parentData.blood_group} onChange={(e) => setParentData({ ...parentData, blood_group: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" className="bg-transparent text-black hover:cursor-pointer">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="ml-2 hover:cursor-pointer bg-green-400 hover:bg-green-500 hover:text-white text-black">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


export function UpdateParent(prop: { data: any }) {
    const [open, setOpen] = useState(false)
    const [selectedClass, setSelectedClass] = useState('')
    useEffect(() => {
        setParentData({ ...parentData, class_name: selectedClass })
    }, [selectedClass])
    const [parentData, setParentData] = useState({
        student_id: 0,
        name: "",
        email: "",
        photo: "",
        phone: "",
        class_name: "",
        address: "",
        bio: "",
        blood_group: "",
        dob: "2026-01-10",
    })

    async function handleUpdate(e: any) {
        e.preventDefault();
        try {
            const responsePromise = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/student/update`, parentData, { withCredentials: true })
            toast.promise(responsePromise,
                {
                    loading: "Connecting...",
                    success: (res) => {
                        setTimeout(() => {
                            window.location.reload();
                        }, 1200);
                        return "Student's data updated"
                    },
                    error: (err) => err?.response?.data?.message || "Failed, try again"
                })
        } catch (err) {
            return console.error(err);
        }

    }
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger className=" hover:cursor-pointer" asChild
                onClick={() => setParentData({
                    ...parentData,
                    student_id: prop.data.student_id,
                    name: prop.data.name,
                    email: prop.data.email,
                    photo: prop.data.photo,
                    phone: prop.data.phone,
                    class_name: prop.data.class,
                    address: prop.data.address,
                    bio: prop.data.bio,
                    blood_group: prop.data.blood_group,
                })}>
                <SquarePen size={15} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-106 bg-white text-black">
                <form onSubmit={handleUpdate}>
                    <DialogHeader>
                        <DialogTitle className="text-purple-400 text-xl capitalize">Update Student</DialogTitle>
                        <DialogDescription>
                            Change the details properly
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-3">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input type="name" id="name-1" name="name" required value={parentData.name} onChange={(e) => setParentData({ ...parentData, name: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="photo">Photo</Label>
                            <Input type="text" id="photo" name="photo" placeholder="photo URL ONLY" value={parentData.photo} onChange={(e) => setParentData({ ...parentData, photo: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" name="email" required value={parentData.email} onChange={(e) => setParentData({ ...parentData, email: e.target.value })} />
                        </div>
                        <div className="flex gap-2">
                            <div className="flex flex-col w-1/2 gap-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input type="text" id="phone" name="phone" value={parentData.phone} required onChange={(e) => setParentData({ ...parentData, phone: e.target.value })} />
                            </div>
                            <div className="flex flex-col w-1/2 gap-2">
                                <Label>Class</Label>
                                <DropdownClass defaultClass={parentData.class_name} setClass={setSelectedClass} />
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="address">Address</Label>
                            <Input type="text" id="address" name="address" value={parentData.address} required onChange={(e) => setParentData({ ...parentData, address: e.target.value })} />
                        </div>
                        <div className="flex gap-2">
                            <DatePicker />
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="bloodgroup">Blood Group</Label>
                                <Input type="text" id="bloodgroup" name="bloodgroup" value={parentData.blood_group} onChange={(e) => setParentData({ ...parentData, blood_group: e.target.value })} />
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" name="bio" value={parentData.bio} onChange={(e) => setParentData({ ...parentData, bio: e.target.value })} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" className="bg-transparent text-black hover:cursor-pointer">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="ml-2 hover:cursor-pointer bg-purple-400 hover:bg-purple-500 hover:text-white text-black">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


export function DeleteParent(prop: { data: any }) {
    const [parentData, setParentData] = useState({
        student_id: "",
        name: "",
        email: "",
    })

    async function handleDelete() {
        try {
            const responsePromise = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/parent/delete`, parentData, { withCredentials: true })
            toast.promise(responsePromise,
                {
                    loading: "Connecting...",
                    success: (res) => {
                        setTimeout(() => {
                            window.location.reload();
                        }, 1200);
                        return `${parentData.name} deleted`
                    },
                    error: (err) => err?.response?.data?.message || "Failed, try again"
                })
        } catch (err) {
            return console.error(err);
        }

    }
    return (
        <AlertDialog>
            <AlertDialogTrigger className="hover:cursor-pointer" asChild onClick={() =>
                setParentData({
                    student_id: prop.data.student_id,
                    name: prop.data.name,
                    email: prop.data.email,
                })}>
                <Trash2 size={15} />
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl text-red-600">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete <span className="font-bold">{` ${parentData.name}(${parentData.student_id}) `}</span> data from our servers.
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