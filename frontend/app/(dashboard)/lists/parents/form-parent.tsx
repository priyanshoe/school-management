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
import { useState } from "react";
import { toast } from "sonner";
import { DatePicker } from "@/components/app-date-picker";




export function CreateParent() {
    const [open, setOpen] = useState(false)

    const [parentData, setParentData] = useState({
        name: "",
        email: "",
        student_email: "",
        phone: "",
        address: "",
        dob: "2026-01-10",
        blood_group: "",
        password: ""
    })
    const [studentEmails, setStudentEmails] = useState<string[]>([])

    const [conformPassword, setConformPassword] = useState("")

    async function handleCreate(e: any) {
        e.preventDefault();
        try {
            if (parentData.password !== conformPassword) {
                setParentData({ ...parentData, password: "" })
                setConformPassword("")
                return toast.warning("Password not matched")
            }
            const responsePromise = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/parent/create`, { parentData, studentEmails }, { withCredentials: true })

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
            console.log(await responsePromise);

        } catch (err) {
            return console.error(err);
        }

    }

    function addStudent() {
        const email = parentData.student_email.trim();
        setStudentEmails(prev => prev.includes(email) ? prev : [...prev, email])
    }

    function removeStudent(email: string) {
        setStudentEmails(prev => prev.filter(item => item !== email));
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
                                (studentEmails.length > 0) &&

                                studentEmails.map((item, id) => (
                                    <div key={id} className="flex gap-2">
                                        <Input type="email" id="email" name="email" disabled value={item} />
                                        <Button type="button"
                                            onClick={() => removeStudent(item)}
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
    const [parentData, setParentData] = useState({
        parent_id: 0,
        name: "",
        email: "",
        phone: "",
        address: "",
        blood_group: "",
        dob: "2026-01-10",
    })

    async function handleUpdate(e: any) {
        e.preventDefault();
        try {
            const responsePromise = axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/parent/update`, parentData, { withCredentials: true })
            toast.promise(responsePromise,
                {
                    loading: "Connecting...",
                    success: (res) => {
                        setTimeout(() => {
                            window.location.reload();
                        }, 1200);
                        return res.data.message || "Parent's data updated"
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
                    parent_id: prop.data.parent_id,
                    name: prop.data.name,
                    email: prop.data.email,
                    phone: prop.data.phone,
                    address: prop.data.address,
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
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" name="email" required value={parentData.email} onChange={(e) => setParentData({ ...parentData, email: e.target.value })} />
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
                        <Button type="submit" className="ml-2 hover:cursor-pointer bg-purple-400 hover:bg-purple-500 hover:text-white text-black">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


export function DeleteParent(prop: { data: any }) {
    const [parentData, setParentData] = useState({
        parent_id: "",
        name: "",
        email: "",
    })

    async function handleDelete() {
        try {
            const responsePromise = axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/parent/delete`, { withCredentials: true, data: parentData })
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
                    parent_id: prop.data.parent_id,
                    name: prop.data.name,
                    email: prop.data.email,
                })}>
                <Trash2 size={15} />
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl text-red-600">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete <span className="font-bold">{` ${parentData.name}(${parentData.parent_id}) `}</span> data from our servers.
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