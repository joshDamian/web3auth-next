import cx from "classnames";
import { utils } from "ethers";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { toast } from "react-hot-toast";
import ErrorMessage from "./ErrorMessage";
import { useState } from "react";
import Swal from "sweetalert2";

const validateEthAddress = (value) => {
  let error;
  if (!value) {
    error = "Required";
  } else if (!utils.isAddress(value)) {
    error = "Invalid eth address";
  }
  return error;
};

const TransferSchema = Yup.object().shape({
  destination: Yup.string().trim().required(),
  amount: Yup.number("Invalid value").required().positive(),
});

export default ({ onSubmit, token }) => {
  const [disabled, setDisabled] = useState(false);
  const handleOnSubmit = async (values = null) => {
    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading("Submitting...");
      // Submit data
      if (typeof onSubmit === "function") {
        const receipt = await onSubmit(values);
        if (receipt?.status && receipt?.blockNumber) {
          toast.success("Successfully sent!", { id: toastId });
          Swal.fire({
            title: "Transfer Complete!",
            text: "Your transfer was successful!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    } catch (err) {
      toast.error("Sending failed", { id: toastId });
    } finally {
      setDisabled(false);
    }
  };

  const initialValues = {
    destination: "",
    amount: "",
  };

  return (
    <Formik
      validationSchema={TransferSchema}
      validateOnBlur={false}
      onSubmit={handleOnSubmit}
      initialValues={initialValues}
    >
      {({ isSubmitting, isValid, errors, touched }) => (
        <Form className="mt-2 space-y-2">
          <fieldset>
            <label htmlFor="destination" className="text-xs font-medium text-gray-400">
              Destination Wallet
            </label>
            <Field
              validate={validateEthAddress}
              name="destination"
              id="destination"
              type="text"
              placeholder="Receiving Wallet"
              autoComplete="destination"
              className={cx(
                "mt-1 block w-full rounded-md",
                "text-sm text-gray-400 placeholder:text-gray-600",
                "border focus-visible:border-transparent border-gray-700 bg-gray-800",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 py-4 px-5 focus-visible:ring-opacity-75"
              )}
              disabled={disabled}
            />
            <ErrorMessage error={errors.destination} touched={touched.destination} />
          </fieldset>
          <fieldset>
            <label htmlFor="amount" className="text-xs font-medium text-gray-400">
              Amount ({token.symbol})
            </label>
            <Field
              name="amount"
              id="amount"
              type="number"
              placeholder={`Amount in ${token.symbol}`}
              autoComplete="amount"
              className={cx(
                "mt-1 block w-full rounded-md",
                "text-sm text-gray-400 placeholder:text-gray-600",
                "border focus-visible:border-transparent border-gray-700 bg-gray-800",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 py-4 px-5 focus-visible:ring-opacity-75"
              )}
              disabled={disabled}
            />
            <ErrorMessage error={errors.amount} touched={touched.amount} />
          </fieldset>
          <button
            type="submit"
            disabled={disabled || !isValid}
            className={cx(
              "w-full",
              "inline-flex select-none justify-center items-center rounded-md px-4 py-2 text-sm font-medium",
              "bg-purple-700 text-gray-100 hover:bg-purple-600",
              "border border-transparent",
              "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
            )}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
