import React from "react";
import { copyToClipboard } from "../../../utils/clipboard";
import Button from "../../button/Button";
import Modal from "../../modal/Modal";
import "./RoomInvite.css";

export interface RoomInviteProps {
    roomId: string;
    show: boolean;
    onCancel: () => void;
}

const RoomInvite: React.FC<RoomInviteProps> = ({ roomId, show, onCancel }) => {
    const friendlyId = roomId.substr(8);
    const inviteLink = window.location.origin + "#" + friendlyId;

    const copyRoomId = () => copyToClipboard(friendlyId);
    const copyRoomLink = () => copyToClipboard(inviteLink);

    const modalContent = (
        <div className="room-invite">
            <p>You have two ways of inviting someone to this room.</p>

            <div className="room-invite__method">
                <p>
                    <strong>1)</strong> Sharing the room ID:
                </p>
                <div className="room-invite__method__contents">
                    <div>{friendlyId}</div>
                    <Button primary onClick={copyRoomId}>
                        Copy to clipboard
                    </Button>
                </div>
            </div>
            <div className="room-invite__method">
                <p>
                    <strong>2)</strong> Sharing the room link:
                </p>
                <div className="room-invite__method__contents">
                    <div>{inviteLink}</div>
                    <Button primary onClick={copyRoomLink}>
                        Copy to clipboard
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            title="Invite others"
            content={modalContent}
            show={show}
            width="45rem"
            onDismiss={onCancel}
        />
    );
};

export default RoomInvite;
