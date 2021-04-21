import React from "react";
import useToggle from "../../hooks/useToggle";
import LoggedScreenType from "../../models/LoggedScreenType";
import MasterDetail from "../../views/master-detail/MasterDetail";
import RoomCreatorConnect from "../../views/room/room-creator/RoomCreatorConnect";
import SidebarConnect from "../../views/sidebar/sidebar/SidebarConnect";
import Modal from "@bit/jorgemoreira.react.surface.modal";
import RoomInviteConfirmationConnect from "../../views/room/room-invite-confirmation/RoomInviteConfirmationConnect";
import ChatConnect from "../../views/chat/ChatConnect";
import useUrlHash from "../../hooks/useUrlHash";
import Card from "../../views/card/Card";
import Toolbar from "../../views/header/Header";
import "./LoggedScreen.css";

export interface LoggedScreenProps {
    type: LoggedScreenType;
}

const LoggedScreen: React.FC<LoggedScreenProps> = ({ type }) => {
    const { hash: roomIdToJoin, onClear: onDismissRoomId } = useUrlHash();
    const { isOn: showSidebar, onToggle: toggleSidebar } = useToggle(true);
    let renderedContent: JSX.Element | null = null;

    switch (type) {
        case LoggedScreenType.Chat:
            renderedContent = <ChatConnect onToggleSidebar={toggleSidebar} />;
            break;
        case LoggedScreenType.RoomCreator:
            renderedContent = <RoomCreatorConnect />;
            break;
    }

    return (
        <div className="logged-screen">
            <div className="logged-screen__header">
                <Toolbar />
            </div>
            <div className="logged-screen__content">
                <MasterDetail
                    master={<SidebarConnect />}
                    detail={renderedContent}
                    showMaster={showSidebar}
                />
                {roomIdToJoin && (
                    <Modal
                        title=""
                        show={!!roomIdToJoin}
                        onDismiss={onDismissRoomId}
                    >
                        <Card>
                            <RoomInviteConfirmationConnect
                                roomId={roomIdToJoin}
                                onDone={onDismissRoomId}
                            />
                        </Card>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default LoggedScreen;
