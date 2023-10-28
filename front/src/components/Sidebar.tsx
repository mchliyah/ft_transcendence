import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    BsBellFill,
    BsHouseFill,
    BsController,
    BsChatRightFill
} from 'react-icons/bs';
import { UserType } from '../Types/User';
import User from './User';
import { Notification } from '../Types/Notification';
import { RenderContext, RenderContextType } from '../RenderContext';
import { SocketContext } from '../socket';

interface sidebarProps {
    notification?: boolean;
    setNotification?: React.Dispatch<React.SetStateAction<boolean>>;
    notifArray?: Notification[];
    isOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}

const Sidebar = (props: sidebarProps) => {
    const [user, setUser] = React.useState<UserType>();
    const renderData: RenderContextType = React.useContext(RenderContext);
    const socket = React.useContext(SocketContext);
    useEffect(() => {
        async function fetchUserData() {
            const userData = await User();
            setUser(userData);
        }

        fetchUserData();
    }, []);
    useEffect(() => {
        socket.on('userOffline', (data: any) => {
            console.log('userOffline', data);
            renderData.setRenderData(!renderData.renderData);
        });
        socket.on('userOnline', (data: any) => {
            console.log('userOnline', data);
            renderData.setRenderData(!renderData.renderData);
        });

        return () => {
            socket.off('userOffline');
            socket.off('userOnline');
        };
    });
    return (
        <aside>
            <Link
                to="/home"
                onClick={() => {
                    renderData.setRenderData(!renderData.renderData);
                }}
            >
                <BsHouseFill className="fa" />
                Home
            </Link>
            <Link
                to={`/chat/rooms-dms/`}
                onClick={() => {
                    renderData.setRenderData(!renderData.renderData);
                }}
            >
                <BsChatRightFill className="fa" />
                Chat
            </Link>
            <Link to="" onClick={props.onOpen}>
                <BsBellFill className="fa" />
                Notifications
            </Link>
            <Link
                to={`/game/`}
                onClick={() => {
                    renderData.setRenderData(!renderData.renderData);
                }}
            >
                <BsController className="fa" />
                Play
            </Link>
        </aside>
    );
};
export default Sidebar;
