export default function CategorySearchInput({categories}){
    
    return(
        <div className="flex w-full rounded-lg ">
            <select className="border-0 select rounded-r-none border-r-[1px]  hidden sm:flex">
                <option value = "all">Select Category..</option>
                {categories.map((category,index)=>(
                    <option value = {category.key} key = {index}>{category.value}</option>
                ))}
            </select>
            <input className="input rounded-none rounded-l-lg sm:rounded-none"></input>
            <button className="btn rounded-l-none rounded-r-lg">Search</button>
        </div>
    )
}