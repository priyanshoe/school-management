import { ArrowDownWideNarrow, Plus, SlidersHorizontal } from "lucide-react";
import { Input } from "../ui/input";

const icons = [
    {
        id: 1,
        icon: ArrowDownWideNarrow
    },
    {
        id: 2,
        icon: Plus
    },
    {
        id: 3,
        icon: SlidersHorizontal
    },
]

export default function NavbarSecondary(prop:{head:String}) {
    return (
        <div id="Navbar-secondary" className="flex items-center justify-between flex-wrap gap-2 bg-white">
            <header>
                <h1 className="text-xl font-bold">All {prop.head}</h1>
            </header>

            <div id="form-container" className="flex items-center justify-center gap-2">
                <Input type="name" placeholder="search"/>
                <div id="button-container" className="flex justify-between gap-3">
                    {

                        icons.map((item, id) => (
                            <div key={item.id} className="bg-yellow-400 rounded-full flex items-center justify-center p-2">
                                <item.icon size={15} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}