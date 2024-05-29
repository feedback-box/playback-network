/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getMedia } from "./graphql/queries";
import { updateMedia } from "./graphql/mutations";
const client = generateClient();
export default function MediaUpdateForm(props) {
  const {
    id: idProp,
    media: mediaModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    walletAddress: "",
    taskId: "",
    dataURL: "",
    ocr: "",
  };
  const [walletAddress, setWalletAddress] = React.useState(
    initialValues.walletAddress
  );
  const [taskId, setTaskId] = React.useState(initialValues.taskId);
  const [dataURL, setDataURL] = React.useState(initialValues.dataURL);
  const [ocr, setOcr] = React.useState(initialValues.ocr);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = mediaRecord
      ? { ...initialValues, ...mediaRecord }
      : initialValues;
    setWalletAddress(cleanValues.walletAddress);
    setTaskId(cleanValues.taskId);
    setDataURL(cleanValues.dataURL);
    setOcr(cleanValues.ocr);
    setErrors({});
  };
  const [mediaRecord, setMediaRecord] = React.useState(mediaModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getMedia.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMedia
        : mediaModelProp;
      setMediaRecord(record);
    };
    queryData();
  }, [idProp, mediaModelProp]);
  React.useEffect(resetStateValues, [mediaRecord]);
  const validations = {
    walletAddress: [],
    taskId: [],
    dataURL: [],
    ocr: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          walletAddress: walletAddress ?? null,
          taskId: taskId ?? null,
          dataURL: dataURL ?? null,
          ocr: ocr ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateMedia.replaceAll("__typename", ""),
            variables: {
              input: {
                id: mediaRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MediaUpdateForm")}
      {...rest}
    >
      <TextField
        label="Wallet address"
        isRequired={false}
        isReadOnly={false}
        value={walletAddress}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              walletAddress: value,
              taskId,
              dataURL,
              ocr,
            };
            const result = onChange(modelFields);
            value = result?.walletAddress ?? value;
          }
          if (errors.walletAddress?.hasError) {
            runValidationTasks("walletAddress", value);
          }
          setWalletAddress(value);
        }}
        onBlur={() => runValidationTasks("walletAddress", walletAddress)}
        errorMessage={errors.walletAddress?.errorMessage}
        hasError={errors.walletAddress?.hasError}
        {...getOverrideProps(overrides, "walletAddress")}
      ></TextField>
      <TextField
        label="Task id"
        isRequired={false}
        isReadOnly={false}
        value={taskId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              walletAddress,
              taskId: value,
              dataURL,
              ocr,
            };
            const result = onChange(modelFields);
            value = result?.taskId ?? value;
          }
          if (errors.taskId?.hasError) {
            runValidationTasks("taskId", value);
          }
          setTaskId(value);
        }}
        onBlur={() => runValidationTasks("taskId", taskId)}
        errorMessage={errors.taskId?.errorMessage}
        hasError={errors.taskId?.hasError}
        {...getOverrideProps(overrides, "taskId")}
      ></TextField>
      <TextField
        label="Data url"
        isRequired={false}
        isReadOnly={false}
        value={dataURL}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              walletAddress,
              taskId,
              dataURL: value,
              ocr,
            };
            const result = onChange(modelFields);
            value = result?.dataURL ?? value;
          }
          if (errors.dataURL?.hasError) {
            runValidationTasks("dataURL", value);
          }
          setDataURL(value);
        }}
        onBlur={() => runValidationTasks("dataURL", dataURL)}
        errorMessage={errors.dataURL?.errorMessage}
        hasError={errors.dataURL?.hasError}
        {...getOverrideProps(overrides, "dataURL")}
      ></TextField>
      <TextField
        label="Ocr"
        isRequired={false}
        isReadOnly={false}
        value={ocr}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              walletAddress,
              taskId,
              dataURL,
              ocr: value,
            };
            const result = onChange(modelFields);
            value = result?.ocr ?? value;
          }
          if (errors.ocr?.hasError) {
            runValidationTasks("ocr", value);
          }
          setOcr(value);
        }}
        onBlur={() => runValidationTasks("ocr", ocr)}
        errorMessage={errors.ocr?.errorMessage}
        hasError={errors.ocr?.hasError}
        {...getOverrideProps(overrides, "ocr")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || mediaModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || mediaModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
