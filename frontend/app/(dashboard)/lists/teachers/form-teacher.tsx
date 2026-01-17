"use client"
import { useRouter } from "next/navigation";
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
import { useState } from "react";
import { toast } from "sonner";
import { DropdownClasses, DropdownSubjects } from "@/components/app-dropdown";
import { DatePicker } from "@/components/app-date-picker";
import { Textarea } from "@/components/ui/textarea";




export function CreateTeacher() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [teacherData, setTeacherData] = useState({
        name: "",
        email: "",
        photo: "",
        phone: "",
        address: "",
        bio: "",
        dob: "2026-01-10",
        blood_group: "",
        password: ""
    })
    console.log(teacherData.password);
    
    const [conformPassword, setConformPassword] = useState("")


    async function handleCreate(e: any) {
        e.preventDefault();
        try {
            if(teacherData.password !== conformPassword) {
                setTeacherData({...teacherData,password:""}) 
                setConformPassword("") 
                return toast.warning("Password not matched")
                }
            const responsePromise = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/teacher/signUp`, teacherData, { withCredentials: true })
            toast.promise(responsePromise,
                {
                    loading: "Connecting...",
                    success: (res) => {
                        window.location.reload();
                        return "Teacher's data created"
                    },
                    error: (err) => err?.response?.data?.message || "Failed, try again"
                })
        } catch (err) {
            setOpen(false);
            return console.error(err);
        }

    }
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger className=" hover:cursor-pointer bg-yellow-300 hover:bg-yellow-400 w-full hover:rounded-sm">
                <h2>Teacher</h2>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106 bg-white text-black">
                <form onSubmit={handleCreate}>
                    <DialogHeader>
                        <DialogTitle className="text-green-500 text-xl capitalize">Add Teacher</DialogTitle>
                        <DialogDescription>
                            Fill the details properly
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-3">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input type="name" id="name-1" name="name" required value={teacherData.name} onChange={(e) => setTeacherData({ ...teacherData, name: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="photo">Photo</Label>
                            <Input type="text" id="photo" name="photo" placeholder="photo URL ONLY" value={teacherData.photo} onChange={(e) => setTeacherData({ ...teacherData, photo: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" name="email" required value={teacherData.email} onChange={(e) => setTeacherData({ ...teacherData, email: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password" required value={teacherData.password} onChange={(e) => setTeacherData({ ...teacherData, password: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="conform-password">Conform Password</Label>
                            <Input type="password" id="conform-password" name="conform-password" required value={conformPassword} onChange={(e) => setConformPassword(e.target.value)} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="phone">Phone</Label>
                            <Input type="text" id="phone" name="phone" value={teacherData.phone} required onChange={(e) => setTeacherData({ ...teacherData, phone: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="address">Address</Label>
                            <Input type="text" id="address" name="address" value={teacherData.address} required onChange={(e) => setTeacherData({ ...teacherData, address: e.target.value })} />
                        </div>
                        <div className="flex gap-2">
                            <DatePicker />
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="bloodgroup">Blood Group</Label>
                                <Input type="text" id="bloodgroup" name="bloodgroup" value={teacherData.blood_group} onChange={(e) => setTeacherData({ ...teacherData, blood_group: e.target.value })} />
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" name="bio" value={teacherData.bio} onChange={(e) => setTeacherData({ ...teacherData, bio: e.target.value })} />
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


export function UpdateTeacher(prop: { data: any }) {
    const [open, setOpen] = useState(false)
    const [teacherData, setTeacherData] = useState({
        name: prop.data.name,
        email: prop.data.email,
        photo: prop.data.photo,
        phone: prop.data.phone,
        address: prop.data.address,
        bio: prop.data.bio,
        blood_group: prop.data.bloodGroup,
        dob: "2026-01-10",
    })

    async function handleUpdate(e: any) {
        e.preventDefault();
        try {
            const responsePromise = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/teacher/update`, teacherData, { withCredentials: true })
            toast.promise(responsePromise,
                {
                    loading: "Connecting...",
                    success: (res) => {
                        window.location.reload();
                        return "Teacher's data updated"
                    },
                    error: (err) => err?.response?.data?.message || "Failed, try again"
                })
        } catch (err) {
            return console.error(err);
        }

    }
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger className=" hover:cursor-pointer" asChild>
                <SquarePen size={15} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-106 bg-white text-black">
                <form onSubmit={handleUpdate}>
                    <DialogHeader>
                        <DialogTitle className="text-purple-400 text-xl capitalize">Update Teacher</DialogTitle>
                        <DialogDescription>
                            Change the details properly
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-3">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input type="name" id="name-1" name="name" required value={teacherData.name} onChange={(e) => setTeacherData({ ...teacherData, name: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="photo">Photo</Label>
                            <Input type="text" id="photo" name="photo" placeholder="photo URL ONLY" value={teacherData.photo} onChange={(e) => setTeacherData({ ...teacherData, photo: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" name="email" required value={teacherData.email} onChange={(e) => setTeacherData({ ...teacherData, email: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="phone">Phone</Label>
                            <Input type="text" id="phone" name="phone" value={teacherData.phone} required onChange={(e) => setTeacherData({ ...teacherData, phone: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="address">Address</Label>
                            <Input type="text" id="address" name="address" value={teacherData.address} required onChange={(e) => setTeacherData({ ...teacherData, address: e.target.value })} />
                        </div>
                        <div className="flex gap-2">
                            <DatePicker />
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="bloodgroup">Blood Group</Label>
                                <Input type="text" id="bloodgroup" name="bloodgroup" value={teacherData.blood_group} onChange={(e) => setTeacherData({ ...teacherData, blood_group: e.target.value })} />
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" name="bio" value={teacherData.bio} onChange={(e) => setTeacherData({ ...teacherData, bio: e.target.value })} />
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






export function DeleteTeacher(prop: { data: any }) {
    const [teacherData, setTeacherData] = useState({
        teacher_id:"",
        name:"",
        email:"",
    })

    async function handleDelete() {
        try {
            console.log(prop.data.email);
            console.log(teacherData);
            const responsePromise = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/teacher/delete`, teacherData, { withCredentials: true })
            toast.promise(responsePromise,
                {
                    loading: "Connecting...",
                    success: (res) => {
                        window.location.reload();
                        return `${teacherData.name} deleted`
                    },
                    error: (err) => err?.response?.data?.message || "Failed, try again"
                })
        } catch (err) {
            return console.error(err);
        }

    }
    return (
        <AlertDialog>
            <AlertDialogTrigger className="hover:cursor-pointer" asChild onClick={()=>
            setTeacherData({
                teacher_id: prop.data.teacher_id,
                name: prop.data.name,
                email: prop.data.email,
            })}>
                <Trash2 size={15} />
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl text-red-600">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete <span className="font-bold">{` ${teacherData.name}(${teacherData.teacher_id}) `}</span> data from our servers.
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