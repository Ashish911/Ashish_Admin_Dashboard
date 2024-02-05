import { Text } from "@/components/text";
import { Task } from "@/graphql/schema.types";
import { getDateColor } from "@/utilities";
import { Space, Tag, Typography } from "antd/lib";
import dayjs from "dayjs";

type Props = {
  dueDate?: Task["dueDate"];
};

export const DueDateHeader = ({ dueDate }: Props) => {
  if (dueDate) {
    const color = getDateColor({
      date: dueDate,
      defaultColor: "processing",
    });
    const getTagText = () => {
      switch (color) {
        case "error":
          return "Overdue";
        case "warning":
          return "Due soon";
        default:
          return "Processing";
      }
    };

    return (
      <Space size={[0, 8]}>
        <Tag color={color}>{getTagText()}</Tag>
        <Text>{dayjs(dueDate).format("MMMM D, YYYY - h:ma")}</Text>
      </Space>
    );
  }

  return <Typography.Link>Add due date</Typography.Link>;
};
