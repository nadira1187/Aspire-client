import { useState } from 'react';
import { FcAddDatabase } from "react-icons/fc";
import { FcList } from "react-icons/fc";
import AddTask from '../AddTask/AddTask';

const UserDashboard = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSidebarItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className="flex">
            <div className="drawer lg:drawer-open w-80">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                        Open drawer
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li>
                            <a className=" text-blue-900  text-4xl font-bold">
                                <img className='w-[40px] h-[40px] ' src="https://i.ibb.co/VNdmcXx/clothespin-486569.png" alt="icon1" border="0" />Aspire</a>
                        </li>
                        <li className='text-xl'>
                            <a onClick={() => handleSidebarItemClick('item1')}>Add Task <FcAddDatabase/></a>
                        </li>
                        <li className='text-xl'>
                            <a onClick={() => handleSidebarItemClick('item2')}>See task <FcList/></a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Content based on selected sidebar item */}
            <div className="content">
                {selectedItem === 'item1' && (
                    <div>
                        <AddTask />
                    </div>
                )}
                {selectedItem === 'item2' && (
                    <div>
                        <h2>Content for Sidebar Item 2</h2>
                        {/* Add additional content for Sidebar Item 2 */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
