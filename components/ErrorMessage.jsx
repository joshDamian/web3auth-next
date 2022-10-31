function ErrorMessage({ error, touched }) {
  if (error && touched) {
    return (
      <p name="email" className="text-red-600 mt-1 text-sm first-letter:uppercase">
        {error}
      </p>
    );
  }
  return <></>;
}

export default ErrorMessage;
