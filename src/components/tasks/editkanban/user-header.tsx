import { UserTag } from "@/components/user-tag";
import { Task } from "@/graphql/schema.types";
import { Space, Typography } from "antd/lib";

type Props = {
  users?: Task["users"];
};

export const UsersHeader = ({ users = [] }: Props) => {
  if (users.length > 0) {
    return (
      <Space size={[0, 8]} wrap>
        {users.map((user) => (
          <UserTag key={user.id} user={user} />
        ))}
      </Space>
    );
  }

  return <Typography.Link>Assign to users</Typography.Link>;
};
