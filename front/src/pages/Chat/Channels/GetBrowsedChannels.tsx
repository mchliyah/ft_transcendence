import client from '../../../components/Client';

export const GetBrowsedChannels = async () => {
    try {
        const res = await client.get('chat/browse-channels-list', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};
