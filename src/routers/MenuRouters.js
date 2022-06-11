export const MAIN_MENU_ROUTERS = [
    {
        title:"E-Shop",
        path:"/shopping",
        elements:[
            {title:"Shopping",path:"/shopping"},
            {title:"Recommend",path:"/shopping/recommend"},
            {title:"Single",path:"/shopping/single"},
            {title:"Grouped",path:"/shopping/grouped"},
            {title:"Latest",path:"/shopping/latest"}
        ],
    },
    {
        title:"Services",
        path:"/services",
        elements:[
            {title:"Remote Car",    path:"/services/remote"},
            {title:"Cabinet",       path:"/services/cabinet"},
            {title:"Vendor Machine",path:"/services/vm"}
        ]

    },
    {
        title:"Blogs",
        path:"/blogs",
        elements:[
            {title:"New Post",path:"/blogs/new"},
            {title:"Latest",path:"/blogs/latest"}
            
        ]
    },
    {
        title:"Contact",
        path:"/contact",
    }
]