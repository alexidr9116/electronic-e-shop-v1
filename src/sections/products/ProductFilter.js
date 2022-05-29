import { useState } from "react"
import { useSelector } from "react-redux";
import Rating from "../../components/Rating";

export default function ProductFilter({ mobile = false, categories = [], memories = [] }) {
    const [filteredMemories, setFilteredMemories] = useState([]);
    const {themeMode} = useSelector((state)=>state.setting);
    const borderColor = (themeMode === 'light'?'border-stone-300':'border-gray-800');
    const handleFilterMemory = (memory) => {
        const _copied = filteredMemories.slice(0, filteredMemories.length);
        if (filteredMemories.filter((m) => m.capacity === memory.capacity).length === 0) {
            _copied.push(memory);
            setFilteredMemories(_copied);
        }
        else {
            setFilteredMemories(_copied.filter((m) => (m.capacity !== memory.capacity)));
        }
    }

    return (
        <div className={`grid gap-4`}>
            {/* categories */}
            <div className={`md:border md:rounded-lg md:bg-base-200 border-0  ${borderColor} flex flex-col p-4`}>
                <label className="font-bold uppercase mb-2">Product Categories</label>
                {categories.map((category, index) => (

                    <label className="cursor-pointer label justify-start" key={index}>
                        <input type="checkbox" className="checkbox "></input>
                        <span className="label-text ml-2">{category.value}</span>
                    </label>
                ))}
            </div>
            {/* price, color, memory , rating, tags */}
            <div className={`md:border md:rounded-lg md:bg-base-200 border-0  ${borderColor}  flex flex-col gap-2 p-4`}>
                <label className="font-bold uppercase mb-2">Filter By Price</label>
                <div className="flex w-full items-center gap-1 justify-between">
                    <span className="flex-none">Min</span>
                    <input type="number" step={0.1} className="input w-20 input-sm input-bordered"></input>
                    <span className="flex-none">Max</span>
                    <input type="number" step={0.1} className="input w-20 input-sm input-bordered"></input>
                </div>
                <div className="divider"></div>
                <label className="font-bold uppercase mb-2">Filter By Memory</label>
                <div className="grid grid-cols-3 gap-1">
                    {memories.map((m, index) => (
                        <button className={`btn btn-sm btn-ghost ${filteredMemories.filter(_m=>_m.capacity ===m.capacity).length === 1 ?'btn-active':''}`} key={index} onClick={() => { handleFilterMemory(m) }}>
                            {m.capacity}
                        </button>
                    ))}
                </div>
                <div className="divider"></div>
                <label className="font-bold uppercase mb-2">Average Rating</label>
                <Rating />
            </div>
        </div>
    )
}
