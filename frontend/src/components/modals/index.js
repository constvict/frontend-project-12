import addChannel from './Add.jsx';
import removeChannel from './Remove.jsx';
import renameChannel from './Rename.jsx';

const modals = { addChannel, removeChannel, renameChannel };

const getModal = (modalType) => modals[modalType];

export default getModal;
