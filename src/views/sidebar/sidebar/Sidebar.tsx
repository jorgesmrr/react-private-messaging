import React from "react";
import SidebarFooter from "../sidebar-footer/SidebarFooter";
import RoomListConnect from "../../room/room-list/RoomListConnect";
import "./Sidebar.css";

export interface SidebarProps {
    onSignOut: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSignOut }) => {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <h2 className="sidebar__header__title">Rooms</h2>
            </div>
            <div className="sidebar__list">
                <RoomListConnect />
            </div>
            <SidebarFooter />
        </div>
    );
};

export default Sidebar;
