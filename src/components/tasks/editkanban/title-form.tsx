import { Text } from "@/components/text";
import { UPDATE_TASK_MUTATION } from "@/graphql/mutation";
import { Task } from "@/graphql/schema.types";
import {
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
} from "@/graphql/types";
import { useForm } from "@refinedev/antd";
import { HttpError, useInvalidate } from "@refinedev/core";
import { GetFields, GetVariables } from "@refinedev/nestjs-query";
import { Form } from "antd";
import { Skeleton } from "antd/lib";
import React from "react";

type Props = {
  initialValues: {
    title?: Task["title"];
  };
  isLoading?: boolean;
};

export const TitleForm = ({ initialValues, isLoading }: Props) => {
  const invalidate = useInvalidate();

  const { formProps } = useForm<
    GetFields<UpdateTaskMutation>,
    HttpError,
    Pick<GetVariables<UpdateTaskMutationVariables>, "title">
  >({
    queryOptions: {
      enabled: false,
    },
    redirect: false,
    warnWhenUnsavedChanges: false,
    autoSave: {
      enabled: true,
    },
    onMutationSuccess: () => {
      invalidate({ invalidates: ["list"], resource: "tasks" });
    },
    meta: {
      gqlMutation: UPDATE_TASK_MUTATION,
    },
  });

  React.useEffect(() => {
    formProps.form?.setFieldsValue(initialValues);
  }, [initialValues.title]);

  if (isLoading) {
    return (
      <Skeleton.Input
        size="small"
        style={{ width: "95%", height: "22px" }}
        block
      />
    );
  }

  return (
    <Form {...formProps} initialValues={initialValues}>
      <Form.Item noStyle name="title">
        <TitleInput />
      </Form.Item>
    </Form>
  );
};

const TitleInput = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const onTitleChange = (newTitle: string) => {
    onChange?.(newTitle);
  };

  return (
    <Text
      editable={{
        onChange: onTitleChange,
      }}
      style={{ width: "98%" }}
    >
      {value}
    </Text>
  );
};
