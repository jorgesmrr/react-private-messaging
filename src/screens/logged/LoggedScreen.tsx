import React, { useEffect } from "react";
import LoggedScreenType from "../../models/LoggedScreenType";
import MasterDetail from "@bit/jorgemoreira.headless-react.surface.master-detail";
import SidebarConnect from "../../views/sidebar/sidebar/SidebarConnect";
import RoomInviteConfirmationConnect from "../../views/room/room-invite-confirmation/RoomInviteConfirmationConnect";
import ChatConnect from "../../views/chat/chat/ChatConnect";
import "./LoggedScreen.css";
import HeaderConnect from "../../views/header/HeaderConnect";
import RoomEntranceFormConnect from "../../views/room/room-entrance-form/RoomEntranceFormConnect";
import RoomCreatorFormConnect from "../../views/room/room-creator-form/RoomCreatorFormConnect";
import { useToggle, useUrlHash } from "@bit/jorgemoreira.headless-react.hooks";

export interface LoggedScreenProps {
    type: LoggedScreenType;
    activeRoomId?: string;
}

const LoggedScreen: React.FC<LoggedScreenProps> = ({ type, activeRoomId }) => {
    const { hash: roomIdToJoin, onClear: onDismissRoomId } = useUrlHash();
    const {
        isOn: isShowingSidebar,
        onToggle: onSidebarToggle,
        setOff: hideSidebar,
    } = useToggle(
        window.innerWidth >= 996 ||
            (type === LoggedScreenType.Chat && !activeRoomId)
    );
    let renderedContent: JSX.Element | null = null;

    useEffect(() => {
        if (
            window.innerWidth < 996 &&
            (type !== LoggedScreenType.Chat || !!activeRoomId)
        ) {
            hideSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, activeRoomId]);

    switch (type) {
        case LoggedScreenType.Chat:
            renderedContent = <ChatConnect />;
            break;
        case LoggedScreenType.RoomCreator:
            renderedContent = <RoomCreatorFormConnect />;
            break;
        case LoggedScreenType.RoomEntrance:
            renderedContent = <RoomEntranceFormConnect />;
            break;
    }

    if (type !== LoggedScreenType.Chat) {
        renderedContent = (
            <div className="logged-screen__content__centered content content--medium">
                {renderedContent}
            </div>
        );
    }

    return (
        <div className="logged-screen">
            <div className="logged-screen__header">
                <HeaderConnect onMenuClick={onSidebarToggle} />
            </div>
            <div className="logged-screen__content">
                <MasterDetail
                    master={<SidebarConnect />}
                    detail={renderedContent}
                    showMaster={isShowingSidebar}
                    onHideMaster={onSidebarToggle}
                    masterMinZIndex={6}
                />
            </div>
            {roomIdToJoin && (
                <RoomInviteConfirmationConnect
                    roomId={roomIdToJoin}
                    onDone={onDismissRoomId}
                />
            )}
        </div>
    );
};

export default LoggedScreen;
