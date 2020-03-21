const Input = ({ ...props }) => {
  return (
    <React.Fragment>
      <input {...props} className="w-full py-2 outline-none mb-16" />
      <style jsx>
        {`
          input {
            border-bottom: 1px solid rgba(0, 0, 0, 0.3);
          }
          small {
            color: #ea001b;
          }
        `}
      </style>
    </React.Fragment>
  );
};

export default Input;
