import React, { useEffect, useState } from "react";
import api from "../../services/api";

interface PermissionComponentProps {
  role: string;
}

const PermissionComponent: React.FC<PermissionComponentProps> = ({
  role,
  children,
}) => {
  const [permissions, setPermissions] = useState([] as string[]);

  useEffect(() => {
    async function loadRoles() {
      const response = await api.get("/users/roles");
      console.log(response.data);
      const findRole = response.data.some((r: string) =>
        role?.split(",").includes(r)
      );
      console.log(findRole);
      setPermissions(findRole);
    }

    loadRoles();
  }, []);

  return <>{permissions && children}</>;
};

export default PermissionComponent;
