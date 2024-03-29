import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../../Shared/Navbar/Navbar';

const DashboardLayout = () => {
    return (
        <div>
             <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <li><Link to='/dashboard/addProducts'>Add A Product</Link></li>
                       {/* { isAdmin &&  */}
                       <>
                       <li><Link to='/dashboard/myProducts'> My Product</Link></li>
                       <li><Link to='/dashboard/addDoctor'>My Buyers</Link></li>
                       </>
                        {/* } */}
                    </ul>

                </div>
            </div>

        </div>
        </div>
    );
};

export default DashboardLayout;