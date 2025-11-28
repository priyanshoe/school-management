import { InputWithButton } from "../app-input";
import { SidebarTrigger } from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Navbar() {
    return (
        <div className="w-full flex items-center justify-between mt-4 pr-4">

            <div className="flex gap-4 items-center">
            <SidebarTrigger />
            <InputWithButton />
            </div>

            <div className="flex gap-2 items-center">

                <div>
                    <h1>Priyansh</h1>
                    <h3>Admin</h3>
                </div>
                <div>
                    <Avatar>
                        <AvatarImage src="https://github.com/maxleiter.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    )
}