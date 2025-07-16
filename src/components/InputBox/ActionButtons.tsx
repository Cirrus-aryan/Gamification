import React from 'react';

interface Props {
  onAdd: () => void;
  onClear: () => void;
}

const ActionButtons: React.FC<Props> = ({ onAdd, onClear }) => (
  <div className="grid grid-cols-2 gap-2 mt-4">
    <button
      className="bg-[#36454f] text-white py-2 rounded-xl hover:bg-[#2c3b45]"
      onClick={onAdd}
    >
      Add
    </button>
    <button
      className="bg-[#36454f] text-white py-2 rounded-xl hover:bg-[#2c3b45]"
      onClick={onClear}
    >
      Clear
    </button>
  </div>
);

export default ActionButtons;
