import React from "react";
import Room from "../../../models/Room";
import SidebarListItem from "../../sidebar/sidebar-list-item/SidebarListItem";

export interface RoomListItemProps {
    room: Room;
    isActive: boolean;
    isOffline: boolean;
    onClick: () => void;
}

const RoomListItem: React.FC<RoomListItemProps> = ({
    room: { id, name, unreadCount, isLeaving },
    isActive,
    isOffline,
    onClick,
}) => {
    return (
        <SidebarListItem
            title={name || id}
            unreadCount={unreadCount}
            isActive={isActive}
            disabled={isLeaving || isOffline}
            onClick={onClick}
        />
    );
};

export default RoomListItem;
