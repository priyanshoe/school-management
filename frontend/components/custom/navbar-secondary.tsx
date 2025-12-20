import { ArrowDownWideNarrow, Plus, SlidersHorizontal } from "lucide-react";
import { Input } from "../ui/input";
import { role } from "@/database/data";

export default function NavbarSecondary(prop: { head: String }) {
    return (
        <div id="Navbar-secondary" className="flex items-center justify-between flex-wrap gap-2 bg-white">
            <header>
                <h1 className="text-xl font-bold">All {prop.head}</h1>
            </header>

            <div id="form-container" className="flex items-center justify-center gap-2">
                <Input type="name" placeholder="search" />
                <div id="button-container" className="flex justify-between gap-3">
                    <div className="bg-yellow-400 rounded-full flex items-center justify-center p-2">
                        <ArrowDownWideNarrow size={15} />
                    </div>
                    {
                        role==="admin" &&
                        <div className="bg-yellow-400 rounded-full flex items-center justify-center p-2">
                            <Plus size={15} />
                        </div>
                    }
                    <div className="bg-yellow-400 rounded-full flex items-center justify-center p-2">
                        <SlidersHorizontal size={15} />
                    </div>
                </div>
            </div>
        </div>
    )
}