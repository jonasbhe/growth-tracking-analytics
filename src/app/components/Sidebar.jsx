import React from "react";
import OrgUnitTree from "d2-ui/lib/org-unit-tree/OrgUnitTree.component";

class Sidebar extends React.Component {
  render() {
    console.log(root);
    const { root, ouPath, onSelectClick } = this.props;

    if (!root) return null;
    return (
      <div
        style={{
          backgroundColor: "#f3f3f3"
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            marginTop: 50,
            height: 600,
            width: 350,
            overflow: "auto"
          }}
        >
          <OrgUnitTree
            root={root}
            hideCheckboxes={true}
            onSelectClick={onSelectClick}
            selected={ouPath}
            // TODO: rmeove this property after development
            initiallyExpanded={[
              "/Hjw70Lodtf2/psfB4ksRKp2/DG8h5ijGxgO/sFGfRP4wPqe/oiAbfOiho08/hV87OCHgO4v"
            ]}
          />
        </div>
      </div>
    );
  }
}

export default Sidebar;
