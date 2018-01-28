import React from 'react';
import OrgUnitTree from 'd2-ui/lib/org-unit-tree/OrgUnitTree.component';

const Sidebar = ({ root, ouPath, onSelectClick }) => {
  if (!root) return null;
  return (
    <div
      style={{
        backgroundColor: '#f3f3f3',
        borderRight: '1px solid #e1e1e1'
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          marginTop: 50,
          height: 600,
          width: 250,
          overflow: 'auto'
        }}
      >
        <OrgUnitTree
          root={root}
          hideCheckboxes
          onSelectClick={onSelectClick}
          selected={ouPath}
        />
      </div>
    </div>
  );
};

export default Sidebar;
