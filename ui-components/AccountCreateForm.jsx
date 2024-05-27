/* eslint-disable */
"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createAccount } from "./graphql/mutations";
const client = generateClient();
export default function AccountCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    wallet: "",
    ens: "",
    balance: "",
    nftAddresses: "",
    verified: false,
    createdAt: "",
  };
  const [wallet, setWallet] = React.useState(initialValues.wallet);
  const [ens, setEns] = React.useState(initialValues.ens);
  const [balance, setBalance] = React.useState(initialValues.balance);
  const [nftAddresses, setNftAddresses] = React.useState(
    initialValues.nftAddresses
  );
  const [verified, setVerified] = React.useState(initialValues.verified);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setWallet(initialValues.wallet);
    setEns(initialValues.ens);
    setBalance(initialValues.balance);
    setNftAddresses(initialValues.nftAddresses);
    setVerified(initialValues.verified);
    setCreatedAt(initialValues.createdAt);
    setErrors({});
  };
  const validations = {
    wallet: [],
    ens: [],
    balance: [],
    nftAddresses: [{ type: "JSON" }],
    verified: [],
    createdAt: [],
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
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
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
          wallet,
          ens,
          balance,
          nftAddresses,
          verified,
          createdAt,
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
            query: createAccount.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "AccountCreateForm")}
      {...rest}
    >
      <TextField
        label="Wallet"
        isRequired={false}
        isReadOnly={false}
        value={wallet}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              wallet: value,
              ens,
              balance,
              nftAddresses,
              verified,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.wallet ?? value;
          }
          if (errors.wallet?.hasError) {
            runValidationTasks("wallet", value);
          }
          setWallet(value);
        }}
        onBlur={() => runValidationTasks("wallet", wallet)}
        errorMessage={errors.wallet?.errorMessage}
        hasError={errors.wallet?.hasError}
        {...getOverrideProps(overrides, "wallet")}
      ></TextField>
      <TextField
        label="Ens"
        isRequired={false}
        isReadOnly={false}
        value={ens}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              wallet,
              ens: value,
              balance,
              nftAddresses,
              verified,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.ens ?? value;
          }
          if (errors.ens?.hasError) {
            runValidationTasks("ens", value);
          }
          setEns(value);
        }}
        onBlur={() => runValidationTasks("ens", ens)}
        errorMessage={errors.ens?.errorMessage}
        hasError={errors.ens?.hasError}
        {...getOverrideProps(overrides, "ens")}
      ></TextField>
      <TextField
        label="Balance"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={balance}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              wallet,
              ens,
              balance: value,
              nftAddresses,
              verified,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.balance ?? value;
          }
          if (errors.balance?.hasError) {
            runValidationTasks("balance", value);
          }
          setBalance(value);
        }}
        onBlur={() => runValidationTasks("balance", balance)}
        errorMessage={errors.balance?.errorMessage}
        hasError={errors.balance?.hasError}
        {...getOverrideProps(overrides, "balance")}
      ></TextField>
      <TextAreaField
        label="Nft addresses"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              wallet,
              ens,
              balance,
              nftAddresses: value,
              verified,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.nftAddresses ?? value;
          }
          if (errors.nftAddresses?.hasError) {
            runValidationTasks("nftAddresses", value);
          }
          setNftAddresses(value);
        }}
        onBlur={() => runValidationTasks("nftAddresses", nftAddresses)}
        errorMessage={errors.nftAddresses?.errorMessage}
        hasError={errors.nftAddresses?.hasError}
        {...getOverrideProps(overrides, "nftAddresses")}
      ></TextAreaField>
      <SwitchField
        label="Verified"
        defaultChecked={false}
        isDisabled={false}
        isChecked={verified}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              wallet,
              ens,
              balance,
              nftAddresses,
              verified: value,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.verified ?? value;
          }
          if (errors.verified?.hasError) {
            runValidationTasks("verified", value);
          }
          setVerified(value);
        }}
        onBlur={() => runValidationTasks("verified", verified)}
        errorMessage={errors.verified?.errorMessage}
        hasError={errors.verified?.hasError}
        {...getOverrideProps(overrides, "verified")}
      ></SwitchField>
      <TextField
        label="Created at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              wallet,
              ens,
              balance,
              nftAddresses,
              verified,
              createdAt: value,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
