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




export function CreateStudent() {
    const [open, setOpen] = useState(false)
    const [selectedClass, setSelectedClass] = useState('')
    useEffect(()=>{
        setStudentData(prev=>({...prev,class_name:selectedClass}))
        
    },[selectedClass])
    const [studentData, setStudentData] = useState({
        name: "",
        email: "",
        photo: "",
        phone: "",
        class_name:"",
        subjects:[],
        address: "",
        bio: "",
        dob: "2026-01-10",
        blood_group: "",
        password: ""
    })
    
    const [conformPassword, setConformPassword] = useState("")

    async function handleCreate(e: any) {
        e.preventDefault();
        try {
            if(studentData.class_name == "") return toast.warning("Select class")
            if (studentData.password !== conformPassword) {
                setStudentData({ ...studentData, password: "" })
                setConformPassword("")
                return toast.warning("Password not matched")
            }
            const responsePromise = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/student/create`, studentData, { withCredentials: true })

            toast.promise(responsePromise,
                {
                    loading: "Connecting...",
                    success: (res) => res.data.message || "Student's data created",
                    error: (err) => err?.response?.data?.message || "Failed, try again"
                })
        } catch (err) {
            return console.error(err);
        }

    }
    
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger className=" hover:cursor-pointer bg-yellow-300 hover:bg-yellow-400 w-full hover:rounded-sm">
                <h2>Student</h2>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106 bg-white text-black">
                <form onSubmit={handleCreate}>
                    <DialogHeader>
                        <DialogTitle className="text-green-500 text-xl capitalize">Add Student</DialogTitle>
                        <DialogDescription>
                            Fill the details properly
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-3">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input type="name" id="name-1" name="name" required value={studentData.name} onChange={(e) => setStudentData({ ...studentData, name: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="photo">Photo</Label>
                            <Input type="text" id="photo" name="photo" placeholder="photo URL ONLY" value={studentData.photo} onChange={(e) => setStudentData({ ...studentData, photo: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" name="email" required value={studentData.email} onChange={(e) => setStudentData({ ...studentData, email: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password" required value={studentData.password} onChange={(e) => setStudentData({ ...studentData, password: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="conform-password">Conform Password</Label>
                            <Input type="password" id="conform-password" name="conform-password" required value={conformPassword} onChange={(e) => setConformPassword(e.target.value)} />
                        </div>
                            <div className="grid gap-3">
                                <Label htmlFor="phone">Phone</Label>
                                <Input type="text" id="phone" name="phone" value={studentData.phone} required onChange={(e) => setStudentData({ ...studentData, phone: e.target.value })} />
                            </div>
                        <div className="flex gap-2 w-full">
                                <DropdownClass setClass={setStudentData}/>
                                <DropdownSubjects setSubjects={setStudentData}/>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="address">Address</Label>
                            <Input type="text" id="address" name="address" value={studentData.address} required onChange={(e) => setStudentData({ ...studentData, address: e.target.value })} />
                        </div>
                        <div className="flex gap-2">
                            <DatePicker />
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="bloodgroup">Blood Group</Label>
                                <Input type="text" id="bloodgroup" name="bloodgroup" value={studentData.blood_group} onChange={(e) => setStudentData({ ...studentData, blood_group: e.target.value })} />
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" name="bio" value={studentData.bio} onChange={(e) => setStudentData({ ...studentData, bio: e.target.value })} />
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


export function UpdateStudent(prop: { data: any }) {
    const [open, setOpen] = useState(false)
    const [studentData, setStudentData] = useState({
        student_id: 0,
        name: "",
        email: "",
        photo: "",
        phone: "",
        class_name:"",
        subjects: [],
        address: "",
        bio: "",
        blood_group: "",
        dob: "2026-01-10",
    })

    async function handleUpdate(e: any) {
        e.preventDefault();
        try {
            if(studentData.class_name == null || studentData.class_name ==  "") return toast.warning("Select class")
            const responsePromise = axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/student/update`, studentData, { withCredentials: true })
            toast.promise(responsePromise,
                {
                    loading: "Connecting...",
                    success: (res) => {
                        setTimeout(() => {
                            window.location.reload();
                        }, 1200);
                        return res.data.message || "Student's data updated"
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
                onClick={() => setStudentData({
                    ...studentData,
                    student_id: prop.data.student_id,
                    name: prop.data.name,
                    email: prop.data.email,
                    photo: prop.data.photo,
                    phone: prop.data.phone,
                    class_name: prop.data.class,
                    subjects: prop.data.subjects,
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
                            <Input type="name" id="name-1" name="name" required value={studentData.name} onChange={(e) => setStudentData({ ...studentData, name: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="photo">Photo</Label>
                            <Input type="text" id="photo" name="photo" placeholder="photo URL ONLY" value={studentData.photo} onChange={(e) => setStudentData({ ...studentData, photo: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" name="email" required value={studentData.email} onChange={(e) => setStudentData({ ...studentData, email: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                                <Label htmlFor="phone">Phone</Label>
                                <Input type="text" id="phone" name="phone" value={studentData.phone} required onChange={(e) => setStudentData({ ...studentData, phone: e.target.value })} />
                            </div>
                            <div className="flex gap-2">
                                <DropdownClass defaultClass={studentData.class_name} setClass={setStudentData}/>
                                <DropdownSubjects default={studentData.subjects} setSubjects={setStudentData}/>
                            </div>
                        <div className="grid gap-3">
                            <Label htmlFor="address">Address</Label>
                            <Input type="text" id="address" name="address" value={studentData.address} required onChange={(e) => setStudentData({ ...studentData, address: e.target.value })} />
                        </div>
                        <div className="flex gap-2">
                            <DatePicker />
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="bloodgroup">Blood Group</Label>
                                <Input type="text" id="bloodgroup" name="bloodgroup" value={studentData.blood_group} onChange={(e) => setStudentData({ ...studentData, blood_group: e.target.value })} />
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" name="bio" value={studentData.bio} onChange={(e) => setStudentData({ ...studentData, bio: e.target.value })} />
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


export function DeleteStudent(prop: { data: any }) {
    const [studentData, setStudentData] = useState({
        student_id: "",
        name: "",
        email: "",
    })

    async function handleDelete() {
        try {
            const responsePromise = axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/student/delete`,{ data:studentData,  withCredentials: true })
            toast.promise(responsePromise,
                {
                    loading: "Connecting...",
                    success: (res) => {
                        setTimeout(() => {
                            window.location.reload();
                        }, 1200);
                        return `${studentData.name} deleted`
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
                setStudentData({
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
                        This action cannot be undone. This will permanently delete <span className="font-bold">{` ${studentData.name}(${studentData.student_id}) `}</span> data from our servers.
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