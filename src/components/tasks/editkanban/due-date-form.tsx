import { UPDATE_TASK_MUTATION } from "@/graphql/mutation";
import { Task } from "@/graphql/schema.types";
import {
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
} from "@/graphql/types";
import { useForm } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";
import { GetFields, GetVariables } from "@refinedev/nestjs-query";
import { Button, DatePicker, Form, Space } from "antd/lib";
import dayjs from "dayjs";

type Props = {
  initialValues: {
    dueDate?: Task["dueDate"];
  };
  cancelForm: () => void;
};

export const DueDateForm = ({ initialValues, cancelForm }: Props) => {
  const { formProps, saveButtonProps } = useForm<
    GetFields<UpdateTaskMutation>,
    HttpError,
    Pick<GetVariables<UpdateTaskMutationVariables>, "dueDate">
  >({
    queryOptions: {
      enabled: false,
    },
    redirect: false,
    onMutationSuccess: () => {
      cancelForm();
    },
    meta: {
      gqlMutation: UPDATE_TASK_MUTATION,
    },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Form {...formProps} initialValues={initialValues}>
        <Form.Item
          noStyle
          name="dueDate"
          getValueProps={(value) => {
            if (!value) return { value: undefined };
            return { value: dayjs(value) };
          }}
        >
          <DatePicker
            format="YYYY-MM-DD HH:mm"
            showTime={{
              showSecond: false,
              format: "HH:mm",
            }}
            style={{ backgroundColor: "#fff" }}
          />
        </Form.Item>
      </Form>
      <Space>
        <Button type="default" onClick={cancelForm}>
          Cancel
        </Button>
        <Button {...saveButtonProps} type="primary">
          Save
        </Button>
      </Space>
    </div>
  );
};
